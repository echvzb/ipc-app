export type XDomainT = [Date, Date];
export type YDomainT = [number, number];

export interface IChartPoint {
  date: string;
  price: number;
  percentageChange: number;
  volume: number;
  change: number;
}

export interface IDomain {
  x: XDomainT;
  y: YDomainT;
}

export interface IUseChartArgs {
  width: number;
  height: number;
}
