import React from "react";
import { Controller } from "react-hook-form";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";

interface Props {
  name: string;
  label: string;
  required: boolean;
  control: any;
  errors: any;
  options: any;
  inputProps?: any;
  type: any;
}

const InputSelect: React.FC<Props> = ({
  name,
  label,
  control,
  options,
  required,
  errors,
  inputProps,
  type,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl
      variant='outlined'
      className='width100'
      size='small'
      fullWidth={true}
      {...props}
    >
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={label}>
            {options.map((option: any, i: number) => (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        }
        name={name}
        control={control}
        rules={{ required }}
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
    </FormControl>
  );
};
export default InputSelect;
