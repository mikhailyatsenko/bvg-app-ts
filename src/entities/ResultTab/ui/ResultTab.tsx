import { type Stop } from "features/LoadArrivals";
import cls from "./ResultTab.module.scss";

interface ResultTabProps {
  stopsArray: Stop[];
  isActive: boolean;
  onSelect: (stop: Stop) => void;
}

export const ResultTab = ({ stopsArray = [], isActive, onSelect }: ResultTabProps) => {
  return (
    <div className={`${cls.resultTab} ${isActive ? cls.resultTabActive : ""}`} data-testid="result-tab">
      <div className={cls.ul}>
        {stopsArray.map((stop) => (
          <div
            onClick={() => {
              onSelect(stop);
            }}
            key={stop.id}
            className={`${cls.li} ${cls.liActive}`}
          >
            <div className={cls.liText}>{stop.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
