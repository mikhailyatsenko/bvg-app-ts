export interface Arrival {
  type: string;
  time: string;
  routeNumber: string;
  destination: string;
}

export type Arrivals = Arrival[];

export interface ArrivalsSchema {
  isLoading: boolean;
  arrivals: Arrivals;
  error?: string;
}
