export interface Arrival {
  type: string;
  time: string;
  routeNumber: string;
  destination: string;
}

export interface Stop {
  id: string;
  name: string;
}

export type Arrivals = Arrival[];

export interface ArrivalsSchema {
  selectedStop: Stop;
  isLoading: boolean;
  arrivals: Arrivals;
  error?: string;
}
