import { type Stop } from "features/Stops";
import cls from "./CardWithStopName.module.scss";

interface CardWithStopNameProps {
  stop: Stop;
  selectStopHandler: (selectedStop: Stop) => void;
}

export const CardWithStopName = ({ selectStopHandler, stop }: CardWithStopNameProps) => {
  return (
    <div
      className={cls.CardWithStopName}
      key={stop.id}
      onClick={() => {
        selectStopHandler({ id: stop.id, name: stop.name });
      }}
    >
      {stop.name}
    </div>
  );
};
