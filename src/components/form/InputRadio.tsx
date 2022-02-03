import React from "react";
import { Controller } from "react-hook-form";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";

interface Props {
  name: string;
  label: string;
  required: boolean;
  control: any;
  errors: any;
  inputProps?: any;
  labels: any;
  title: string;
  defaultVal: string;
}

const InputAutoComplete: React.FC<Props> = ({
  required,
  control,
  name,
  labels,
  title,
  defaultVal,
  errors,
}) => {
  return (
    <div>
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='flex-start'
        spacing={2}
      >
        <Grid item xs>
          <Controller
            rules={{ required }}
            name={name}
            control={control}
            as={
              <RadioGroup
                defaultValue={defaultVal}
                aria-label='gender'
                style={{ flexDirection: "row" }}
              >
                {labels.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled && item.disabled}
                    control={<Radio color='primary' />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            }
          />
        </Grid>
      </Grid>
      {errors[name] && (
        <span className='input_field_error'>
          Это поле обязательно для заполнения
        </span>
      )}
    </div>
  );
};

export default InputAutoComplete;
