import type { ColorRamp, MapClickEvent, MapOverlay } from "../../../@types/maps";

// deriva o valor de fluxo de um pixel a partir do valor (r,g,b) e uma rampa de cores
async function interpolatePixelData(r: number, g: number, b: number, colorramp: ColorRamp) {

    let nearest = Math.pow(255, 3);
    let nearest_index = 0;
    let second_nearest = Math.pow(255, 3);
    let second_nearest_index = 0;

    for (let i = 0; i < colorramp.length; i++) {
        const [_, R, G, B] = colorramp[i];

        let dist = Math.pow(R-r, 2) + Math.pow(G-g, 2) + Math.pow(B-b, 2)

        if( dist < nearest ){
            second_nearest = nearest;
            second_nearest_index = nearest_index;

            nearest = dist;
            nearest_index = i;
        }
        else if ( dist < second_nearest ) {
            second_nearest = dist;
            second_nearest_index = i;
        }
    }

    let nearest_value = colorramp[nearest_index][0];
    let second_nearest_value = colorramp[second_nearest_index][0];
    
    let n_distance = Math.sqrt(nearest);
    let sn_distance = Math.sqrt(second_nearest);

    let approx_value = (nearest_value*sn_distance + second_nearest_value*n_distance) / (n_distance + sn_distance);
    return approx_value;
};

function lon2tile(lon: number, zoom: number) {
    let pos = ((lon+180)/360*Math.pow(2,zoom));
    return {tile: Math.floor(pos), pixel: Math.floor((pos % 1)*256)}
}

function lat2tile(lat: number, zoom: number)  {
    let pos = ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom));
    return {tile: Math.floor(pos), pixel: Math.floor((pos % 1)*256)}
};

async function pixelColorFromTileUrl(tileUrl: string, x: number, y: number): Promise<[r: number, g: number, b: number, a: number]> {
    return new Promise((resolve, reject) => {

        let tile = new Image();
        tile.src = tileUrl;

        tile.onload = () => {
            // carrega a imagem do tile em um canvas para obter o valor do pixel (x,y)
            let canvas = document.createElement("canvas");
            canvas.width = tile.width;
            canvas.height = tile.height;

            let context = canvas.getContext('2d');
            
            if( context === null) {
                return reject();
            }

            context.drawImage(tile, 0, 0);
            let point = context.getImageData(x, y, 1, 1).data;
            let [r, g, b, a] = point;
            return resolve([r, g, b, a]);
        }
    });
};

export const getPixelValue = async (event: MapClickEvent, tilelayerurl: string, selectedOverlay: MapOverlay, selectedColorRamp: ColorRamp) => {

    // obtém a coordenada de onde o usuário clicou
    let { latlng }  = event.detail;
    let { lat, lng } = latlng;

    // usa a coordenada para obter o tile de maior resolução que a inclui
    let [tileLat, tileLng] = [lat2tile(lat, selectedOverlay.maxZoom), lon2tile(lng, selectedOverlay.maxZoom)];

    // carrega o tile e obtém o valor do pixel (r,g,b) de onde o usuário clicou
    let [r, g, b, a] = await pixelColorFromTileUrl(
        tilelayerurl
            .replace('{z}', selectedOverlay.maxZoom.toString())
            .replace('{x}', tileLng.tile.toString())
            .replace('{y}', tileLat.tile.toString()),
        tileLng.pixel,
        tileLat.pixel
    );
    
    let value;
    if( a != 0) {
        value = await interpolatePixelData(r, g, b, selectedColorRamp);
        value = parseFloat(value.toFixed(3));
    }
    else {
        value = null;
    }
    
    return { value, lat, lng };
};
