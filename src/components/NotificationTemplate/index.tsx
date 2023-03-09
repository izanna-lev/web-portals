import styles from "./index.module.scss";

const NotificationTemplate = (props: any) => {
  const { setmessage, templates } = props;

  return (
    <div className={styles["notification-template-conatiner"]}>
      <h3 className={styles["template-heading"]}>Notification Templates</h3>
      <ul className={styles["template-wrapper"]}>
        {templates.map((template: string, index: number) => (
          <li
            className={styles["template-text"]}
            onClick={() => setmessage(template)}
          >
            {template}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationTemplate;
