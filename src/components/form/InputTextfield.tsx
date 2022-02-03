import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface Props {
  name: string;
  label: string;
  required: boolean;
  control: any;
  errors: any;
  inputProps?: any;
  type: string;
}

const InputTextfield: React.FC<Props> = ({
  name,
  label,
  required,
  control,
  errors,
  inputProps,
  type,
}) => {
  const [showPassword, setshowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const getType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        as={
          <TextField
            fullWidth
            className='width100'
            size='small'
            label={label}
            id='formatted-numberformat-input'
            type={getType()}
            variant='outlined'
            InputProps={{
              startAdornment: inputProps,
              endAdornment: type === "password" && (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        }
      />
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

export default InputTextfield;
