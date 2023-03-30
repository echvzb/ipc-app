import { useQuery } from "@tanstack/react-query";
import {
  axisBottom,
  axisLeft,
  // bisect,
  curveLinear,
  extent,
  format,
  line,
  // pointer,
  scaleLinear,
  scaleTime,
  select,
  timeMinute,
  type Selection,
} from "d3";
import { useState, useCallback, useLayoutEffect } from "react";
import { ChartId, ClassNames } from "./Chart.constants";
import { getChartData } from "./Chart.requests";
import type {
  IUseChartArgs,
  IDomain,
  IChartPoint,
  XDomainT,
  YDomainT,
} from "./Chart.types";

const getXValue = (chartPoint: IChartPoint): Date => new Date(chartPoint.date);
const getYValue = (chartPoint: IChartPoint): number => chartPoint.price;

const axisStyle = (
  axis: Selection<SVGGElement, unknown, HTMLElement, unknown>
) => {
  const ticks = axis.selectAll(".tick");
  ticks.select("line").attr("class", ClassNames.Tick);
  ticks.selectAll("text").attr("class", ClassNames.Text);
};

export const useChart = ({ width, height }: IUseChartArgs) => {
  const [domain, setDomain] = useState<IDomain>();

  const { data } = useQuery(["chartData"], getChartData, {
    initialData: [],
    onSuccess(data) {
      const domain = {
        x: extent(data, getXValue) as XDomainT,
        y: extent(data, getYValue) as YDomainT,
      };

      setDomain(domain);
    },
  });

  const handleSetPath = useCallback(
    (data: IChartPoint[], domain: IDomain): void => {
      if (width !== 0 && height !== 0) {
        const margin = {
          x: width * 0.05,
          y: height * 0.05,
        };

        const range = {
          x: [margin.x, width - margin.x],
          y: [margin.y, height - margin.y],
        };

        const scale = {
          x: scaleTime(domain.x, range.x),
          y: scaleLinear(domain.y, range.y),
        };

        const points = data.map<[number, number]>((chartPoint) => [
          scale.x(getXValue(chartPoint)),
          scale.y(getYValue(chartPoint)),
        ]);

        select<SVGGElement, unknown>(`#${ChartId.XAxis}`)
          .attr("transform", `translate(0, ${height - margin.y})`)
          .call(
            axisBottom(scale.x)
              .tickSize(3)
              .ticks(timeMinute.every(20), "%I:%M %p")
          )
          .call((axis) =>
            axis.select(".domain").attr("class", `domain ${ClassNames.Tick}`)
          )
          .call(axisStyle);

        select<SVGGElement, unknown>(`#${ChartId.YAxis}`)
          .attr("transform", `translate(${margin.x}, 0)`)
          .call(
            axisLeft(scale.y)
              .tickSize(-(width - margin.x * 2))
              .tickFormat(format("$,"))
          )
          .call((axis) => axis.select(".domain").attr("stroke-width", 0))
          .call((axis) =>
            axis
              .select(`#${ChartId.YAxisLabel}`)
              .attr("x", 0)
              .attr("y", margin.y)
          )
          .call(axisStyle);

        select(`#${ChartId.Line}`).attr("d", line().curve(curveLinear)(points));
        // const tooltip = select(`#${ChartId.Tooltip}`);

        // const handlePointMoved = (event: MouseEvent): void => {
        //   const i = bisect(
        //     data.map(getXValue),
        //     scale.x.invert(pointer(event)[0])
        //   );

        //   if (points[i]) {
        //     tooltip.style("opacity", 1);
        //     tooltip.attr(
        //       "transform",
        //       `translate(${points[i][0] - 10}, ${points[i][1] + 5})`
        //     );
        //   }
        // };

        // const handlePointLeave = (): void => {
        //   tooltip.style("opacity", 0);
        // };

        // select("svg")
        //   .on("pointerenter pointermove", handlePointMoved)
        //   .on("touchstart", (event) => event.preventDefault())
        //   .on("pointerleave", handlePointLeave);
      }
    },
    [width, height]
  );

  useLayoutEffect(() => {
    if (data && domain) {
      handleSetPath(data, domain);
    }
  }, [data, domain, handleSetPath]);
};
