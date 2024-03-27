import { Stops } from "features/Stops";
import { StopSearch } from "features/StopSearch";
import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";
import { useEffect, useRef, useState } from "react";

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stopsSectionRef = useRef<HTMLDivElement>(null);

  const [isStopsInView, setIsStopsInView] = useState(false);

  const scrollStopsSection = () => {
    const stopSection = stopsSectionRef.current;
    if (stopSection) {
      stopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const target = stopsSectionRef.current;
      if (container && target) {
        const containerTop = container.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        const isVisible = targetTop - containerTop <= container.clientHeight;
        setIsStopsInView(isVisible);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} id={cls.container}>
      <section id="hero">
        <HeroSection scrollStopsSection={scrollStopsSection} />
      </section>
      <section ref={stopsSectionRef} id={cls.stops}>
        <StopSearch isStopsInView={isStopsInView} />
        <Stops />
      </section>
    </div>
  );
};

export default MainPage;
