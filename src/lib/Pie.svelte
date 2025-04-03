<script>
    import * as d3 from 'd3';
    export let data = [];
    export let selectedIndex = -1;

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let arc = arcGenerator({
            startAngle: 0,
            endAngle: 2 * Math.PI
        });

    let sliceGenerator = d3.pie().value(d => d.value);

    let arcData;
    let arcs;

        $: {
            // Reactively calculate arcData and arcs the same way we did before with sliceGenerator and arcGenerator
            arcData = sliceGenerator(data);
            arcs = arcData.map(d => arcGenerator(d));
        }

    let colors = d3.scaleOrdinal(d3.schemeTableau10);
</script>


<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <path d={arc} fill={colors(index)}  
                class:selected={selectedIndex === index}
                on:click={e => selectedIndex = selectedIndex === index ? -1 : index} />
        {/each}
    </svg>
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: { colors(index) }">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>

<style>
    svg {
        max-width: 20em;
        margin-block: 2em;

        /* Do not clip shapes outside the viewBox */
        overflow: visible;
    }

    svg:has(path:hover) path:not(:hover) {
        opacity: 50%;
    }

    path {
        transition: 300ms;
        cursor: pointer;
    }

    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        border: 1px solid black;
        padding: 10px;
        list-style-type: none;
        margin-left: 50px;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 50px;
        align-self: center;

    }

    .legend li {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }

    .legend .swatch {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: var(--color);
        border-radius: 50%;
    }

    .legend li span {
        font-size: 14px;
        color: #333;
    }

    svg:has(.selected) path:not(.selected) {
        opacity: 50%;
    }

    .selected {
        --color: oklch(60% 45% 0) !important;
        
        &:is(path) {
            fill: var(--color) !important;
        }
        
        &:is(li) {
            color: var(--color);
        }
    }

    ul:has(.selected) li:not(.selected) {
        color: gray;
    }

    path:hover {
        opacity: 100% !important;
    }

</style>