import axios from "axios";
import { type IChartPoint } from "./Chart.types";

const CHART_DATA_URL =
  "https://run.mocky.io/v3/cc4c350b-1f11-42a0-a1aa-f8593eafeb1e";

axios.interceptors.response.use((response) => response.data);

export const getChartData = (): Promise<IChartPoint[]> =>
  axios.get(CHART_DATA_URL);
