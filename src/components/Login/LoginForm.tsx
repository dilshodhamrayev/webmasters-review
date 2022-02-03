import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import fields from "./fields.json";
import GenerateInputFields from "../form/GenerateInputFields";
// MUI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
// Redux
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { login } from "../../redux/auth/thunks";

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

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const authenticated = useSelector(
    (state: any) => state.authReducer.authenticated
  );

  const onSubmit = (data: IFormInput) => {
    dispatch(login({ ...data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Redirect user to dash if have an account */}
      {authenticated && <Redirect to="/dashboard" />}
      <GenerateInputFields fields={fields} control={control} errors={errors} />
      <Grid item xs>
        <Button
          type="submit"
          fullWidth
          className={classes.borderRadius}
          variant="contained"
          color="primary"
        >
          Войти
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
