import React from "react"
import { Spinner } from 'reactstrap';
import styles from "../../styles/global/Spinner.module.css"

const GSpinner: React.FC<any> = ({  loading }) => {

    
    return (
        <div className={styles.backdrop}>
        <Spinner color="primary" loading={loading} />
        </div>
    );
}

export default GSpinner
