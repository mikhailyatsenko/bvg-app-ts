// import { Stops } from "features/Stops";
import { StopSearch } from "features/StopSearch";
import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";
import { useRef } from "react";

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stopsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToStopsSection = () => {
    const stopSection = stopsSectionRef.current;
    if (stopSection) {
      stopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={containerRef} id={cls.container}>
      <section id="hero">
        <HeroSection scrollToStopsSection={scrollToStopsSection} />
      </section>
      <section ref={stopsSectionRef} id={cls.stops}>
        <StopSearch />
        {/* <Stops /> */}
      </section>
    </div>
  );
};

export default MainPage;
