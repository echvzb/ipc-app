import type { FC } from "react";
import Spinner from "./Spinner";

const SpinnerOverlay: FC = () => (
  <div className="fixed left-0 top-0 z-50 h-full w-full bg-slate-300 opacity-50">
    <div className="fixed left-2/4 top-2/4">
      <Spinner />
    </div>
  </div>
);

export default SpinnerOverlay;
