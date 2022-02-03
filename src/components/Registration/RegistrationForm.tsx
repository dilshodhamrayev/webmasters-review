import React from "react";
import GenerateInputFields from "../form/GenerateInputFields"
import { useForm } from "react-hook-form";
import fields from "./fields.json";
// MUI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
// Redux 
import { useAppDispatch } from "../../redux/hooks"
import { signup } from "../../redux/auth/thunks"

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

const RegistrationForm: React.FC = () => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm<IFormInput>();
  const dispatch = useAppDispatch()


  const onSubmit = (data: IFormInput) => {
    dispatch(signup(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GenerateInputFields fields={fields} control={control} errors={errors} />
      <Grid item xs>
        <Button
          type='submit'
          fullWidth
          className={classes.borderRadius}
          variant='contained'
          color='primary'
        >
          Зарегистрироваться
        </Button>
      </Grid>
    </form>
  );
};

export default RegistrationForm;
