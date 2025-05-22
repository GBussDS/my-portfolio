<script>
    import * as d3 from "d3";

    export let lines = [];
    export let width = null;
    export let colorScale; // Export the color scale prop

    let svg;

    const firstColumnWidth = 150;
    const fileInfoMargin = 100;
    const dotsColumnX = firstColumnWidth + fileInfoMargin;
    const approxDotWidth = 10;
    const linesPerDot = 1;
    const baseY = 10;
    const totalLinesOffset = 20;
    const fileInfoHeight = baseY + totalLinesOffset;
    const dotRowHeight = 20;

    let previousDotCounts = new Map();

    $: files = d3.groups(lines, d => d.file)
        .map(([name, lines]) => ({ name, lines }))
        .sort((a, b) => b.lines.length - a.lines.length); // Step 1.5: Sort files

    $: filesWithHeights = files.map(file => {
        const totalDots = Math.ceil(file.lines.length / linesPerDot);
        const availableWidth = width - dotsColumnX;
        const maxDotsPerRow = Math.floor(availableWidth / approxDotWidth) || totalDots;
        const dotRows = Math.ceil(totalDots / maxDotsPerRow);
        return { ...file, groupHeight: fileInfoHeight + dotRows * dotRowHeight };
    });

    $: positions = (() => {
        let pos = [], y = 0;
        for (const f of filesWithHeights) {
            pos.push(y);
            y += f.groupHeight;
        }
        return pos;
    })();

    function generateDots(file, svgWidth) {
        const totalDots = Math.ceil(file.lines.length / linesPerDot);
        const availableWidth = svgWidth - dotsColumnX;
        const maxDotsPerRow = Math.floor(availableWidth / approxDotWidth) || totalDots;
        let tspans = "";
        const dotRows = Math.ceil(totalDots / maxDotsPerRow);

        for (let r = 0; r < dotRows; r++) {
            const rowLines = file.lines.slice(r * maxDotsPerRow, (r + 1) * maxDotsPerRow);
            const rowDots = rowLines
                .map((line, index) => `<tspan class="dot" data-index="${r * maxDotsPerRow + index}" style="fill:${colorScale(line.type)}">•</tspan>`)
                .join('');
            tspans += `<tspan x="${dotsColumnX}" dy="${r === 0 ? 0 : dotRowHeight + 'px'}">${rowDots}</tspan>`;
        }
        return tspans;
    }

    $: if (svg && width !== null) { // Ensure width is not null
        const svgWidth = width; // Use the passed width prop
        const totalHeight = positions.length
            ? positions[positions.length - 1] + filesWithHeights[filesWithHeights.length - 1].groupHeight
            : 0;
        d3.select(svg)
            .attr('width', svgWidth)
            .attr('height', totalHeight)
            .style('overflow', 'hidden');

        const groups = d3.select(svg)
            .selectAll('g.file')
            .data(files, d => d.name);

        groups.exit().remove();

        const enterGroups = groups.enter()
            .append('g')
            .attr('class', 'file')
            .attr('transform', (d, i) => `translate(0, ${positions[i]})`);

        enterGroups.append('text')
            .attr('class', 'filename')
            .attr('x', 10)
            .attr('y', baseY)
            .attr('dominant-baseline', 'hanging')
            .text(d => d.name);

        enterGroups.append('text')
            .attr('class', 'linecount')
            .attr('x', 10)
            .attr('y', baseY + totalLinesOffset)
            .attr('dominant-baseline', 'hanging')
            .text(d => `${d.lines.length} lines`);

        // Step 1.7: Animated race
        groups.transition()
            .duration(function(d, i) {
                const currentTransform = this.getAttribute("transform") || "translate(0,0)";
                const match = currentTransform.match(/translate\(\s*0\s*,\s*([0-9.]+)\s*\)/);
                const oldY = match ? +match[1] : 0;
                const newY = positions[i];
                const distance = Math.abs(newY - oldY);
                return distance * 2;
            })
            .attr('transform', (d, i) => `translate(0, ${positions[i]})`);

        groups.select('text.filename')
            .text(d => d.name);

        groups.select('text.linecount')
            .text(d => `${d.lines.length} lines`);

        enterGroups.append('text')
            .attr('class', 'unit-dots')
            .attr('x', dotsColumnX)
            .attr('y', baseY - 2) // Adjusted y to align with dots
            .attr('dominant-baseline', 'mathematical')
            .html(d => generateDots(d, svgWidth)); // Initial HTML for dots

        // Step 1.6: Dot transitions
        groups.each(function(d) {
            const groupSel = d3.select(this);
            const unitDotsSel = groupSel.select('text.unit-dots');
            const newCount = d.lines.length;
            const oldCount = previousDotCounts.get(d.name) || 0;

            // Update HTML for all dots
            unitDotsSel.html(generateDots(d, svgWidth));

            if(newCount > oldCount) {
                unitDotsSel.selectAll('tspan.dot')
                    .filter(function() {
                        return +this.getAttribute('data-index') >= oldCount;
                    })
                    .style('opacity',0)
                    .transition()
                        .duration(1000)
                        .ease(d3.easeCubicOut)
                        .style('opacity',1);
            }

            previousDotCounts.set(d.name, newCount);
        });
    }
</script>

<svg bind:this={svg}></svg>

<style>
    :global(text.filename){
        font-size: 1.2rem;
        font-family: 'Georgia', serif;
        fill: light-dark(black, white);
    }
    :global(text.linecount){
        font-size: 0.9rem;
        color: grey;
    }
    :global(text.unit-dots) {
        font-size: 2.2rem;
    }
    :global(.dot) {
        transition: opacity 1000ms ease-in-out;
    }
</style>