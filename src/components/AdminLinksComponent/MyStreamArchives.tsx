import React, { Component } from "react";
import "./MyStreams/streams.scss";
import { Link } from "react-router-dom";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import { connect } from "react-redux";
import Axios from "axios";
import configApi from "../../utils/configApi";
import { withTranslation } from "react-i18next";

class MyStreamArchives extends Component {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    archives: [],
    regions: [],
    directions: [],
    activatedId: undefined,

    visible: false,
  };

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  componentWillMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Axios.post(`${configApi.api}/stream/get-streams-archive`).then(
          (res) => {
            if (!this._isUnmounted) {
              this.setState({
                archives: res.data,
                isLoading: false,
              });
            }
          }
        );
      }
    );
  }

  componentDidMount() {
    Axios.post(`${configApi.api}/universal/region-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          regions: [...res.data],
        });
      }
    });

    Axios.post(`${configApi.api}/universal/direction-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          directions: [...res.data],
        });
      }
    });
  }

  render() {
    const { activatedId } = this.state;

    const openArchivesModal = (item: any) => {
      this.setState({
        visible: true,
        activatedId: item,
      });
    };
    const closeArchivesModal = () => {
      this.setState({
        visible: false,
      });
    };

    const archivesActivatedFunc = (id: any) => {
      Axios.get(`${configApi.api}/stream/active?id=${id}`).then((response) => {
        closeArchivesModal();
        if (response.data.status == "ok") {
          this.setState(
            {
              isLoading: true,
            },
            () => {
              Axios.post(`${configApi.api}/stream/get-streams-archive`).then(
                (res) => {
                  if (!this._isUnmounted) {
                    this.setState({
                      archives: res.data,
                      isLoading: false,
                    });
                  }
                }
              );
            }
          );
        }
      });
    };

    return (
      <div className='dashboardMyStreamsSection'>
        <div className='d-flex w-100 flex-wrap'>
          <ul style={{ flexWrap: "wrap" }} className='breadcrumbs d-flex w-100'>
            <li>
              <Link to='/dashboard'>Главная</Link>
            </li>
            <li>
              <Link to='/dashboard/mystreams'>Мои потоки</Link>
            </li>
            <li>
              <Link to='/dashboard/archive'>Архивы</Link>
            </li>
          </ul>
        </div>

        <Row className='m-0'>
          <Col md={12}>
            <div className='streamsTable'>
              <div className='streamsTableInfo my-3 d-flex justify-content-between align-items-center '>
                <div className='streamsTableSub'>
                  <div className='title'>Архивы</div>
                  <div className='number ml-2'>
                    <div className='numberSub'>
                      {this.state.archives.length}
                    </div>
                  </div>
                  <div className='stream_archive'>
                    <Link
                      to='/dashboard/mystreams'
                      className='text-decoration-none'
                    >
                      Мои потоки
                    </Link>
                  </div>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th />
                      <th>
                        Название потока{" "}
                        <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        ID <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        Регион <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        Ссылка <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        Дата <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        Статистика <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        Заработано
                        <img src='/assets/img/sort.svg' alt='' />
                      </th>
                      <th>
                        Действия
                        <img src='/assets/img/sort.svg' alt='' />
                      </th>
                    </tr>
                  </thead>
                  <tbody className='table-responsive-Body'>
                    {this.state.archives.length > 0 ? (
                      this.state.archives.map((items: any, i: number) => (
                        <tr key={i}>
                          <td>
                            <img src='/assets/img/desktop-image.svg' alt='' />
                          </td>
                          <td>{items.name}</td>
                          <td>{items.id}</td>
                          <td>
                            {items.region.map((regionItems: any, i: number) => (
                              <div key={i}>{regionItems.name}</div>
                            ))}
                          </td>
                          <td>{items.links}</td>
                          <td>{items.date}</td>
                          <td className='statistics'>
                            <div className='d-flex'>
                              <div className=''>
                                <p className='mb-0'>{items.transitionsCount}</p>
                                <p className='mb-0'>
                                  <Link to=''>{items.transitions}</Link>
                                </p>
                              </div>
                              <div className='mx-2'>
                                <p className='mb-0'>{items.leadsCount}</p>
                                <p className='mb-0'>
                                  <Link to=''>{items.leads}</Link>
                                </p>
                              </div>
                              <div className=''>
                                <p className='mb-0'>
                                  {items.applicationsCount}
                                </p>
                                <p className='mb-0'>
                                  <Link to=''>{items.applications}</Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='bold'>{items.earned}</td>
                          <td className='actions'>
                            <div className='d-flex'>
                              <div className=''>
                                <img
                                  src='/assets/svg/checked.svg'
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => openArchivesModal(items.id)}
                                  alt=''
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <th colSpan={12} className='text-center'>
                          Нет доступной информации!
                        </th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>

        <Modal isOpen={this.state.visible} toggle={openArchivesModal}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <h5 className='deleteModalTitle text-center p-4'>
                  Вы уверены, что хотите активировать этот элемент ?
                </h5>
              </Col>
            </Row>

            <div className='text-center'>
              <button
                type='submit'
                className='site-button py-2'
                onClick={(e) => archivesActivatedFunc(activatedId)}
              >
                Aктивировать
              </button>
              <button
                className='site-button py-2'
                type='button'
                color=''
                onClick={closeArchivesModal}
              >
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
    auth: state.auth,
  };
}

//  @ts-ignore
export default connect(mapStateToProps)(withTranslation()(MyStreamArchives));
