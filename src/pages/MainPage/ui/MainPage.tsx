import { Stops } from "features/Stops";
import { StopSearch } from "features/StopSearch";
import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <section>
        <StopSearch />
        <Stops />
      </section>
    </>
  );
};

export default MainPage;
