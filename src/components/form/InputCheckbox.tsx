import React from "react";
import { Checkbox } from "@material-ui/core";
import { Controller } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface Props {
  name: string;
  label: string;
  required: boolean;
  control: any;
  errors: any;
}

const InputSelect: React.FC<Props> = ({
  name,
  label,
  control,
  required,
  errors,
  ...props
}) => {
  return (

    <Controller
      name={name}
      control={control}
      render={(props) => (
        <FormControlLabel label={label} control={<Checkbox color="primary"
          onChange={(e) => props.onChange(e.target.checked)}
          checked={props.value}
        />} />
      )}
    />
  );
};
export default InputSelect;
