import { useQuery } from "@tanstack/react-query";
import {
  axisBottom,
  axisLeft,
  curveLinear,
  easeLinear,
  extent,
  format,
  line,
  scaleLinear,
  scaleTime,
  select,
  timeMinute,
  type Selection,
} from "d3";
import { useState, useCallback, useLayoutEffect } from "react";
import {
  ChartId,
  CHART_MARGIN,
  ClassNames,
  MD_BREAKPOINT,
} from "./Chart.constants";
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

  const { data, isLoading } = useQuery(["chartData"], getChartData, {
    initialData: [],
    refetchOnWindowFocus: false,
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
        const range = {
          x: [CHART_MARGIN.LEFT, width - CHART_MARGIN.RIGHT],
          y: [CHART_MARGIN.BOTTOM, height - CHART_MARGIN.TOP],
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
          .attr("transform", `translate(0, ${height - CHART_MARGIN.BOTTOM})`)
          .call(
            axisBottom(scale.x)
              .tickSize(3)
              .ticks(
                timeMinute.every(width > MD_BREAKPOINT ? 30 : 60),
                "%I:%M %p"
              )
          )
          .call((axis) =>
            axis.select(".domain").attr("class", `domain ${ClassNames.Tick}`)
          )
          .call(axisStyle);

        select<SVGGElement, unknown>(`#${ChartId.YAxis}`)
          .attr("transform", `translate(${CHART_MARGIN.LEFT}, 0)`)
          .call(
            axisLeft(scale.y)
              .tickSize(-(width - (CHART_MARGIN.LEFT + CHART_MARGIN.RIGHT)))
              .tickFormat(format("$,"))
          )
          .call((axis) => axis.select(".domain").attr("stroke-width", 0))
          .call((axis) =>
            axis
              .select(`#${ChartId.YAxisLabel}`)
              .attr("x", 0)
              .attr("y", CHART_MARGIN.TOP)
          )
          .call(axisStyle);
        const path = select<SVGPathElement, unknown>(`#${ChartId.Line}`);
        path.attr("d", line().curve(curveLinear)(points));
        const pathNode = path.node();
        const length = pathNode ? pathNode.getTotalLength() : 0;

        path
          .attr("stroke-dasharray", `${length} ${length}`)
          .attr("stroke-dashoffset", length)
          .transition()
          .ease(easeLinear)
          .attr("stroke-dashoffset", 0)
          .duration(5000);

        select("svg").style("opacity", 1);
      }
    },
    [width, height]
  );

  useLayoutEffect(() => {
    if (data && domain) {
      handleSetPath(data, domain);
    }
  }, [data, domain, handleSetPath]);

  return { isLoading };
};
