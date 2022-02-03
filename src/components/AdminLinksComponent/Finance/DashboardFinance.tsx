import React, {Component} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import './index.scss'
import Axios from 'axios';
import configApi from '../../../utils/configApi';



class DashboardFinance extends Component<any,any> {
    
    private _isUnmounted: boolean = false;

    public state: any = {
        isLoading: false,
        requests: [],
        requestModals : [],
        fromInput:"",
        toInput:"",
        colors : ['#FF5370', '#4099FF', '#2ED8B6', '#FFB64D',
            '#6F42C1', '#17A2B8']
    }

    constructor(e: any = null) {
        super(e);
        this.handleFilter = this.handleFilter.bind(this);
        this.fromInput = this.fromInput.bind(this);
        this.toInput = this.toInput.bind(this);
    }


    componentWillUnmount() {
        this._isUnmounted = true;
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(`${configApi.api}/universal/finance-table`).then(res => {
                if (!this._isUnmounted) {
                    this.setState({
                        requests: res.data,
                        requestModals: res.data,
                        isLoading: false
                    });
                }
            });
        });
    }

    fromInput(evt:any) {
        this.setState({
            fromInput: evt.target.value
        });
    }

    toInput(evt:any) {
        this.setState({
            toInput: evt.target.value
        });
    }

    handleFilter(){
        this.setState({
            isLoading: true
        }, () => {

            let url = `${configApi.api}/universal/finance-table`;
            if(this.state.fromInput && this.state.toInput){
                url += `?from=${this.state.fromInput}&to=${this.state.toInput}`;
            } else if(this.state.fromInput) {
                url += `?from=${this.state.fromInput}`;
            } else if(this.state.toInput) {
                url += `?to=${this.state.toInput}`;
            }

            Axios.post(url).then(res => {
                if (!this._isUnmounted) {
                    this.setState({
                        requests: res.data,
                        isLoading: false
                    });
                }
            });
        });
    }


    render() {
        const { colors } = this.state;

        const randomColor = () => {
            return colors[(Math.random() * colors.length) >> 0];
        };

        return (
            <div className="dashboardFinanceSection mb-5">
                <div className="d-flex w-100 flex-wrap">
                    <ul className="breadcrumbs d-flex w-100">
                        <li><Link to="/dashboard">Главная</Link></li>
                        <li><Link to="/dashboard/finance">Финансы</Link></li>
                    </ul>
                </div>


                <Row className="m-0">
                    <Col md={12} lg={12} xl={8} className="dashboardMainFormSectionCol1">
                        <div className="coloured-blocks d-flex justify-content-between flex-wrap">

                            {this.state.requests && this.state.requests.length > 0 && this.state.requests.map((items:any, i:number) =>
                                {
                                return (
                                    <div key={i} className="dash-block" style={{ backgroundColor: randomColor()}}>
                                        <p className="d-flex align-items-center">
                                            <img className="float-left" src="/assets/svg/comp.svg" alt=""/>
                                            <span className="title">{items.direction}</span>
                                        </p>
                                        <p className="d-flex align-items-center mt-2 mb-n2">
                                            <img src="/assets/img/koshelok3.svg" alt=""/>
                                            Баланс: &nbsp; <span className="number"> {items.balans} ₽ </span>
                                        </p>
                                        <p className="d-flex align-items-center mt-2 mb-n2">
                                            <img src="/assets/img/hand-2.svg" alt=""/>
                                            Холд: &nbsp; <span className="number"> {items.hold} ₽</span>
                                        </p>
                                    </div>
                                    )
                                }
                            )}
                        </div>

                        <div className="">
                            <p className="finance-date-flex my-3 d-flex  align-items-center ">
									<span>
										<input className="finance-date" type="date" value={this.state.fromInput} onChange={this.fromInput}
                                               placeholder="23.08.2020"/>
                                        <input className="finance-date" type="date" value={this.state.toInput} onChange={this.toInput}
                                               placeholder="30.28.2020"/>
									</span> &nbsp;
                                <button className="site-button" onClick={this.handleFilter}>Применить</button>
                            </p>
                        </div>
                        <div className="streamsTableDomains">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Направление</th>
                                        <th>Баланс</th>
                                        <th>Холд</th>
                                        <th>Офферы</th>
                                        <th>Лиды</th>
                                        <th>Дата</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-responsive-Body">
                                    {this.state.requests && this.state.requests.length > 0 && this.state.requests.map((items:any, i:number) =>
                                      {
                                        return (
                                            <tr key={i}>
                                            <td>{items.direction}</td>
                                            <td>{items.balans}</td>
                                            <td>{items.hold}</td>
                                            <td>{items.offer_count}</td>
                                            <td>{items.leads}</td>
                                            <td>{items.created_at}</td>
                                        </tr>
                                       )
                                      }
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={12} xl={4} className="dashboardMainFormSectionCol2 mt-4">
                        <Card className="formSectionCardInfo">
                            <CardBody>
                                <div className="infoTitleMain">
                                    <p className="infoTitle">
                                        <img className="mr-2" src="/assets/svg/inform.svg" alt=""/>
                                        Информация
                                    </p>
                                </div>
                                <div className="infoDescMain">
                                    <p className="infoDesc mb-0">
                                        В этом разделе вы можете посмотреть баланс и холд отдельно по каждому
                                        направлению и посмотреть статистику по финансам за разные временные промежутки.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardFinance;