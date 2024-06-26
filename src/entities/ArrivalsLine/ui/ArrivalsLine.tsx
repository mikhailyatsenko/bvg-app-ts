import cls from "./ArrivalsLine.module.scss";

interface ArrivalsLineProps {
  transportType: string;
  routeNumber: string;
  destination: string;
  time: string;
  remainingTime: number;
}

export const ArrivalsLine = ({ destination, remainingTime, routeNumber, time, transportType }: ArrivalsLineProps) => {
  function formatRemainingTime(minutes: number) {
    if (minutes <= -2) {
      return "gone";
    } else if (minutes <= 0) {
      return "now";
    } else {
      return `~ ${minutes} min`;
    }
  }

  return (
    <div className={cls.ArrivalsLine}>
      <div className={cls.lineItem}>
        {transportType}
        <div className={cls.routeNumberMobile} data-testid="routeNumberMobile">
          {routeNumber}
        </div>
      </div>
      <div className={`${cls.lineItem} ${cls.routeNumberDesktop}`} data-testid="routeNumberDesktop">
        {routeNumber}
      </div>
      <div className={cls.lineItem}>{destination}</div>
      <div className={cls.lineItem}>{time.slice(11, 16)}</div>
      <div className={cls.lineItem}>{formatRemainingTime(remainingTime)}</div>
    </div>
  );
};
