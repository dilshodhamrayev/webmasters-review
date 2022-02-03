import React, { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { ETabValue } from "../../../utils/interface";
import axios from "axios";
import { arrayToFormData } from "../../../utils/helpers";
import AnalyticsSettings from "./Analytics/AnalyticsSettings";
import SideInfoCard from "../../global/SideInfoCard";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "react-responsive";
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useParams } from "react-router-dom";

const info = (
  <div>
    "Для передачи заявки в ручном формате от лица компании, заполните все
    необходимые поля и нажмите кнопку отправить. При необходимости вы можете
    указать источник для дальнейшейаналитики."
  </div>
);

const StepsMain: React.FC<any> = ({ currentStream, setcurrentStream }: any) => {
  const [step, setstep] = useState(1);
  const params = useParams();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // device: isDesktop ? 1 : isTablet ? 2 : 3

  const [mainFormVals, setmainFormVals] = useState({
    step: 1,
    // step 1
    streamName: "",
    direction_id: null,
    offer_id: null,
    scenarios_id: null,

    // step 2
    tool_id: 0,

    // step 3
    region_id: [], //+
    showRegion: false,
    titleForm: "Заказать звонок",
    showNameInput: false,
    showDescriptionInput: false,
    backgroundFormColor: "red",
    tabIndex: ETabValue.tabOne,
    buttonTitle: "Позвоните мне",
    // bazoviy tabOne
    defaultBackgroundImage: "assets/img/bg.jpg",
    showDefaultBackImage: false,
    // prodvinutie
    promptDescription: "Введите текст подсказки для поля Описание",
    colorTextForm: "#fff",
    colorButton: "black",
    linkImage: "",
    width: "auto",
    height: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    finalForm: "",
    stream_id: null,
    formCode: "",
  });

  useEffect(() => {
    console.log(params);

    if (currentStream) {
      console.log(currentStream);
      setmainFormVals({
        ...currentStream,
      });
    }
  }, [currentStream]);

  const streamRequest = ({ values, toolUrl }: any) => {
    let formData = arrayToFormData({
      ...mainFormVals,
      ...values,
      device: isDesktop ? 1 : isTablet ? 2 : 3,
    });
    let url = currentStream
      ? `/generate-form/${toolUrl}?id=${mainFormVals.stream_id}`
      : mainFormVals.stream_id
      ? `/generate-form/${toolUrl}?id=${mainFormVals.stream_id}`
      : `/generate-form/${toolUrl}`;
    axios({
      url,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        setmainFormVals({
          ...mainFormVals,
          ...values,
          formCode: res.data,
          stream_id: res.data.id,
        });
      })
      .catch((err) => console.log(err));
  };

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const setStepOneValue = (values: object) => {
    setmainFormVals({ ...mainFormVals, ...values });
  };

  const setStepTwoValue = (values: any) => {
    if (values.tool_id === "3") {
      streamRequest({ values, toolUrl: "create-site-system" });
    }
    setmainFormVals({ ...mainFormVals, ...values });
  };

  const setStepThreeValue = (values: any) => {
    streamRequest({ values, toolUrl: "create" });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Card>
          <CardContent>
            {step === 1 && (
              <StepOne
                nextStep={nextStep}
                setDefaultValue={mainFormVals}
                setMainValue={setStepOneValue}
              />
            )}
            {step === 2 && (
              <StepTwo
                // @ts-ignore
                nextStep={nextStep}
                prevStep={prevStep}
                setstep={setstep}
                setDefaultValue={mainFormVals}
                setMainValue={setStepTwoValue}
              />
            )}
            {step === 3 && (
              <StepThree
                // @ts-ignore
                setstep={setstep}
                nextStep={nextStep}
                prevStep={prevStep}
                setDefaultValue={mainFormVals}
                setMainValue={setStepThreeValue}
                setmainFormVals={setmainFormVals}
              />
            )}
            {step === 4 && (
              <StepFour
                // @ts-ignore
                setDefaultValue={mainFormVals}
                setmainFormVals={setmainFormVals}
                nextStep={nextStep}
                prevStep={prevStep}
                setstep={setstep}
              />
            )}
            {step === 5 && (
              <AnalyticsSettings
                mainFormVals={mainFormVals}
                setstep={setstep}
                currentStream={currentStream}
              />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid
        style={{
          display: mainFormVals.tool_id == 2 && step == 3 ? "none" : "",
        }}
        item
        xs={12}
        md={4}
      >
        <SideInfoCard content={info} />
      </Grid>
    </Grid>
  );
};

export default StepsMain;
