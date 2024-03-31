import { ButtonPrimary } from "shared/ui/ButtonPrimary";
import cls from "./HeroSection.module.scss";
import { ScrollDown } from "shared/ui/ScrollDown/ScrollDown";

interface HeroSectionProps {
  scrollToStopsSection: () => void;
}

export const HeroSection = ({ scrollToStopsSection }: HeroSectionProps) => {
  return (
    <div className={cls.hero}>
      <div className={cls.text}>
        Find public transport arrivals at any stop in <strong>Berlin</strong> and <strong>Brandenburg</strong>
      </div>
      {/* <div className="break-flex"></div> */}
      <ButtonPrimary clickHandler={scrollToStopsSection} size="xl">
        Go to search
      </ButtonPrimary>
      <ScrollDown clickHandler={scrollToStopsSection} />
    </div>
  );
};
