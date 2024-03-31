import cls from "./AboutPage.module.scss";

export const AboutPage = () => {
  return (
    <div className={cls.AboutPage}>
      <section>
        <div className={cls.text}>
          <h1>About</h1>
          <p>
            This is a web application designed for viewing real-time arrival times of public transport at stops in
            Berlin and Brandenburg.
          </p>
          <p>Users can filter results by transport type, destination, and route number.</p>
          <p>
            Additionally, frequently used stops can be added to favorites, which are stored in local storage for
            convenience.
          </p>
        </div>
      </section>
    </div>
  );
};
