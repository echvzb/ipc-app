import axios from "axios";
import { CHART_DATA_URL } from "./Chart.constants";
import { type IChartPoint } from "./Chart.types";

axios.interceptors.response.use((response) => response.data);

export const getChartData = (): Promise<IChartPoint[]> =>
  axios.get(CHART_DATA_URL);
