import cls from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <nav>
      <div className={cls.Navbar}>
        <div className={cls.navContainer}>
          <div className={cls.logo}>
            <h1>Logo</h1>
          </div>
          <div className={cls.menuItems}></div>
        </div>
      </div>
    </nav>
  );
};
