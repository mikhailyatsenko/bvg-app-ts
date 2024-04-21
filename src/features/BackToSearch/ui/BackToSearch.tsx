import cls from "./BackToSearch.module.scss";
import { useNavigate } from "react-router-dom";

export const BackToSearch = () => {
  const navigate = useNavigate();
  function goToMain() {
    navigate("/search");
  }
  return <button onClick={goToMain} className={cls.BackToMain}></button>;
};
