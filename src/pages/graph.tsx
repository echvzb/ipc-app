import { type NextPage } from "next";
import Chart from "./components/Chart";
import { useProtectedPage } from "./hooks/useProtectedPage";

const GraphPage: NextPage = () => {
  const { data, status } = useProtectedPage();
  if (status === "authenticated" && data?.user.canSeeGraph) {
    return <Chart />;
  } else if (status === "authenticated" && !data?.user.canSeeGraph) {
    return <div>No tienes permiso para ver esta página</div>;
  }
  return <></>;
};

export default GraphPage;
