import React from "react";
import styles from "../../styles/Steps/StepsInfo.module.css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

interface Props {
  content: React.ReactNode;
}

const SideInfoCard: React.FC<Props> = ({ content }) => {
  return (
    <div className={styles.card}>
      <h4>
        <InfoOutlinedIcon /> Информация
      </h4>
      {content}
    </div>
  );
};

export default SideInfoCard;
