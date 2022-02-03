import React from "react"
import styles from "../../../styles/Steps/StepsInfo.module.css"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const StepsInfo: React.FC = () => {

    return (
        <div className={styles.card}>
            <h4><InfoOutlinedIcon /> Информация</h4>
            <p>Для передачи заявки в ручном формате от лица компании,
            заполните все необходимые поля и нажмите кнопку отправить.
            При необходимости вы можете указать источник для дальнейшейаналитики.</p>
        </div>
    );
};

export default StepsInfo;
