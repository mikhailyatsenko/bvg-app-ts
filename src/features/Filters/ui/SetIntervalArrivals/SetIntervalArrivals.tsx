import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { IntervalDropdown } from "entities/IntervalDropdown";
import { filtersActions } from "features/Filters/model/slice/filterSlice";
import { getIntervalArrivals } from "features/Filters/model/selectors/getIntervalArrivals";

export const SetIntervalArrivals = () => {
  const intervalValues = ["15", "30", "45"];
  const dispatch = useAppDispatch();
  const intervalArrivals = useSelector(getIntervalArrivals);

  return (
    <IntervalDropdown
      values={intervalValues}
      onSelect={(value) => {
        if (value !== intervalArrivals) {
          dispatch(filtersActions.setIntervalArrivals(value));
        }
      }}
      selectValue={intervalArrivals}
    />
  );
};
