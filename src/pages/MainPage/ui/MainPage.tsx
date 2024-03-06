import { Stops } from "entities/Stops";
import { StopSearch } from "features/StopSearch";

const MainPage = () => {
  return (
    <>
      <StopSearch />
      <Stops />
    </>
  );
};

export default MainPage;
