import { type NextPage } from "next";
import Chart from "./components/Chart";
import { useProtectedPage } from "./hooks/useProtectedPage";

const Home: NextPage = () => {
  useProtectedPage();
  return (
    <>
      <Chart />
    </>
  );
};

export default Home;
