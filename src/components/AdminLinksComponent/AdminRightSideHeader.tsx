import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { logout } from "../../redux/auth/authSlice";
import { persistor } from "../../redux/store";
import Axios from "axios";
import configApi from "../../utils/configApi";
import NotificationList from "./NotificationList";

interface initialState {
  displayMenu2: boolean;
  isLogouted: boolean;
  total_byudjet: string;
  hold: string;
  notifications: boolean;
}

class AdminRightSideHeader extends Component<any, any> {
  state: initialState;

  private _isUnmounted: boolean = false;

  constructor(props: any) {
    super(props);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.state = {
      displayMenu2: false,
      isLogouted: false,
      total_byudjet: "0",
      hold: "",
      notifications: false,
    };
  }

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Axios.post(`${configApi.api}/universal/home-statistics`).then((res) => {
          let data = res.data;
          if (!this._isUnmounted) {
            let data = res.data;
            this.setState({
              total_byudjet: data.total_byudjet ? data.total_byudjet : "0",
              hold: res.data.hold,
              isLoading: false,
            });
          }
        });
      }
    );
  }

  logoutHandler() {
    this.props.history.push("/auth/login");
    this.props.logout();
    persistor.purge();
    this.setState({
      isLogouted: true,
    });
  }

  showLanguageDropDown2 = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.setState({ displayMenu2: true }, () => {
      document.addEventListener("click", this.hideLanguageDropDown2);
    });
  };
  hideLanguageDropDown2 = () => {
    this.setState({ displayMenu2: false }, () => {
      document.removeEventListener("click", this.hideLanguageDropDown2);
    });
  };

  toggleNotifications() {
    this.setState({
      ...this.state,
      notifications: !this.state.notifications,
    });
  }

  openNav = () => {
    // @ts-ignore
    document.getElementById("myNav").style.width = "300px";
  };

  closeNav = () => {
    // @ts-ignore
    document.getElementById("myNav").style.width = "0";
  };

  render() {
    const AdminLinks = ({ to, activeOnlyWhenExact, children }: any) => {
      return (
        <Route
          path={to}
          exact={activeOnlyWhenExact}
          children={({ match }) => (
            <div className="">
              <Link to={to} className={match ? "active" : "adminLink"}>
                {children}
              </Link>
            </div>
          )}
        />
      );
    };

    return (
      <div className="container-fluid adminRightSideHeader bg-danger position-relative">
        <div className="adminRightSideHeaderFlex">
          <div className="adminRightSideHeaderFlexSubOne">
            {this.state.isLogouted && <Redirect to="/" />}

            <span
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={this.openNav}
            >
              &#9776;
            </span>
            <div id="myNav" className="overlay">
              <a
                href="#"
                className="closebtn text-decoration-none"
                onClick={this.closeNav}
              >
                &times;
              </a>
              <div className="overlay-content">
                <div className="dashboardMenuContents">
                  <div className="dashboardLeftBrand">
                    <Link to="/dashboard" onClick={this.closeNav}>
                      <div className="dashboardLeftBrandFlex">
                        <div className="">
                          <img src="/assets/img/logo.png" alt="" />
                          <span className="ml-2">BORZ HUNTER</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="dashboardLeftBrandSubFlex">
                    <div className="">
                      <div className="dashboardLeftBrandSubFlex1">
                        <div className="">
                          <i className="icon icon-66dashboardLinkIcon"></i>
                        </div>
                        <div className="ml-2">
                          <p className="dashboardLeftBrandSubTitle mb-0">
                            Бюджет
                          </p>
                          <p className="">{this.state.total_byudjet}0 ₽</p>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="dashboardLeftBrandSubFlex1 mt-2">
                        <div className="">
                          <i className="icon icon-hand"></i>
                        </div>
                        <div className="ml-2">
                          <p className="dashboardLeftBrandSubTitle mb-0">
                            Холд
                          </p>
                          <p className="dashboardLeftBrandSubText mb-0">
                            {this.state.hold} ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboardLeftLinksCollection">
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard">
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-1dashboardLinkIcon" />
                        </div>
                        <div className="pt-1">Главная</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/offers"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-2dashboardLinkIcon" />
                        </div>
                        <div className="">Офферы</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/mystreams"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-3dashboardLinkIcon" />
                        </div>
                        <div className="">Мои потоки</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/creatives"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-4dashboardLinkIcon" />
                        </div>
                        <div className="">Креативы</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/mydomains"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-5dashboardLinkIcon" />
                        </div>
                        <div className=""></div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/finance"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-6dashboardLinkIcon" />
                        </div>
                        <div className="">Финансы</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/statistics"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-7dashboardLinkIcon" />
                        </div>
                        <div className="">Статистика</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/instruments"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-8dashboardLinkIcon" />
                        </div>
                        <div className="">Инструменты</div>
                      </div>
                    </AdminLinks>
                    <AdminLinks
                      activeOnlyWhenExact={true}
                      to="/dashboard/standartapplicationtable"
                    >
                      <div className="adminLinksFlex" onClick={this.closeNav}>
                        <div className="">
                          <i className="mr-2 icon icon-9dashboardLinkIcon" />
                        </div>
                        <div className="">Новая заявка</div>
                      </div>
                    </AdminLinks>

                    {/* <div className="dashboardLeftFooterFlexMain">
                                            <p className="title">Дополнительно</p>
                                            <div className="">
                                                <Link to="/help" className="dashboardLeftFooterLinks">
                                                    <div
                                                        className="dashboardLeftFooterFlex"
                                                        onClick={this.closeNav}
                                                    >
                                                        <div className="">
                                                            <i className="icon icon-help"></i>
                                                        </div>
                                                        <div className="ml-2">
                                                            <p className="dashboardLeftBrandSubTitle mb-0">
                                                                Помощь
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="">
                                                <Link to="/api" className="dashboardLeftFooterLinks">
                                                    <div
                                                        className="dashboardLeftFooterFlex"
                                                        onClick={this.closeNav}
                                                    >
                                                        <div className="">
                                                            <i className="icon icon-api"></i>
                                                        </div>
                                                        <div className="ml-2">
                                                            <p className="dashboardLeftBrandSubTitle mb-0">
                                                                API
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-3">
            <div className="d-flex">
              <div className="notifications">
                <div className="d-flex align-items-center h-100">
                  <div className="mr-1">
                    <div
                      onClick={this.toggleNotifications}
                      className="text-decoration-none text-dark"
                    >
                      <div className="notificationsFlex">
                        {this.state.notifications && <NotificationList />}
                        <div className="">
                          <i
                            className={"bell icon icon-bell"}
                            // className={unReadNotifications.length === 0 ? "bellOut" : "bell"}
                          />
                        </div>
                        <div className="">
                          <span className="">
                            <span className="pulse">
                              <span className="d-flex align-items-center justify-content-center h-100 w-100">
                                <span className="">5</span>
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="d-flex align-items-center position-relative h-100"
                  style={{ cursor: "pointer" }}
                  onClick={this.showLanguageDropDown2}
                >
                  <div className="userImg h-100">
                    <div className="">
                      <div className="d-flex justify-content-center align-items-center h-100">
                        {this.state.displayMenu2 ? (
                          <div className="">
                            <div className="displayMenuFilter2 d-flex justify-content-start w-100 position-absolute">
                              <div className="filter2">
                                <div className="d-flex flex-column">
                                  <Link
                                    to="/dashboard/cabinet"
                                    className="text-dark text-decoration-none"
                                  >
                                    <div className="">
                                      <p className="mb-0 text-left pl-3">
                                        Мой профиль
                                      </p>
                                    </div>
                                  </Link>
                                  <Link
                                    to=""
                                    className="text-dark text-decoration-none"
                                    onClick={(e: React.MouseEvent) => {
                                      e.preventDefault();
                                      this.logoutHandler();
                                    }}
                                  >
                                    <div className="">
                                      <p className="mb-0 text-left pl-3">
                                        Выйти
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="adminAdditionalHeaderUser d-flex">
                      <div className="">
                        <img
                          className="userImg"
                          src="https://www.wallpapertip.com/wmimgs/178-1781584_stylish-man-in-bow-tie-photo-fashion-men.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-2">
                        <p className="fullName mb-0">
                          {this.props.auth.user?.username}
                        </p>
                        <p className="roleText mb-0">Менеджер</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    auth: state.authReducer,
    setting: state.setting,
  };
}

export default connect(mapStateToProps, { logout })(
  withTranslation()(AdminRightSideHeader)
);
