import cls from "./BackToMain.module.scss";
import { useNavigate } from "react-router-dom";

export const BackToMain = () => {
  const navigate = useNavigate();
  function goToMain() {
    navigate("/");
  }
  return <button onClick={goToMain} className={cls.BackToMain}></button>;
};
