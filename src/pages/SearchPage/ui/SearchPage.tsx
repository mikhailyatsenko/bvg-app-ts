import { StopSearch } from "features/StopSearch";
import cls from "./SearchPage.module.scss";

export const SearchPage = () => {
  return (
    <div className={cls.SearchPage}>
      <section id={cls.search}>
        <StopSearch />
      </section>
    </div>
  );
};
