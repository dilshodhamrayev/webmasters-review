import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import Sales from "../../Charts/UsersByDevice";
import UsersByDeviceTwo from "../../Charts/UsersByDeviceTwo";
import DashboardMainCarousel from "./DashboardMainCarousel";
import DashboardCardStatistics from "./DashboardCardStatistics";
import DashboardCards from "./DashboardCards";
import Axios from "axios";
import configApi from "../../../utils/configApi";

class DashboardMain extends Component {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    request: "",
    leads: "",
    total_income: "",
    trafic: "",
  };

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  constructor(e: any = null) {
    super(e);
  }

  componentWillMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        // Axios.post(`${configApi.api}/universal/home-statistics`).then((res) => {
        //   if (!this._isUnmounted) {
        //     this.setState({
        //       request: res.data.request,
        //       leads: res.data.leads,
        //       total_income: res.data.total_income,
        //       trafic: res.data.trafic,
        //       isLoading: false,
        //     });
        //   }
        // });
        Axios.post(`${configApi.api}/universal/home-statistic-compare`).then(
          (res) => {
            if (!this._isUnmounted) {
              this.setState({
                request: res.data.request,
                leads: res.data.leads,
                total_income: res.data.total_income,
                trafic: res.data.total_byudjet,
                isLoading: false,
              });
            }
          }
        );
      }
    );
  }

  render() {
    const { statisticsConstDate }: any = this.props;

    return (
      <div className='dashboardMain'>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <DashboardCardStatistics statics={{ ...this.state }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <DashboardMainCarousel />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Sales />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <UsersByDeviceTwo />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="blueBanner">
                                <div className="">
                                    <p className="blueBanner mb-0">Статистика</p>
                                </div>
                            </div>
                        </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DashboardCards />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default DashboardMain;
