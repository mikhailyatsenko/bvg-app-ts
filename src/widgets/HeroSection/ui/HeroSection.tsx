import { ButtonPrimary } from "shared/ui/ButtonPrimary";
import cls from "./HeroSection.module.scss";
import { ScrollDown } from "shared/ui/ScrollDown/ScrollDown";

export const HeroSection = () => {
  return (
    <section id={cls.hero}>
      <div className={cls.text}>
        Find public transport arrivals at any stop in <span>Berlin</span> and <span>Brandenburg</span>
      </div>
      {/* <div className="break-flex"></div> */}
      <ButtonPrimary clickHandler={() => {}} size="xl">
        Go to search
      </ButtonPrimary>
      <ScrollDown clickHandler={() => {}} />
    </section>
  );
};
