<script>
    import * as d3 from 'd3';
    export let data = [];
    export let width = 400; // Default width
    export let colorScale; // Export the color scale prop

    let barHeight = 50;
    const MIN_LABEL_WIDTH = 30; // Minimum width for labels to be displayed

    let selectedIndex = -1;
    let hoveredIndex = -1;

    $: keys = Object.keys(data.length > 0 ? data[0][0] : {}); // Get keys from the first object
    $: dataForStack = [Object.fromEntries(data)];

    $: stackedData = d3.stack().keys(keys)(dataForStack);

    $: total = d3.max(stackedData, series => d3.max(series, d => d[1])) || 1;

    $: xScale = d3.scaleLinear()
        .domain([0, total])
        .range([0, width]);
</script>

<div class="legend">
    {#each stackedData as series}
        <div class="legend-item">
            <span class="legend-color" style="background-color: {colorScale(series.key)};"></span>
            <span class="legend-label">{series.key} ({d3.format(".1%")( (series[0][1] - series[0][0]) / total)})</span>
        </div>
    {/each}
</div>

<svg {width} height={barHeight}>
    {#each stackedData as series, i (series.key)}
        {#each series as d, j}
            <rect
                class:selected={selectedIndex === i}
                class:hovered={hoveredIndex === i}
                x={xScale(d[0])}
                y="0"
                width={xScale(d[1]) - xScale(d[0])}
                height={barHeight - 5}
                fill={colorScale(series.key)}
                on:click={() => selectedIndex = selectedIndex === i ? -1 : i}
                on:mouseenter={() => hoveredIndex = i}
                on:mouseleave={() => hoveredIndex = -1}
            />
            {#if (xScale(d[1]) - xScale(d[0]) > MIN_LABEL_WIDTH)}
                <text
                    class="label"
                    x={(xScale(d[0]) + xScale(d[1])) / 2}
                    y={barHeight / 2}
                    text-anchor="middle"
                    fill="white"
                    dominant-baseline="middle"
                >
                    {series.key}: {d[1] - d[0]}
                </text>
            {/if}
        {/each}
    {/each}
</svg>

<style>
    .legend {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }
    .legend-item {
        display: flex;
        align-items: center;
        margin-right: 15px;
        margin-bottom: 5px;
    }
    .legend-color {
        width: 15px;
        height: 15px;
        border-radius: 3px;
        margin-right: 5px;
    }
    .label {
        font-size: 0.8em;
    }
    rect {
        transition: fill 0.2s ease-in-out;
    }
    rect.selected {
        stroke: black;
        stroke-width: 2px;
    }
    rect.hovered {
        opacity: 0.8;
    }
</style>