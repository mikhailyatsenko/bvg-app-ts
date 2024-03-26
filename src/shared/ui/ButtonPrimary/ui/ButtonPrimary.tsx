import cls from "./ButtonPrimary.module.scss";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  size?: string;
  clickHandler?: () => void;
}

export const ButtonPrimary = ({ children, size = "", clickHandler }: ButtonPrimaryProps) => {
  return (
    <button onClick={clickHandler} className={`${cls.ButtonPrimary} ${cls[size]}`}>
      {children}
    </button>
  );
};
