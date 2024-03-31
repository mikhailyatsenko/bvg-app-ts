import { StopSearch } from "features/StopSearch";
import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";
import { useEffect, useRef, useState } from "react";

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stopsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToStopsSection = () => {
    const stopSection = stopsSectionRef.current;
    if (stopSection) {
      stopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        setIsAtTop(container.scrollTop < 70);
      }
    };

    handleScroll();

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
    <div ref={containerRef} className={`${isAtTop ? "" : cls.scrolled}`} id={cls.container}>
      <section id="hero">
        <HeroSection scrollToStopsSection={scrollToStopsSection} />
      </section>
      <section ref={stopsSectionRef} id={cls.stops}>
        <StopSearch />
      </section>
    </div>
  );
};

export default MainPage;
