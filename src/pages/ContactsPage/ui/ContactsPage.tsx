import cls from "./ContactsPage.module.scss";

export const ContactsPage = () => {
  return (
    <div className={cls.ContactsPage}>
      <section id={cls.contacts}>
        <div className={cls.text}>
          <h1>Contacts</h1>
          <p>Your feedback and recommendations for improvement are welcome!</p>
          <p>Additionally, pull requests on GitHub are appreciated.</p>

          <div className={cls.contactsLinks}>
            <div className={cls.email}>
              <a href="mailto:yatsenkomike@gmail.com">yatsenkomike@gmail.com</a>
            </div>
            <div className={cls.telegram}>
              <a href="https://t.me/mikhailyatsenko">@mikhailyatsenko</a>
            </div>
            <div className={cls.github}>
              <a href="https://github.com/mikhailyatsenko/bvg-app-ts" target="_blank" rel="noreferrer">
                @mikhailyatsenko
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
