import React, {Component} from 'react';
import '../MyStreams/streams.scss'
import {Link, NavLink} from "react-router-dom";
import {Col, Modal, ModalBody, Row} from "reactstrap";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Axios from "axios";
import configApi from "../../../utils/configApi";
// import Pagination from "../../Pagination";

const status:any = { 1: "Ожидание",  2: "Принято", 3 : "Отказ",  4: "Отмен"};
const statusColors:any = { 1: "waiting", 2: "accepted", 3: "renouncement", 4: "cancellation" };

class NewApplicationTable extends Component<any, any> {

    private _isUnmounted: boolean = false;

    public state: any = {
        isLoading: false,
        request: [],
        redirect: false,
        visibleDeleteModal: false,
        currentPage: 1,
        totalPages: 1,
        pages: null,
    };

    constructor(props: any) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentWillUnmount() {
        this._isUnmounted = true;
    }

    componentWillMount() {
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

    onPageChange(page: number) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        this.setState({
            currentPage: page,
            isLoading: true,
        }, async () => {

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
                        <li><Link to="/dashboard/standartapplicationtable"> Стандартная заявка таблица</Link></li>
                    </ul>
                </div>

                <Row className="m-0">
                    <Col md={12}>
                        <div className="streamsTable">
                            <div className="streamsTableInfo my-3 d-flex justify-content-between align-items-center ">
                                <div className="streamsTableSub">
                                    <div className="title">
                                        Последние заказы
                                    </div>
                                    <div className="number ml-2">
                                        <div className="numberSub">{this.state.request.length}</div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="d-inline-block">
                                        <form>
                                            <div className="creativeMainHeaderFlex2">
                                                <div className="item">
                                                    <p className="title mb-0">Сортировка:</p>
                                                </div>
                                                <div className="item2">
                                                    <select name="offer_id">
                                                        <option value="">Новые</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <Link to="/dashboard/standartapplication" className="text-decoration-none">
                                        <button className="site-button">
                                            Создать заявка
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>№ Заказа</th>
                                        <th>Клиент</th>
                                        <th>Дата</th>
                                        <th>Статус</th>
                                        <th>Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-responsive-Body">
                                    {this.state.request.length > 0 ? this.state.request.map((items: any, i: number) =>
                                            <tr key={i}>
                                                <td>{items.id}</td>
                                                <td>{items.first} {items.last}</td>
                                                <td>{items.created_at}</td>
                                                <td>
                                                    <span> 
                                                        <div className={`${statusColors[items.status]}Table`}/>
                                                         { " " + status[items.status]}
                                                    </span> 

                                                    

                                                    {/* {items.status === 1 ? 
                                                    <span> 
                                                        <div className="acceptedTable"/>
                                                         Принято
                                                    </span> : <span> <div className="waitingTable"/> Ожидание</span>} */}
                                                    
                                                </td>
                                                <td className="">
                                                    <div className="d-flex">
                                                        <div className="mr-3">
                                                            <NavLink to={"/dashboard/standartapplication/" + items.id}>
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

                            {/* <Pagination currentPage={this.state.currentPage} totalPages={this.state.totalPages} onChange={this.onPageChange} /> */}
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
export default connect(mapStateToProps)(withTranslation()(NewApplicationTable));
