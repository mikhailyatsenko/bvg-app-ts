import stopsListData from "shared/assets/data/stopsList.json";

export const getStopNameById = (id: string): string => {
  const foundObject = stopsListData.find((obj) => obj.id === id);
  return foundObject ? foundObject.name : "";
};
