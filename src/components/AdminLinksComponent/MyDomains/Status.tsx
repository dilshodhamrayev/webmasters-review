import React from "react";
import domainStyles from "../../../styles/Domains/Domains.module.css";
import { ReactComponent as StatusReturn } from "../../../assets/svg/statusReturn.svg";
import { ReactComponent as StatusX } from "../../../assets/svg/statusX.svg";
import { ReactComponent as StatusCheck } from "../../../assets/svg/statusCheck.svg";

interface Props {
  active: number;
  text: string;
}

const GTable: React.FC<Props> = ({ active, text }) => {
  return (
    <div className={domainStyles.status}>
      <span>
        {active ? <StatusCheck /> : <StatusX />} {text}
      </span>
      <StatusReturn className={domainStyles.cursor_pointer} />
    </div>
  );
};

export default GTable;
