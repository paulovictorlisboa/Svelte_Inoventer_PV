<script lang="ts">
    import type { MapOptions } from 'leaflet';
    import type { ColorRamp, MapClickEvent, MapOverlay, ValueMarker } from '../../../@types/maps';
    import { LeafletMap, TileLayer, Marker, Popup, Tooltip } from 'svelte-leafletjs';
    import { selectedMapOverlay, currentMapColorRamp } from '../stores/map';
    import OverlaySelector from "./OverlaySelector.svelte";
    import { getPixelValue } from '../util/map';

    // id para identificar cada marcador unicamente
    let markerId = 0;

    let markers: ValueMarker[] = [];
    $: markers = [];

    async function addMarker(event: MapClickEvent, layerurl: string, selectedoverlay: MapOverlay, colorramp: ColorRamp) {
        if( selectedoverlay === null ) { return }

        const pv = await getPixelValue(event, layerurl, selectedoverlay, colorramp);

        if( pv.value === null) { return }

        let m: ValueMarker = {
            id: ++markerId,
            overlayId: selectedoverlay.id,
            type: selectedoverlay.type,
            capture: selectedoverlay.capture,
            markedAt: Date.now(),
            value: pv.value,
            lat: pv.lat,
            lng: pv.lng,
        }
        
        markers = [...markers, m];
    }
    
    // configurações da janela
    // @ts-ignore
    let leafletMap;
    const mapOptions: MapOptions = {
        center: [-32.07172435618767, -52.164771133368205],
        zoom: 13,
        preferCanvas: true
    };
    
    // config do mapa
    let baseLayer;
    const baseLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
    const baseLayerOptions = {
        minZoom: 0,
        maxZoom: 18,
        maxNativeZoom: 18,
        attribution: "© Openstreetmap",
    };
    
    // config do overlay
    // @ts-ignore
    let overlayLayer;
    $: overlayLayerUrl = $selectedMapOverlay !== null ? `tiles/${$selectedMapOverlay.id}/{z}/{x}/{y}.png` : null;
    $: overlayLayerOptions = $selectedMapOverlay !== null ? {
        minZoom: 0,
        maxZoom: 18,
        minNativeZoom: $selectedMapOverlay.minZoom,
        maxNativeZoom: $selectedMapOverlay.maxZoom,
        // bounds: $selectedMapOverlay.extent,
        attribution: "© Inoventer",
    } : null

</script>

<div class="row">

    <OverlaySelector/>

    <div class="btn-container">
        <button class="btn btn-danger" on:click={() => {
            markers = []
        }}>
            Remover Marcadores
        </button>
    </div>

    <!-- events={['click']}  -->

    <div class="map col" style="width: clamp(60vw, 800px, 100vw); height: clamp(40vh, 800px, 80vh); z-index: 10;">

        <LeafletMap 
            bind:this={leafletMap} 
            options={mapOptions} 
            on:click={ (e) => {
                try{
                    if( overlayLayerUrl === null || $selectedMapOverlay === null || $currentMapColorRamp == null ) { return; }
                    // @ts-ignore
                    addMarker( e, overlayLayerUrl, $selectedMapOverlay, $currentMapColorRamp )
                }
                catch(e) {
                    console.log(e);
                }
            }}
        >
            
            <TileLayer
                url={baseLayerUrl}
                options={baseLayerOptions}
                bind:this={baseLayer}
            />
            
            {#if overlayLayerUrl !== null && overlayLayerOptions !== null}
                <TileLayer
                    url={overlayLayerUrl}
                    options={overlayLayerOptions}
                    bind:this={overlayLayer}
                />
            {/if}

            <!-- renderiza os marcadores -->
            {#each markers as marker (marker.id)}
                <Marker latLng={[marker.lat, marker.lng]}>

                    <!-- caixa que aparece quando clicar no marcador -->
                    <Popup options={{autoClose: false, closeOnClick: false, closeOnEscapeKey: true}} >
                        Tipo: {marker.type} <br>
                        Valor (approx.): {marker.value} <br>
                        Latitute: {marker.lat} <br>
                        Longitude: {marker.lng} <br>
                        Captura: {marker.capture} <br>

                        <button class="remove-marker"
                            on:click={() => { markers = markers.filter( m => ( m.id != marker.id )) }}>
                            Remover Marcador
                        </button>

                    </Popup>

                    <!-- caixa que aparece quando passar o mouse em cima do marcador -->
                    <Tooltip>{`${marker.value}`}</Tooltip>
                </Marker>
            {/each}
            
        </LeafletMap>
    </div>
</div>

<style>
    div.row {
        animation: fadeIn 600ms;
        z-index: 10;
        margin: 0px;
    }
    div.btn-container {
        display: grid;
    }
    div.btn-container > button {
        width: 200px;;
        place-self: right;
        justify-self: right;
    }
    button.remove-marker {
        color: red;
    }
    @keyframes fadeIn {
        0% {opacity: 0;}
        50% {opacity: 0;}
        100% {opacity: 1;}
    }
</style>