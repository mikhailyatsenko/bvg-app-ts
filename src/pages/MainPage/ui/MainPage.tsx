import { StopSearch } from "features/StopSearch";
import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";
import { useRef } from "react";

const MainPage = () => {
  const stopsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToStopsSection = () => {
    const stopSection = stopsSectionRef.current;
    if (stopSection) {
      stopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={cls.MainPage}>
      <section id={cls.hero}>
        <HeroSection scrollToStopsSection={scrollToStopsSection} />
      </section>
      <section ref={stopsSectionRef} id={cls.stops}>
        <StopSearch />
      </section>
    </div>
  );
};

export default MainPage;
