import { useState } from "react";
import cls from "./PullOutFilters.module.scss";

interface PullOutFiltersProps {
  children: React.ReactNode;
}

export const PullOutFilters = ({ children }: PullOutFiltersProps) => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <>
      <div className={`${cls.PullOutFiltersPanel} ${isExpand ? cls.expand : ""}`}>{children}</div>
      <div
        onClick={() => {
          setIsExpand((prewState) => !prewState);
        }}
        className={`${cls.buttonExpand} ${cls.dropBtn}`}
      ></div>
    </>
  );
};
