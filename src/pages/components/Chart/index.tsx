import { type FC, useRef, useState, useEffect } from "react";
import Spinner from "../Spinner";
import Title from "../Title";
import { ChartId, ClassNames, MD_BREAKPOINT } from "./Chart.constants";
import { useChart } from "./Chart.hooks";

const Chart: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const { isLoading } = useChart({ ...cardDimensions });

  useEffect(() => {
    const handleSetCardDimensions = (): void => {
      if (cardRef.current) {
        const { offsetWidth } = cardRef.current;
        let width = 0,
          height = 0;
        if (offsetWidth > MD_BREAKPOINT) {
          width = offsetWidth;
          height = width / 2;
        } else {
          width = offsetWidth;
          height = offsetWidth * 2;
        }

        setCardDimensions({
          width,
          height,
        });
      }
    };

    handleSetCardDimensions();
    window.addEventListener("resize", handleSetCardDimensions);
    return () => {
      window.removeEventListener("resize", handleSetCardDimensions);
    };
  }, []);

  return (
    <div className="rounded-lg bg-slate-100 px-8 shadow">
      {isLoading ? (
        <div className="flex flex-auto flex-col items-center justify-center py-10 md:py-8">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="pt-8">
            <Title>Indice de Precios y Cotizaciones</Title>
          </div>
          <div ref={cardRef}>
            <svg
              width={cardDimensions.width}
              height={cardDimensions.height}
              viewBox={`0 0 ${cardDimensions.width} ${cardDimensions.height}`}
              className="transition duration-500"
            >
              <g id={ChartId.XAxis} />
              <g id={ChartId.YAxis}>
                <text
                  textAnchor="end"
                  fill="currentColor"
                  id={ChartId.YAxisLabel}
                  className={ClassNames.Text}
                >
                  Precio
                </text>
              </g>
              <path
                id={ChartId.Line}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fill-none stroke-slate-700"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
