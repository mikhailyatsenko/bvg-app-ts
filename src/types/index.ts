export type StopType = { id: string; name: string };

export type ArivalsType = {
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

export type NormalizedArrivalType = { [key: string]: { type: string; time: string; routeNumber: string; destination: string }[] };
