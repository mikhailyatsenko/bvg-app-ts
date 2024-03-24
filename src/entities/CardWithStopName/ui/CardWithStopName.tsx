import { type Stop } from "features/Stops";
import cls from "./CardWithStopName.module.scss";

interface CardWithStopNameProps {
  stop: Stop;
  selectStopHandler: (selectedStop: Stop) => void;
  isFav?: boolean;
}

export const CardWithStopName = ({ selectStopHandler, stop, isFav }: CardWithStopNameProps) => {
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
