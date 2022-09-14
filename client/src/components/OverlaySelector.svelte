<script lang="ts">
    import type { MapOverlay } from '../../../@types/maps';
    import { onMount } from 'svelte';
    import { selectedMapOverlay, currentMapColorRamp } from '../stores/map';
    import apiRequest from '../api/requests';

    interface FormattedOverlays {
        [region: string]: {
            [type: string]: {
                [year: string]: MapOverlay[]
            }
        }
    }
    
    async function updateCurrentColorramp(currentoverlay: MapOverlay | null) {
        if( currentoverlay === null ) {
            $currentMapColorRamp = null;
            return;
        }
        
        let r = await fetch(`colorramps/${currentoverlay.colorRampId}.json`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        
        if( r.ok ){
            let ramp = await r.json();
            $currentMapColorRamp = ramp;
        }
    }
    
    // overlay selector status
    let selectorActive = false;

    let overlays: FormattedOverlays | null = null;

    $: console.log(overlays);
    
    let location: string | null = null;
    let type: string | null = null;
    let year: string | null = null;

    $: locationList =   (overlays === null)
        ? null : Object.keys(overlays);
    $: typeList =       (overlays === null || locationList === null || location === null )
        ? null : Object.keys(overlays[location]);
    $: yearList =       (overlays===null || location === null || typeList === null || type === null )
        ? null : Object.keys(overlays[location][type]);
    $: overlayList =    (overlays === null || location === null || type === null || yearList === null || year === null )
        ? null : overlays[location][type][year];

    $: updateCurrentColorramp($selectedMapOverlay);

    function formatOverlays(overlays: MapOverlay[]){

        let formatted: FormattedOverlays = {};
        
        for (let i = 0; i < overlays.length; i++) {

            const over = overlays[i];
            
            const region = over.location;
            const type = over.type;
            const date = new Date(over.capture);

            const year = date.getFullYear();

            if( ! formatted.hasOwnProperty(region)){
                formatted[region] = {};
            }
            if (! formatted[region].hasOwnProperty(type)){
                formatted[region][type] = {};
            }
            if( ! formatted[region].hasOwnProperty(year)){
                formatted[region][type][year] = [];
            }
            
            formatted[region][type][year].push(over);
        }
        console.log("formmated", formatted);
        return formatted;
    }
    
    onMount( async () => {
        // let r = await apiRequest("api/v1/overlays");
        // console.log(resp);
        // if( resp.ok ) {
        //     overlays = formatOverlays(resp.json);
        // }
    });

</script>


<aside class:active={selectorActive}>
    <div class="container">
        {#if overlays !== undefined }
            <!-- seletor de regiao -->
            <select bind:value={location} class="form-select form-select-sm mb-3" on:change={() => {type = null; year = null; $selectedMapOverlay = null}}>
                <option disabled selected hidden value={null}>Região</option>
                {#if locationList !== null}
                    {#each locationList as over (over)}
                        <option class="dropdown-item" value={over}>{over}</option>
                    {/each}
                {/if}
            </select>
    
            <!-- seletor de filtro -->
            <select bind:value={type} class="form-select form-select-sm mb-3" on:change={() => {year = null; $selectedMapOverlay = null}}>
                <option disabled selected hidden value={null}>Filtro</option>
                {#if typeList !== null}
                    {#each typeList as over (over)}
                        <option class="dropdown-item" value={over}>{over}</option>
                    {/each}
                {/if}
            </select>
    
            <!-- seletor de ano -->
            <select bind:value={year} class="form-select form-select-sm mb-3" on:change={() => $selectedMapOverlay = null}>
                <option disabled selected hidden value={null} id='kek'>Ano</option>
                {#if yearList !== null}
                    {#each yearList as over (over)}
                        <option class="dropdown-item" value={over}>{over}</option>
                    {/each}
                {/if}
            </select>
    
            <!-- seletor do overlay -->
            <select bind:value={$selectedMapOverlay} class="form-select form-select-sm mb-3">
                <option disabled selected hidden value={null}>Captura</option>
                {#if overlayList !== null }
                    {#each overlayList as over (over.id) }
                        <option class="dropdown-item" value={over}>{over.capture}</option>
                    {/each}
                {/if}
            </select>
    
        {/if}
    </div>
</aside>

<div class="teste">
    <button
        on:click={() => selectorActive = !selectorActive}
        class="btn btn-secondary"
        >
        {selectorActive ? 'Fechar' : 'Abrir'} Filtro
    </button>
</div>


<style>
    aside {
        position: absolute;
        left: -300px;
        transition: all .5s;
        height: 500px;
        width: 300px;
        padding: 20px;
        border: 1px solid #ddd;
        background-color: #efefef;
        z-index: 20;
    }
    aside.active {
        left: 0px;
    }
    div.teste {
        display: grid;
    }

    .dropdown-item:hover {
        cursor: pointer;
    }

    button {
        width: 200px;
        place-self: right;
        justify-self: right;
    }

</style>

