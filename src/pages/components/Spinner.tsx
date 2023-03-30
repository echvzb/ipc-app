import { type FC } from "react";

const Spinner: FC = () => (
  <div
    className="inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-800"
    role="status"
    aria-label="loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
