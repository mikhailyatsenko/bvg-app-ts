import { type Stop } from "features/Stops";
import cls from "./ButtonWithFavStop.module.scss";

interface ButtonWithFavStopProps {
  stop: Stop;
  selectStopHandler: (selectedStop: Stop) => void;
  isFav?: boolean;
}

export const ButtonWithFavStop = ({ selectStopHandler, stop, isFav }: ButtonWithFavStopProps) => {
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
