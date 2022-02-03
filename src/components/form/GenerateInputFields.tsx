import React from "react";
import InputTextfield from "../form/InputTextfield";
import InputSelect from "../form/InputSelect";
import InputCheckbox from "../form/InputCheckbox";
import InputRadio from "../form/InputRadio";
import TextfieldBootstrap from "../form/TextfieldBootstrap";
import SelectBootstrap from "../form/SelectBootstrap";
import styles from "../../styles/Registration/RegistrationForm.module.css";
// MUI
import { Grid, Link } from "@material-ui/core";

const GenerateFields: React.FC<any> = ({ fields, control, errors }) => {
  return (
    <div className={styles.overflow_inputs}>
      <Grid container spacing={2} alignItems='flex-start' justify='flex-start'>
        {fields.map((field: any, index: number) => {
          switch (field.type) {
            case "text":
            case "password":
              return (
                <Grid key={index} item xs={12}>
                  <InputTextfield
                    {...field}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              );
            case "textb":
              return (
                <Grid key={index} item xs={12}>
                  <TextfieldBootstrap
                    {...field}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              );
            case "select":
              return (
                <Grid key={index} item xs={12}>
                  <InputSelect {...field} control={control} errors={errors} />
                </Grid>
              );
            case "selectb":
              return (
                <Grid key={index} item xs={12}>
                  <SelectBootstrap
                    {...field}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              );
            case "checkbox":
              return (
                <Grid key={index} item xs={12}>
                  <InputCheckbox {...field} control={control} errors={errors} />
                  <Link href='#'>Условия и правила. </Link>
                </Grid>
              );
            case "radio":
              return (
                <Grid key={index} item xs={12}>
                  <InputRadio
                    {...field}
                    control={control}
                    errors={errors}
                    title=''
                  />
                </Grid>
              );
            default:
              break;
          }
        })}
      </Grid>
    </div>
  );
};

export default GenerateFields;
