import React from "react";
import { Controller } from "react-hook-form";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import styles from "../../styles/form/TextfieldBootstrap.module.css";

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

interface Props {
  name: string;
  label: string;
  required: boolean;
  multiple: boolean;
  control: any;
  errors: any;
  options: any;
  icon?: any;
  type: any;
}

const InputSelect: React.FC<Props> = ({
  name,
  label,
  control,
  options,
  required,
  errors,
  icon,
  type,
  multiple,
  ...props
}) => {
  return (
    <div>
      <p>{label}</p>
      <div className={styles.wrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.input}>
          <FormControl
            variant='outlined'
            size='small'
            fullWidth={true}
            {...props}
          >
            <Controller
              as={
                <NativeSelect input={<BootstrapInput />}>
                  {options.map((option: any, i: number) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </NativeSelect>
              }
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
export default InputSelect;
