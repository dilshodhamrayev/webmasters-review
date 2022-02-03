import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextfieldBootstrap from "../../../form/TextfieldBootstrap";
// MUI
import { Grid, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { arrayToFormData } from "../../../../utils/helpers";
// Redux
import { useAppDispatch } from "../../../../redux/hooks";
// import { useSelector } from "react-redux"
import {
  genLandingForm,
  updateLandingForm,
} from "../../../../redux/landing/thunks";

interface IFormInput {
  yandex_metrika: string;
  google_analytics: string;
  facebook_pixel: string;
  vk_pixel: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderRadius: {
      borderRadius: "60px",
      padding: "0.5rem 2.5rem",
    },
  })
);

const fields1 = [
  {
    name: "yandex_metrika",
    label: "Яндекс метрика ID",
    type: "text",
    required: true,
  },
  {
    name: "google_analytics",
    label: "Google Aanatlytics ID",
    type: "text",
    required: true,
  },
  {
    name: "facebook_pixel",
    label: "Facebook pixel ID",
    type: "text",
    required: true,
  },
  {
    name: "vk_pixel",
    label: "VK.com Pixel ID",
    type: "text",
    required: true,
  },
];

const LandingAnalytics: React.FC<any> = ({
  setstep,
  mainFormVals,
  currentStream,
}) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    let vals = { ...mainFormVals, ...data };
    currentStream
      ? dispatch(
          updateLandingForm({
            id: currentStream.stream_id,
            formData: arrayToFormData(vals),
          })
        )
      : dispatch(genLandingForm(arrayToFormData(vals)));
  };

  useEffect(() => {
    reset(mainFormVals);
  }, [mainFormVals]);

  return (
    <div>
      <h4>Настройка аналитика </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {fields1.map((f) => (
            <Grid item xs={12} md={6}>
              <TextfieldBootstrap {...f} control={control} errors={errors} />
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <Button
            type='submit'
            onClick={() => setstep(4)}
            className={classes.borderRadius}
            variant='contained'
            color='primary'
          >
            Назад
          </Button>
          <Button
            type='submit'
            className={classes.borderRadius}
            variant='contained'
            color='primary'
          >
            Сохранит
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LandingAnalytics;
