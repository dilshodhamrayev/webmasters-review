import React from "react";
import {
    createStyles,
    makeStyles,
    withStyles,
    Theme,
} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { Controller } from "react-hook-form";
import { Typography } from "@material-ui/core";
import styles from "../../styles/form/TextfieldBootstrap.module.css";

interface Props {
    name: string;
    label: string;
    required: boolean;
    control: any;
    errors: any;
    icon?: any;
}

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid #ced4da",
            fontSize: 16,
            padding: "10px 26px 10px 12px",
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
            "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
        },
    })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    })
);

const TextfieldBoostrap: React.FC<Props> = ({
    name,
    label,
    control,
    required,
    errors,
    icon,
    ...props
}) => {

    return (
      <div>
        <p>{label}</p>
        <div className={styles.wrapper}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.input}>
            <FormControl placeholder={label} fullWidth {...props}>
              <Controller
                as={<BootstrapInput id='demo-customized-textbox' />}
                name={name}
                control={control}
                rules={{ required }}
              />
            </FormControl>
          </div>
        </div>
        {errors[name] && (
          <Typography
            className='input_field_error'
            variant='caption'
            display='block'
            color='error'
            gutterBottom
          >
            Это поле обязательно для заполнения
          </Typography>
        )}
      </div>
    );
};

export default TextfieldBoostrap;
