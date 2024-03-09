// import FiltersOnArrivalPage from "./FiltersOnArrivalPage";
import { useSelector } from "react-redux";
import { getArrivals } from "features/LoadArrivals";
import { getSelectedStop } from "entities/Stops";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect } from "react";
import { fetchArrivals } from "features/LoadArrivals/model/services/fetchArrivals";

export const ArrivalsTable: React.FC = () => {
  const arrivals = useSelector(getArrivals);
  const selectedStop = useSelector(getSelectedStop);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const arrivalsData = async () => {
      const arrivalsData = await dispatch(fetchArrivals(selectedStop));
      console.log(arrivalsData);
    };

    arrivalsData().catch((e) => {
      console.error("Error occurred during fetchArrivals: ", e);
    });
  }, [dispatch, selectedStop]);

  return (
    <>
      <div className="arrivals-section">
        <h2 className="">{selectedStop.name}</h2>

        <div className="arrivals">
          {arrivals.map((arrival, index) => (
            <div className="arrivals__line" key={index}>
              <div className="arrivals__item">{arrival.type}</div>
              <div className="arrivals__item">{arrival.routeNumber}</div>
              <div className="arrivals__item">{arrival.destination}</div>
              <div className="arrivals__item">{arrival.time.slice(11, 16)}</div>
              {/* <div className={`arrivals__item arrivals__item--${beIn[index]}`}>{beIn[index]}</div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
