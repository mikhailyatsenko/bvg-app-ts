import cls from "./ScrollDown.module.scss";

interface ScrollDownProps {
  clickHandler?: () => void;
}
export const ScrollDown: React.FC<ScrollDownProps> = ({ clickHandler }) => {
  return (
    <div onClick={clickHandler} className={cls.field}>
      <div className={cls.scroll}></div>
    </div>
  );
};
