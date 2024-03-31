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
          <p>
            This application retrieves data from the public API <strong>v6.bvg.transport.rest</strong>. While app strive
            to provide accurate information, please note that occasional discrepancies may occur.
          </p>
        </div>
      </section>
    </div>
  );
};
