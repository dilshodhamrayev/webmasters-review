import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GenerateInputFields from "../../../form/GenerateInputFields";
// MODULES
import { domainUrls } from "../../../../constants/apiRoutes";
// MUI
import CallIcon from "@material-ui/icons/Call";
import LanguageIcon from "@material-ui/icons/Language";
import { Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// REDUX
import { useAppDispatch } from "../../../../redux/hooks";
import { useSelector } from "react-redux";
import { fetchRegions } from "../../../../redux/global/thunks";
import { getRequest } from "../../../../redux/rootThunk";
import Select from "react-select";

interface IFormInput {
  setstep: any;
}

const fields = [
  {
    name: "autodetect",
    type: "radio",
    defaultVal: "0",
    labels: [
      {
        value: "0",
        label: "Bыбор города",
      },
      {
        value: "1",
        label: "Автоопределенние города",
      },
    ],
    required: true,
  },
  {
    name: "phone",
    label: "Фиксированный телефон номер",
    type: "textb",
    required: true,
    icon: <CallIcon />,
  },
  {
    name: "domain",
    label: "Домен",
    type: "selectb",
    options: [],
    required: true,
    icon: <LanguageIcon />,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderRadius: {
      borderRadius: "60px",
      padding: "0.5rem 2.5rem",
    },
  })
);

const LandingSettings: React.FC<any> = ({
  setstep,
  setmainFormVals,
  mainFormVals,
}) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const fetchedRegions = useSelector(
    (state: any) => state.globalReducer.regions
  );

  const dispatch = useAppDispatch();
  const [regions, setregions] = useState([]);
  const [region_id, setregion_id] = useState([]);
  const demos = useSelector((state: any) => state.landingReducer.demos);
  const domains = useSelector((state: any) => state.globalReducer.domains);

  const onSubmit = (data: IFormInput) => {
    setmainFormVals({ ...mainFormVals, ...data, region_id });
    setstep(5);
  };

  useEffect(() => {
    let options = [];
    options = demos.map((demo) => {
      return {
        value: demo.demo_link,
        label: demo.demo_link,
      };
    });
    options.concat(
      domains.map((demo) => {
        return {
          value: demo.id,
          label: demo.name,
        };
      })
    );
    fields[2].options = options;
  }, [demos, domains]);

  useEffect(() => {
    reset(mainFormVals);
  }, [mainFormVals]);

  // FETCH REGIONS/DOMAINS
  useEffect(() => {
    dispatch(fetchRegions({}));
    dispatch(getRequest({ value: "domains", url: domainUrls.getDomains }));
  }, []);

  useEffect(() => {
    setregions(
      fetchedRegions.map((r) => {
        return { value: r.id, label: r.name };
      })
    );
  }, [fetchedRegions]);

  const handleRegions = (data) => {
    setregion_id(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        defaultValue={mainFormVals?.region_id}
        isMulti
        name="region_id"
        options={regions}
        onChange={handleRegions}
      />
      <GenerateInputFields fields={fields} control={control} errors={errors} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="submit"
          className={classes.borderRadius}
          variant="contained"
          color="primary"
          onClick={() => setstep(3)}
        >
          Назад
        </Button>

        <Button
          type="submit"
          className={classes.borderRadius}
          variant="contained"
          color="primary"
        >
          Дальее
        </Button>
      </div>
    </form>
  );
};

export default LandingSettings;
