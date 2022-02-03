import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import styles from "../../styles/NotificationList/NotificationList.module.css";

const notifications = [
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
  {
    title:
      "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus",
    body: "elit. Voluptate dolorem, exercitationem fugit ipsam debitis autem rerum. A, possimus? Q",
    date: "02.05.2020",
  },
];

const NotificationList: React.FC = () => {
  return (
    <div className={styles.notifications_list}>
      {notifications.map((n) => {
        return (
          <div className={styles.notification}>
            <div className={styles.content_one}>
              <EmailIcon />
              <div className={styles.text}>
                <p className={styles.title}>{n.title}</p>
                <p>{n.body}</p>
              </div>
            </div>
            <div className={styles.content_two}>
              <span>{n.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
