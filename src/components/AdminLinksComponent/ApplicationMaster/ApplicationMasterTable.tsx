import React, {Component} from 'react';
import '../MyStreams/streams.scss'
import {Link, NavLink} from "react-router-dom";
import {Col, Modal, ModalBody, Row} from "reactstrap";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Axios from "axios";
import configApi from "../../../utils/configApi";


class ApplicationMasterTable extends Component<any, any> {

    private _isUnmounted: boolean = false;

    public state: any = {
        isLoading: false,
        request: [],
        visibleDeleteModal: false,
    };

    componentWillUnmount() {
        this._isUnmounted = true;
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(`${configApi.api}/request/get-request-master`).then(res => {
                if (!this._isUnmounted) {
                    this.setState({
                        request: res.data,
                        isLoading: false
                    });
                }
            });
        });
    }



    openDeleteModal = (item: any) => {
        this.setState(
            {
                visibleDeleteModal: true,
                selectedId: item,
            }
        )
    }

    closeDeleteModal = () => {
        this.setState({
            visibleDeleteModal: false
        });
    }

    deleteFunction = (id: any) => {
        Axios.get(`${configApi.api}/request/delete?id=${id}`).then(response => {
            this.closeDeleteModal()
            if (response.data.status == "ok") {
                this.setState({
                    isLoading: true
                }, () => {
                    Axios.post(`${configApi.api}/request/get-request-standard`).then(res => {
                        if (!this._isUnmounted) {
                            this.setState({
                                request: res.data,
                                isLoading: false,
                                redirect: true
                            });
                        }
                    });
                });
            }
        });
    };

    render() {

        return (
            <div className="dashboardMyStreamsSection">
                <div className="d-flex w-100 flex-wrap">
                    <ul className="breadcrumbs d-flex w-100">
                        <li><Link to="/dashboard">Главная</Link></li>
                        <li><Link to="/dashboard/applicationmastertable">Таблица заявка от лица частного мастера</Link></li>
                    </ul>
                </div>

                <Row className="m-0">
                    <Col md={12}>
                        <div className="streamsTable">
                            <div className="streamsTableInfo my-3 d-flex justify-content-between align-items-center ">
                                <div className="streamsTableSub">
                                    <div className="title">
                                        Таблица заявка мастера
                                    </div>
                                    <div className="number ml-2">
                                        <div className="numberSub">{this.state.request.length}</div>
                                    </div>
                                </div>
                                <div className="">
                                    <Link to="/dashboard/applicationmaster" className="text-decoration-none">
                                        <button className="site-button pl-2 pr-2">
                                            Создать заявка мастера
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Направление</th>
                                        <th>Оффер</th>
                                        <th>Имя</th>
                                        <th>Фамилия</th>
                                        <th>Отчество</th>
                                        <th>Телефон</th>
                                        <th>Страна</th>
                                        <th>Город</th>
                                        <th>Статус звонка</th>
                                        <th>Улица</th>
                                        <th>Дом</th>
                                        <th>Кв / Офис</th>
                                        <th>Дата</th>
                                        <th>c</th>
                                        <th>до</th>
                                        <th>Статус</th>
                                        <th>Комментарий / Проблема</th>
                                        <th>Дополнительный телефон</th>
                                        <th>Источник</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-responsive-Body">
                                    {this.state.request.length > 0 ? this.state.request.map((items: any, i: number) =>
                                            <tr key={i}>
                                                <td>{items.direction.name}</td>
                                                <td>{items.offers.name}</td>
                                                <td>{items.first}</td>
                                                <td>{items.last}</td>
                                                <td>{items.middle}</td>
                                                <td>{items.phone}</td>
                                                <td>{items.country.name}</td>
                                                <td>{items.region.name}</td>
                                                <td>{items.call === 1 ? <span>Звонить</span> : <span>Не звонить</span> }</td>
                                                <td>{items.street}</td>
                                                <td>{items.home}</td>
                                                <td>{items.kv_office}</td>
                                                <td>{items.waiting_date}</td>
                                                <td>{items.waiting_time_from}</td>
                                                <td>{items.waiting_time_to}</td>
                                                <td>{items.fast === 1 ? <span>Срочно</span> : <span>Не cрочно</span> }</td>
                                                <td>{items.comment}</td>
                                                <td>{items.phone_dp}</td>
                                                <td>{items.istochnik}</td>
                                                <td className="actions">
                                                    <div className="d-flex">
                                                        <div className="mr-3">
                                                            <NavLink to={"/dashboard/applicationmaster/" + items.id}>
                                                                <img src="/assets/img/cogs.svg" style={{cursor: "pointer"}}
                                                                     alt=""/>
                                                            </NavLink>
                                                        </div>
                                                        <div className="">
                                                            <img src="/assets/img/basket.svg"
                                                                 style={{cursor: "pointer"}}
                                                                 onClick={() => this.openDeleteModal(items.id)}
                                                                 alt=""/>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <th colSpan={12} className="text-center">
                                                Нет доступной информации!
                                            </th>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Modal isOpen={this.state.visibleDeleteModal} toggle={this.openDeleteModal}>
                    <ModalBody>
                        <Row>
                            <Col md={12}>
                                <h5 className="deleteModalTitle text-center p-4">
                                    Вы уверены, что хотите удалить этот элемент ?
                                </h5>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <button type="submit" className="site-button py-2"
                                    onClick={(e) => this.deleteFunction(this.state.selectedId)}
                            >Удалить
                            </button>
                            <button className="site-button py-2" type="button" color="" onClick={this.closeDeleteModal}>
                                Отмена
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        auth: state.auth
    };
}


//  @ts-ignore
export default connect(mapStateToProps)(withTranslation()(ApplicationMasterTable));
