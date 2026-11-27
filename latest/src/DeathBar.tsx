import { useEffect, useRef } from "react";
import * as d3 from "d3"
import type { DeathBarProps } from "./types";

function DeathBar({records}: DeathBarProps){
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() =>{
        if (records.length === 0) {
            return;
        }

        const requirement = records[0].requirement;

        const width = 700;
        const height = 70;
        const margin = {top: 10, right: 20, bottom: 30, left: 20};
        const innerWidth = width - margin.left - margin.right;
        const barHeight = 24;

        //deaths per %

        const counts = d3.rollup(records, v=> v.length, r=> r.progress);
        const maxCount = d3.max(counts.values()) ?? 1;
        const percents = d3.range(requirement, 100);

        const x = d3.scaleBand<number>().domain(percents).range([0, innerWidth]);

        // more deaths equals more red
        const color = d3.scaleSequential(d3.interpolateRgb("#ffffff","#ff0000")).domain([0,maxCount]);
        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();
        svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%");

        const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

        g.selectAll("rect")
            .data(percents)
            .join("rect")
            .attr("x", p => x(p)!)
            .attr("y", 0)
            .attr("width", x.bandwidth())
            .attr("height", barHeight)
            .attr("fill", p => color(counts.get(p) ?? 0))
            .append("title")
            .text(p => `${p}%: ${counts.get(p) ?? 0} deaths`);

        g.append("rect")
            .attr("width", innerWidth)
            .attr("height", barHeight)
            .attr("fill", "none");
        
        const ticks = percents;

        g.append("g")
            .attr("transform", `translate(0,${barHeight})`)
            .call(d3.axisBottom(x).tickValues(ticks).tickFormat(d => `${d}%`))
            .call(axis => axis.selectAll("text")
                .attr("fill", "#90a2b2")
                .attr("font-size", 8)
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", "end")
                .attr("dx", "-0.6em")
                .attr("dy", "-0.4em"))
            .call(axis => axis.selectAll("line, path").attr("stroke", "#393f4e"));

    }, [records]);

    return <svg ref={svgRef} />;
}

export default DeathBar;