import { useEffect, useState } from "react";
import cls from "./Navbar.module.scss";
import { Logo } from "shared/ui/Logo";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsBurgerActive(false);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setIsBurgerActive(false);
      });
    };
  }, []);

  function menuItemClickHandler(route: string) {
    navigate(`${route}`);
  }

  return (
    <nav className={cls.navbar}>
      <div
        onClick={() => {
          menuItemClickHandler("/");
        }}
        className={cls.logo}
      >
        <Logo />
      </div>
      <ul
        onClick={() => {
          setIsBurgerActive(false);
        }}
        className={`${cls.navMenu} ${isBurgerActive ? cls.active : ""}`}
      >
        <li
          onClick={() => {
            menuItemClickHandler("/");
          }}
          className={cls.navItem}
        >
          Home
        </li>
        <li
          onClick={() => {
            menuItemClickHandler("about");
          }}
          className={cls.navItem}
        >
          About
        </li>
        <li
          onClick={() => {
            menuItemClickHandler("contacts");
          }}
          className={cls.navItem}
        >
          Contact
        </li>
      </ul>
      <div
        onClick={() => {
          setIsBurgerActive((prevState) => !prevState);
        }}
        className={`${cls.hamburger} ${isBurgerActive ? cls.active : ""}`}
      >
        <span className={cls.bar}></span>
        <span className={cls.bar}></span>
        <span className={cls.bar}></span>
      </div>
    </nav>
  );
};
