import { HeroSection } from "widgets/HeroSection";
import cls from "./MainPage.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const toStopSearchSection = () => {
    navigate("search");
  };

  useEffect(() => {
    const lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const isScrollingDown = scrollTop > lastScrollTop;
      if (isScrollingDown && scrollTop > 40) {
        navigate("search");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  return (
    <div className={cls.MainPage}>
      <section id={cls.hero}>
        <HeroSection toStopSearchSection={toStopSearchSection} />
      </section>
    </div>
  );
};

export default MainPage;
