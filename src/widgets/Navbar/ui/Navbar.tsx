import { useEffect, useState } from "react";
import cls from "./Navbar.module.scss";
import { Logo } from "shared/ui/Logo";

export const Navbar = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
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

  return (
    <nav className={cls.navbar}>
      <a href="#" className={cls.logo}>
        <Logo />
      </a>
      <ul
        onClick={() => {
          setIsBurgerActive(false);
        }}
        className={`${cls.navMenu} ${isBurgerActive ? cls.active : ""}`}
      >
        <li className={cls.navItem}>Home</li>
        <li className={cls.navItem}>About</li>
        <li className={cls.navItem}>Contact</li>
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
