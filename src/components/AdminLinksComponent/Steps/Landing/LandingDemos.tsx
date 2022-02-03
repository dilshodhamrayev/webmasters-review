import React, { useEffect } from "react";
import DemoLandingCard from "./DemoLandingCard";
import { Grid, Button } from "@material-ui/core";
import { useAppDispatch } from "../../../../redux/hooks";
import { useSelector } from "react-redux";
import { fetchDemos } from "../../../../redux/landing/thunks";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderRadius: {
      borderRadius: "60px",
      padding: "0.5rem 2.5rem",
    },
  })
);

const LandingDemos: React.FC<any> = ({ setstep, extraData }) => {
  const demos = useSelector((state: any) => state.landingReducer.demos);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchDemos({}));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {demos.map((d: any) => (
          <Grid item md={6} xs={12}>
            <DemoLandingCard extraData={extraData} {...d} setstep={setstep} />
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
          className={classes.borderRadius}
          variant='contained'
          color='primary'
          onClick={() => setstep(1)}
        >
          Назад
        </Button>

        <Button
          type='submit'
          className={classes.borderRadius}
          onClick={() => setstep(3)}
          variant='contained'
          color='primary'
        >
          Дальее
        </Button>
      </div>
    </div>
  );
};

export default LandingDemos;
