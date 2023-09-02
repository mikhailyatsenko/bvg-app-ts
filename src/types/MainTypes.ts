export type StopType = { id: string; name: string };

export type ArrivalsType = {
  arrivals: {
    [key: string]: string | [] | {} | null;
    line: {
      [key: string]: string | {};
      product: string;
      name: string;
    };
    when: string | null;
    plannedWhen: string;
    provenance: string;
  }[];
  realtimeDataUpdatedAt: number;
};

export type NormalizedArrivalType = {
  type: string;
  time: string;
  routeNumber: string;
  destination: string;
}[];
