import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import AdminRightSideHeader from "../AdminLinksComponent/AdminRightSideHeader";
import AdminLinksCollection from "../AdminLinksComponent/AdminLinksCollection";
import DashboardMain from "../AdminLinksComponent/Dashboard/DashboardMain";
import DashboardOffers from "../AdminLinksComponent/Offers/DashboardOffers";
import DashboardCreatives from "../AdminLinksComponent/Creatives/DashboardCreatives";
// import Domains from "../AdminLinksComponent/MyDomains/DashboardMyDomains";
import Domains from "../AdminLinksComponent/MyDomains/Domains";
import DashboardFinance from "../AdminLinksComponent/Finance/DashboardFinance";
import DashboardStatistics from "../AdminLinksComponent/Statistics/DashboardStatistics";
import DashboardInstruments from "../AdminLinksComponent/Instruments/DashboardInstruments";
import DashboardNewApplication from "../AdminLinksComponent/NewApplication/DashboardNewApplication";
import DashboardMyStreams from "../AdminLinksComponent/MyStreams/DashboardMyStreams";
import DashboardOffersDetails from "../AdminLinksComponent/Offers/OffersDetails/DashboardOffersDetails";
import DashboardApplicationMaster from "../AdminLinksComponent/ApplicationMaster/DashboardApplicationMaster";
import MyStreamArchives from "../AdminLinksComponent/MyStreamArchives";
import PersonalCabinet from "../AdminLinksComponent/PersonalCabinet";
import NewApplicationTable from "../AdminLinksComponent/NewApplication/NewApplicationTable";
import ApplicationMasterTable from "../AdminLinksComponent/ApplicationMaster/ApplicationMasterTable";
import Steps from "../AdminLinksComponent/Steps/Steps";
import { Carousel } from "../AdminLinksComponent/Dashboard/Carousel";
import Leads from "../AdminLinksComponent/Leads/Leads";
import Details from "../AdminLinksComponent/Leads/DetailsPage/Details";
import Requests from "../AdminLinksComponent/Requests/Requests";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";

const Dashboard: React.FC = () => {
  const auth = useSelector((state: any) => state.authReducer.authenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="app-dashboard">
      <Row className="m-0">
        <Col sm={12} md={12} lg={3} xl={2} className="appDashboardLeft px-0">
          <AdminLinksCollection />
        </Col>
        <Col sm={12} md={12} lg={9} xl={10} className="appDashboardRight px-0">
          <div className="appDashboardRightSub">
            <div className="">
              <AdminRightSideHeader history={history} />
            </div>
            <div className="appDashboardRightLinks">
              <Switch>
                <Route
                  exact
                  path="/dashboard"
                  render={(props) => <DashboardMain />}
                />
                <Route
                  path="/dashboard/carousel/:id"
                  exact
                  component={Carousel}
                />
                <Route
                  path="/dashboard/offers"
                  render={(props) => <DashboardOffers dispatch={dispatch} />}
                />
                <Route
                  path="/dashboard/mystreams"
                  render={(props) => <DashboardMyStreams />}
                />
                <Route
                  path="/dashboard/creatives"
                  render={(props) => <DashboardCreatives />}
                />
                <Route
                  path="/dashboard/mydomains"
                  render={(props) => <Domains />}
                />
                <Route
                  path="/dashboard/finance"
                  render={(props) => <DashboardFinance />}
                />
                <Route
                  path="/dashboard/statistics"
                  render={(props) => <DashboardStatistics />}
                />
                <Route
                  path="/dashboard/instruments"
                  render={(props) => <DashboardInstruments />}
                />
                <Route
                  path="/dashboard/standartapplication/"
                  exact
                  render={(props) => (
                    <DashboardNewApplication {...props} isAuthorized={auth} />
                  )}
                />
                <Route
                  path="/dashboard/standartapplication/:id"
                  exact
                  render={(props) => (
                    <DashboardNewApplication {...props} isAuthorized={auth} />
                  )}
                />
                <Route
                  path="/dashboard/standartapplicationtable"
                  render={(props) => <NewApplicationTable {...props} />}
                />
                <Route
                  path="/dashboard/applicationmaster"
                  exact
                  render={(props) => (
                    <DashboardApplicationMaster
                      {...props}
                      isAuthorized={auth}
                    />
                  )}
                />
                <Route
                  path="/dashboard/applicationmaster/:id"
                  exact
                  render={(props) => (
                    <DashboardApplicationMaster
                      {...props}
                      isAuthorized={auth}
                    />
                  )}
                />
                <Route
                  path="/dashboard/applicationmastertable"
                  render={(props) => <ApplicationMasterTable {...props} />}
                />
                <Route
                  path="/dashboard/offersDetail/:id"
                  render={(props) => <DashboardOffersDetails />}
                />
                <Route
                  path="/dashboard/archive"
                  render={(props) => <MyStreamArchives />}
                />
                <Route
                  path="/dashboard/cabinet"
                  render={(props) => <PersonalCabinet />}
                />
                {/* <Route path='/dashboard/steps' render={(props) => <Steps />} /> */}
                <Route
                  exact
                  path="/dashboard/steps/:id?"
                  render={(props) => <Steps props={props} />}
                />
                <Route
                  path="/dashboard/leads/:id?"
                  render={(props) => <Leads />}
                />
                <Route
                  path="/dashboard/lead/:route/:id"
                  render={(props) => <Details />}
                />
                <Route
                  path="/dashboard/request/:route/:id"
                  render={(props) => <Details />}
                />
                <Route
                  path="/dashboard/requests/:id?"
                  render={(props) => <Requests />}
                />
              </Switch>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation()(Dashboard);
