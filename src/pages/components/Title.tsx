import type { FC } from "react";

interface TitleProps {
  children: string;
}

const Title: FC<TitleProps> = ({ children }) => (
  <h1 className="text-lg font-medium text-slate-900">
    {children}
  </h1>
);

export default Title;
