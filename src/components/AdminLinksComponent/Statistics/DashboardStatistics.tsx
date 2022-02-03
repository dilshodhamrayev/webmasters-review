import Axios from 'axios';
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Card, Col, Row} from "reactstrap";
import configApi from '../../../utils/configApi';
import './index.scss'
import {arrayToFormData} from "../../../utils/helpers";

enum ESelectType {
    filterForm = 1,
    onPage = 2
}
class DashboardStatistics extends Component<any,any> {
    
    private _isUnmounted: boolean = false;

    public state: any = {
        isLoading: false,
        statistics: [],
        regions: [],
        directions: [],
        scenarios: [],
        pay: [],
        holds: [],

        selectRegions: null,
        selectScenarios: null,
        selectHolds: null,
        selectDirections: null,
        selectPays: null,
        selectHoldsTwo: null,

    }

    constructor(e: any = null) {
        super(e);
        this.selectRegionsChange = this.selectRegionsChange.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    componentWillUnmount() {
        this._isUnmounted = true;
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(`${configApi.api}/universal/statistics`).then(res => {
                if (!this._isUnmounted) {
                    this.setState({
                        statistics: res.data.result,
                        isLoading: false
                    });
                }
            });
        });
    }

    componentDidMount() {

        Axios.post(`${configApi.api}/universal/region-list`).then(res => {
            if (!this._isUnmounted) {
                this.setState({
                    regions: [...res.data]
                });
            }
        });

        Axios.post(`${configApi.api}/universal/direction-list`).then(res => {
            if (!this._isUnmounted) {
                this.setState({
                    directions: [...res.data]
                });
            }
        });

        Axios.post(`${configApi.api}/universal/scenario-list`).then(res => {
            if (!this._isUnmounted) {
                this.setState({
                    scenarios: [...res.data]
                });
            }
        });

        Axios.post(`${configApi.api}/universal/pay-list`).then(res => {
            if (!this._isUnmounted) {
                this.setState({
                    pay: [...res.data]
                });
            }
        });

        Axios.post(`${configApi.api}/universal/hold-list`).then(res => {
            if (!this._isUnmounted) {
                this.setState({
                    holds: [...res.data]
                });
            }
        });
    }

    filterOffers() {

        let url = `${configApi.api}/universal/statistics`;
        let data = {};

        if (this.state.selectRegions) {
            data = {
                'regions': this.state.selectRegions
            }
        }
        if (this.state.selectDirections) {
            data = {
                ...data,
                'directions': this.state.selectDirections
            }
        }
        if (this.state.selectScenarios) {
            data = {
                ...data,
                'scenarios': this.state.selectScenarios
            }
        }

        if (this.state.selectPays) {
            data = {
                ...data,
                'pays': this.state.selectPays
            }
        }

        if (this.state.selectHolds) {
            data = {
                ...data,
                'hold': this.state.selectHolds
            }
        }

        let formData = arrayToFormData(data);

        Axios.post(url, formData).then(res => {
            if (!this._isUnmounted) {

                this.setState({
                    isLoading: true
                }, () => {
                    this.setState({
                        statistics: res.data.result,
                        isLoading: false
                    });
                })

            }
        });

    }

    selectRegionsChange(e: any) {
        let _this = this;

        if (isNaN(e) || e == null) {
            this.setState({
                selectRegions: null
            }, () => {
                _this.filterOffers();
            });
        }  else {
            this.setState({
                selectRegions: parseInt(e)
            }, () => {
                _this.filterOffers();
            });
        }
    }

    selectDirectionChange(e: any) {

        let _this = this;

        if (isNaN(e) || e == null) {
            this.setState({
                selectDirections: null
            }, () => {
                _this.filterOffers();
            });
        } else {
            this.setState({
                selectDirections: parseInt(e)
            }, () => {
                _this.filterOffers();
            });
        }
    }

    selectScenariosChange(e: any) {
        let _this = this;
        if (isNaN(e) || e == null) {
            this.setState({
                selectScenarios: null
            }, () => {
                _this.filterOffers();
            });
        } else {
            this.setState({
                selectScenarios: parseInt(e)
            }, () => {
                _this.filterOffers();
            });
        }
    }

    selectPayChange(e: any) {
        let _this = this;
        if (isNaN(e) || e == null) {
            this.setState({
                selectPays: null
            }, () => {
                _this.filterOffers();
            });
        } else {
            this.setState({
                selectPays: parseInt(e)
            }, () => {
                _this.filterOffers();
            });
        }
    }

    selectHoldChange(e: any) {
        let _this = this;

        if (isNaN(e) || e == null) {
            this.setState({
                selectHolds: null
            }, () => {
                _this.filterOffers();
            });
        } else {
            this.setState({
                selectHolds: parseInt(e)
            }, () => {
                _this.filterOffers();
            });
        }
    }

    clearState() {
        this.setState({
            selectRegions: null,
            selectScenarios: null,
            selectHolds: null,
            selectDirections: null,
            selectPays: null
        }, () => {
            this.filterOffers();
        });
    }


    statisticsConstDate() {
        return <Row className="ml-0 mr-0 mt-5 tableStatisticsRow">
            <Col md={12}>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="tableStatisticsTr1"/>
                            <th className="tableStatisticsTr2">Трафик</th>
                            <th className="tableStatisticsTr3">Лиды</th>
                            <th className="tableStatisticsTr4">Заявки</th>
                            <th className="tableStatisticsTr5">Финансы</th>
                        </tr>
                        </thead>
                        <tbody className="table-responsive-Body">
                        <tr>
                            <td className="tableStatisticsTd1">
                                Дата
                            </td>
                            <td className="tableStatisticsTd2">
                                <div className="d-flex">
                                    <div className="tableStatisticsTd2Sub">
                                        <div className="sub">
                                            Клики
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd2Sub">
                                        <div className="sub">
                                            Звонки
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="tableStatisticsTd3">
                                <div className="d-flex">
                                    <div className="tableStatisticsTd3Sub">
                                        <div className="sub">
                                            Всего
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd3Sub">
                                        <div className="sub">
                                            Формы
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd3Sub">
                                        <div className="sub">
                                            Звонки
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="tableStatisticsTd4">
                                <div className="d-flex">
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            Всего
                                        </div>
                                    </div>
                                    {/* <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            %
                                        </div>
                                    </div> */}
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            Формы
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            Звонки
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            <img src="/assets/svg/tableStatisticsSvg1.svg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            <img src="/assets/svg/tableStatisticsSvg2.svg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            <img src="/assets/svg/tableStatisticsSvg3.svg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            <img src="/assets/svg/tableStatisticsSvg4.svg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            <img src="/assets/svg/tableStatisticsSvg5.svg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd4Sub">
                                        <div className="sub">
                                            <img src="/assets/svg/tableStatisticsSvg6.svg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="tableStatisticsTd5">
                                <div className="d-flex">
                                    <div className="tableStatisticsTd5Sub">
                                        <div className="sub2">
                                            Всего
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd5Sub">
                                        <div className="sub2">
                                            Среднее
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd5Sub">
                                        <div className="sub2">
                                            Прогноз
                                        </div>
                                    </div>
                                    <div className="tableStatisticsTd5Sub">
                                        <div className="sub2">
                                            Выплачено
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {this.state.statistics && this.state.statistics.length > 0 && this.state.statistics.map((item:any, i:number)=>{
                            return (
                                <tr key={i}>
                                    <td className="tableStatisticsTd1">
                                        {item.created_at}
                                    </td>
                                    <td className="tableStatisticsTd2">
                                        <div className="d-flex">
                                            <div className="tableStatisticsTd2Sub">
                                                <div className="sub">
                                                    {item.clicks}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd2Sub">
                                                <div className="sub">
                                                    0
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableStatisticsTd3">
                                        <div className="d-flex">
                                            <div className="tableStatisticsTd3Sub">
                                                <div className="sub">
                                                    {item.leads}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd3Sub">
                                                <div className="sub">
                                                    {item.leads} <span className="subText">100%</span>
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd3Sub">
                                                <div className="sub">
                                                    0 <span className="subText">0%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableStatisticsTd4">
                                        <div className="d-flex">
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_count}
                                                </div>
                                            </div>
                                            {/* <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    0%
                                                    // foiz
                                                </div>
                                            </div> */}
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_count}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    0
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_accepted}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                { (item.request_accepted / item.request_count)*100 } %
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_waiting}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_rejected}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_canceled}
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd4Sub">
                                                <div className="sub">
                                                    {item.request_deleted}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableStatisticsTd5">
                                        <div className="d-flex">
                                            <div className="tableStatisticsTd5Sub">
                                                <div className="sub">
                                                    {item.finance_sum} <img src="/assets/svg/rubl.svg" alt=""/>
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd5Sub">
                                                <div className="sub">
                                                {item.finance_avg} <img src="/assets/svg/rubl.svg" alt=""/>
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd5Sub">
                                                <div className="sub">
                                                    0 <img src="/assets/svg/rubl.svg" alt=""/>
                                                </div>
                                            </div>
                                            <div className="tableStatisticsTd5Sub">
                                                <div className="sub">
                                                    0 <img src="/assets/svg/rubl.svg" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>;
    }

    render() {
        return (
            <div className="dashboardStatisticsSection">
                <div className="d-flex w-100 flex-wrap">
                    <ul className="breadcrumbs d-flex w-100">
                        <li><Link to="/dashboard">Главная</Link></li>
                        <li><Link to="/dashboard/statistics">Статистика</Link></li>
                    </ul>
                </div>

                <div className="dashboardMainTitleSection">
                    <div className="search-offers">
                        <div className="d-flex flex-wrap">
                            <div className="col-lg-9 col-xs-12">
                                <div className="d-flex align-items-center flex-wrap h-100">
                                    <select onChange={(e: any) => {
                                            this.selectRegionsChange(e.target.value ? e.target.value : null)
                                        }}>
                                        <option value="">Регион</option>
                                        {this.state.regions.length > 0 && this.state.regions.map((region: any, i: number) => {
                                            return (
                                                <option key={i} value={region.id}>{region.name}</option>
                                            )
                                        })}
                                    </select>
                                    <select name="direction_id" onChange={(e: any) => {
                                                this.selectDirectionChange(e.target.value ? e.target.value : null)
                                            }}>
                                            <option value="">Направление</option>
                                            {this.state.directions.length > 0 && this.state.directions.map((direction: any, i: number) => {
                                                return (
                                                    <option key={i}
                                                            value={direction.id}>{direction.name}</option>
                                                );
                                            })}
                                    </select>
                                    <select name="scenario_id" onChange={(e: any) => {
                                                this.selectScenariosChange(e.target.value ? e.target.value : null)
                                            }}>
                                            <option value="">Сценарии</option>
                                            {this.state.scenarios.length > 0 && this.state.scenarios.map((scenario: any, i: number) => {
                                                return (
                                                    <option key={i} value={scenario.id}>{scenario.name}</option>
                                                )
                                            })}
                                    </select>

                                    <select name="pay_id" id="selectPayChange" onChange={(e: any) => {
                                                this.selectPayChange(e.target.value ? e.target.value : null)
                                            }}>
                                            <option value="">Выплаты</option>
                                            {this.state.pay.length > 0 && this.state.pay.map((pay: any, i: number) => {
                                                return (
                                                    <option key={i} value={pay.id}>{pay.name}</option>
                                                )
                                            })}
                                    </select>
                                    <span>{this.state.holds && this.state.holds.length > 0 && this.state.holds[1].value}</span>
                                    <div className="switchToggle">
                                        <input type="checkbox" id="switch"
                                                defaultValue={this.state.holds && this.state.holds.length > 0 && this.state.holds[1].id}
                                                onChange={(e: any) => {
                                                    this.selectHoldChange(e.target.value ? e.target.value : null)
                                                }}/>
                                        <label htmlFor="switch">Toggle</label> &nbsp;
                                    </div>
                                    <img src="/assets/img/refresh2.svg" style={{cursor: "pointer"}} onClick={this.clearState} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Row className="m-0 dashboardStatisticsMain">
                    <Col md={12}>
                        <Card className="dashboardStatisticsMainCard pt-5">
                            {this.statisticsConstDate()}
                            {/*<p className="statisticsMainTitle mb-0">Нужны данные</p>*/}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardStatistics;