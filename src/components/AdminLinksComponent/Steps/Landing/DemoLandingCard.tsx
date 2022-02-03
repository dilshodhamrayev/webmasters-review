import React from "react";
import Card from "@material-ui/core/Card";
import {
  createStyles,
  Theme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import styles from "../../../../styles/Steps/DemoLandingCard.module.css";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

interface Props {
  name: string;
  image: string;
  demo_link: string;
  description: string;
  tags: any;
  setstep: any;
  extraData: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: "5px",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
  })
);

const RedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

const DemoLandingCard: React.FC<Props> = ({
  name,
  image,
  demo_link,
  description,
  tags,
  setstep,
  extraData,
}) => {
  const classes = useStyles();
  const demo_img_style = {
    backgroundImage: `url(${image})`,
  };

  const handleDemoLink = () => {
    extraData.setmainFormVals({ ...extraData.mainFormVals, domain: demo_link });
    setstep(4);
  };

  return (
    <Card className={styles.landing_card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h4>{name}</h4>
          </Grid>
          <Grid item xs={12}>
            <div className={styles.demo_img_wrapper} style={demo_img_style}>
              <div className={styles.backdrop}>
                <div className={styles.actions_wrapper}>
                  <a href={demo_link} target='_blank' rel='noopener noreferrer'>
                    <Button variant='contained' color='primary'>
                      Cмотреть демо
                    </Button>
                  </a>
                  <RedButton
                    onClick={handleDemoLink}
                    variant='contained'
                    color='primary'
                  >
                    Выбирать
                  </RedButton>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={7}>
                <p>{description}</p>
              </Grid>
              <Grid item xs>
                {tags.map((t: any) => (
                  <Chip label={t.name} className={classes.root} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DemoLandingCard;
