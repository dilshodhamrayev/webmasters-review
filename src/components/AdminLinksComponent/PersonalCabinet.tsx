import React from "react";
import GenerateInputFields from "../form/GenerateInputFields"
import { useForm } from "react-hook-form";
import fields from "./fields.json";
// MUI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
// Redux 
import { useAppDispatch } from "../../redux/hooks"
import { update } from "../../redux/auth/thunks"

interface IFormInput {
    firstName: string;
    lastName: string;
    iceCreamType: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        borderRadius: {
            borderRadius: "60px",
        },
    })
);

const PersonalCabinet: React.FC = () => {
    const classes = useStyles();
    const { control, handleSubmit, errors, reset } = useForm<IFormInput>();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: IFormInput, e) => {
        const res = await dispatch(update(data));
        e.target.reset();
        console.log(res)
    };


    return (
        <div className="row d-flex justify-content-center">
            <div className="col-md-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GenerateInputFields fields={fields} control={control} errors={errors} />
                    <Grid item xs>
                        <Button
                            type='submit'
                            fullWidth
                            className={classes.borderRadius}
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                reset();
                            }}
                        >
                            Сохранить
                 </Button>
                    </Grid>
                </form>
            </div>
        </div>

    );
};

export default PersonalCabinet;
