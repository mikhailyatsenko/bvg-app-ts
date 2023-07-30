import { NormalizedArrivalType, Filters } from "../../types";

type FiltersStateType = {
  filteredPeriod: string;
  filters: Filters;
  parametrsToFilterArrival: string[][];
};

const initialState: FiltersStateType = {
  filteredPeriod: "10",
  filters: { type: "", routeNumber: "", destination: "" },
  parametrsToFilterArrival: [[], [], []],
};
