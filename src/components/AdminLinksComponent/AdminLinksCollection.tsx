import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Col, Collapse, Row, TabPane } from "reactstrap";
import Axios from "axios";
import configApi from "../../utils/configApi";

interface initialState {
    activeCollapse: any,
    total_byudjet: string,
    hold: string,
}

class AdminLinksCollection extends Component {
    state: initialState;
    private _isUnmounted: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            activeCollapse: undefined,
            total_byudjet: "0",
            hold: "",
        };
    }

    componentWillUnmount() {
        this._isUnmounted = true;
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(`${configApi.api}/universal/home-statistics`).then(res => {
                if (!this._isUnmounted) {
                    let data = res.data;
                    this.setState({
                        total_byudjet: data.total_byudjet ? data.total_byudjet : "0",
                        hold: res.data.hold,
                        isLoading: false
                    });
                }
            });
        });
    }


    render() {
        // const {} = this.state.store

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

        const changeActiveCollapse = (index: any) => {
            this.setState({ activeCollapse: this.state.activeCollapse === index ? -1 : index })
        };
        const adminDropDownLink = [
            {
                title: "Новая заявка",
            },
        ];


        return (
            <div className="appDashboardLeftSub">
                <div className="dashboardLeftBrand">
                    <Link to="/dashboard">
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
                                <p className="dashboardLeftBrandSubTitle mb-0">Бюджет</p>
                                <p className="dashboardLeftBrandSubText mb-0">
                                    {this.state.total_byudjet} ₽
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="dashboardLeftBrandSubFlex1 mt-2">
                            <div className="">
                                <i className="icon icon-hand"></i>
                            </div>
                            <div className="ml-2">
                                <p className="dashboardLeftBrandSubTitle mb-0">Холд</p>
                                <p className="dashboardLeftBrandSubText mb-0">
                                    {this.state.hold} ₽
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboardLeftLinksCollection">
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-1dashboardLinkIcon" />
                            </div>
                            <div className="pt-1">Главная</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/offers">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-2dashboardLinkIcon" />
                            </div>
                            <div className="">Офферы</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/mystreams">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-3dashboardLinkIcon" />
                            </div>
                            <div className="">Мои потоки</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/creatives">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-4dashboardLinkIcon" />
                            </div>
                            <div className="">Креативы</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/mydomains">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-5dashboardLinkIcon" />
                            </div>
                            <div className="">Мои домены</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/finance">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-6dashboardLinkIcon" />
                            </div>
                            <div className="">Финансы</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/statistics">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-7dashboardLinkIcon" />
                            </div>
                            <div className="">Статистика</div>
                        </div>
                    </AdminLinks>
                    <AdminLinks activeOnlyWhenExact={true} to="/dashboard/instruments">
                        <div className="adminLinksFlex">
                            <div className="">
                                <i className="mr-2 icon icon-8dashboardLinkIcon" />
                            </div>
                            <div className="">Инструменты</div>
                        </div>
                    </AdminLinks>
                    <div className="">
                        {adminDropDownLink.map((items, index) => (
                            <TabPane tabId={index} key={index}>
                                <div
                                    className={`faqCollapse col-lg-12 col-12 px-0 ${this.state.activeCollapse === index ? 'active-line' : ''}`}>
                                    <div className="collapse-header" onClick={() => changeActiveCollapse(index)}>
                                        <div
                                            className={`faqCollapseFlex d-flex ${this.state.activeCollapse === index ? 'active-flex' : 'non-active-flex'}`}>

                                            <div className="adminLinksFlex">
                                                <div className="titleFaqMain">
                                                    <p className="titleFaq mb-0">
                                                        <i className="mr-2 icon icon-9dashboardLinkIcon" />
                                                        {items.title}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <Collapse className="adminLinksFlexMain" isOpen={this.state.activeCollapse === index}>
                                        <Row className="m-0">
                                            <Col md={12} className="p-0">
                                                <AdminLinks activeOnlyWhenExact={true} to="/dashboard/standartapplicationtable">
                                                    <div className="adminLinksFlex">
                                                        <div className="">
                                                            <i className="mr-2 icon icon-9dashboardLinkIcon" />
                                                        </div>
                                                        <div className="">Стандартная заявка</div>
                                                    </div>
                                                </AdminLinks>
                                            </Col>
                                            <Col md={12} className="p-0">
                                                <AdminLinks activeOnlyWhenExact={true} to="/dashboard/applicationmastertable">
                                                    <div className="adminLinksFlex">
                                                        <div className="">
                                                            <i className="mr-2 icon icon-9dashboardLinkIcon" />
                                                        </div>
                                                        <div className="">Заявка от лица частного мастера</div>
                                                    </div>
                                                </AdminLinks>
                                            </Col>
                                        </Row>
                                    </Collapse>
                                </div>
                            </TabPane>
                        ))}
                    </div>

                    {/* <div className="dashboardLeftFooterFlexMain pl-3">
                        <p className="title">Дополнительно</p>
                        <div className="">
                            <Link to="/help" className="dashboardLeftFooterLinks">
                                <div className="dashboardLeftFooterFlex">
                                    <div className="">
                                        <i className="icon icon-help"></i>
                                    </div>
                                    <div className="ml-2">
                                        <p className="dashboardLeftBrandSubTitle mb-0">Помощь</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="">
                            <Link to="/api" className="dashboardLeftFooterLinks">
                                <div className="dashboardLeftFooterFlex">
                                    <div className="">
                                        <i className="icon icon-api"></i>
                                    </div>
                                    <div className="ml-2">
                                        <p className="dashboardLeftBrandSubTitle mb-0">API</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default AdminLinksCollection;
