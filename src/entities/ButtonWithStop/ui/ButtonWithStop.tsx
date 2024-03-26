import { type Stop } from "features/Stops";
import cls from "./ButtonWithStop.module.scss";

interface ButtonWithStopProps {
  stop: Stop;
  selectStopHandler: (selectedStop: Stop) => void;
  isFav?: boolean;
}

export const ButtonWithStop = ({ selectStopHandler, stop, isFav }: ButtonWithStopProps) => {
  return (
    <div
      className={`${cls.CardWithStopName} ${isFav ? cls.favorite : ""}`}
      key={stop.id}
      onClick={() => {
        selectStopHandler({ id: stop.id, name: stop.name });
      }}
    >
      {stop.name}
    </div>
  );
};
