import { StopSearch } from "features/StopSearch";
import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";
import { useEffect, useRef } from "react";

const MainPage = () => {
  const stopsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToStopsSection = () => {
    const stopSection = stopsSectionRef.current;
    if (stopSection) {
      stopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    const handleScroll = () => {
      const stopSection = stopsSectionRef.current;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (stopSection) {
        const { top } = stopSection.getBoundingClientRect();
        const isScrollingDown = scrollTop > lastScrollTop;

        if (top <= window.innerHeight - 100 && isScrollingDown) {
          window.scrollTo({ top: window.scrollY + top, behavior: "auto" });
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
