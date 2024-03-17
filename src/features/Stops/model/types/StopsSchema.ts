export interface Stop {
  id: string;
  name: string;
}

export interface StopsSchema {
  stopsToRender: Stop[];
  selectedStop: Stop;
}
