import React from "react"
import { Alert } from "reactstrap"
import styles from "../../styles/global/ErrorNotification.module.css"

const ErrorNotification: React.FC<any> = ({ text, open }) => {

    return (
        <div className={styles.wrapper}>
            <Alert color="danger" isOpen={open}>
                {text}
            </Alert>
        </div>
    );
}

export default ErrorNotification
