import React from "react"
import { Button, Spinner } from "reactstrap";

const GButton: React.FC<any> = ({ loading, text }) => {

    return (
        <Button>
            <Spinner color="primary" loading={loading} />
            {text}
        </Button>
    );
}

export default GButton
