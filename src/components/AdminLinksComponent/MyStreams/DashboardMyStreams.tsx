import * as React from "react";
import "./streams.scss";
import { Link, Redirect } from "react-router-dom";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { connect } from "react-redux";
import Axios from "axios";
import configApi from "../../../utils/configApi";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { arrayToFormData } from "../../../utils/helpers";
import { Formik } from "formik";
import * as Yup from "yup";
import { types } from "util";
import { withTranslation } from "react-i18next";

enum EButtonType {
  edit = 1,
  clone = 2,
  create = 3,
}

class DashboardMyStreams extends React.Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    selectedId: undefined,
    actionType: null,
    streams: [],
    streamsDate: null,
    regions: [],
    directions: [],
    offers: [],

    selectRegions: [],
    selectStreams: [],
    selectDirections: [],
    initialValues: null,

    visible: false,
    visibleDeleteModal: false,
  };

  constructor(e: any = null) {
    super(e);
    this.selectRegionsChange = this.selectRegionsChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.setMyRegions = this.setMyRegions.bind(this);
  }

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  componentWillMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Axios.post(`${configApi.api}/stream/get-streams`).then((res) => {
          if (!this._isUnmounted) {
            this.setState({
              streams: res.data,
              isLoading: false,
            });
          }
        });
      }
    );
  }

  componentDidMount() {
    Axios.post(`${configApi.api}/universal/get-offers`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          offers: res.data,
          isLoading: false,
        });
      }
    });

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

  filterStreams() {
    let url = `${configApi.api}/stream/filter-stream`;
    let data = {};

    if (this.state.selectStreams && this.state.selectStreams.length > 0) {
      data = {
        ...data,
        streams: this.state.selectStreams,
      };
    }
    if (this.state.selectRegions && this.state.selectRegions.length > 0) {
      data = {
        regions: this.state.selectRegions,
      };
    }
    if (this.state.selectDirections && this.state.selectDirections.length > 0) {
      data = {
        ...data,
        directions: this.state.selectDirections,
      };
    }

    let formData = arrayToFormData(data);

    Axios.post(url, formData).then((res) => {
      if (!this._isUnmounted) {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            this.setState({
              streams: res.data,
              isLoading: false,
            });
          }
        );
      }
    });
  }

  selectRegionsChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectRegions: [],
        },
        () => {
          _this.filterStreams();
        }
      );
    } else {
      this.setState(
        {
          selectRegions: [parseInt(e)],
        },
        () => {
          _this.filterStreams();
        }
      );
    }
  }

  selectDirectionChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectDirections: [],
        },
        () => {
          _this.filterStreams();
        }
      );
    } else {
      this.setState(
        {
          selectDirections: [parseInt(e)],
        },
        () => {
          _this.filterStreams();
        }
      );
    }
  }

  selectStreamsChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectStreams: [],
        },
        () => {
          _this.filterStreams();
        }
      );
    } else {
      this.setState(
        {
          selectStreams: [parseInt(e)],
        },
        () => {
          _this.filterStreams();
        }
      );
    }
  }

  clearState() {
    this.setState(
      {
        selectedId: undefined,
        selectRegions: [],
        selectStreams: [],
        selectDirections: [],
        initialValues: null,
      },
      () => {
        this.filterStreams();
      }
    );
  }

  setMyRegions(e: any) {
    let items = e == null ? [] : e;
    this.setState({
      selectRegions: items.map((item: any) => {
        return item.value;
      }),
    });
  }

  setInitialValue = (item: any) => {
    let initialValues: any;
    let stream: any = this.state.streams.filter((item: any, i: number) => {
      return item.id == this.state.selectedId;
    });

    if (stream && stream[0]) {
      initialValues = {
        nameStreams: stream[0].name,
        region_id:
          stream[0].region.length > 0 &&
          stream[0].region.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
            };
          }),
        link: stream[0].links,
        offerId: stream[0].offer_id,
      };
      this.setState({ initialValues });
      this.setMyRegions(initialValues.region_id);
    }
  };

  render() {
    const openDeleteModal = (item: any) => {
      this.setState({
        visibleDeleteModal: true,
        selectedId: item,
      });
    };
    const closeDeleteModal = () => {
      this.setState({
        visibleDeleteModal: false,
      });
    };

    const deleteFunction = (id: any) => {
      Axios.get(`${configApi.api}/stream/delete?id=${id}`).then((response) => {
        closeDeleteModal();
        if (response.data.status == "ok") {
          this.setState(
            {
              isLoading: true,
            },
            () => {
              Axios.post(`${configApi.api}/stream/get-streams`).then((res) => {
                if (!this._isUnmounted) {
                  this.setState({
                    streams: res.data,
                    isLoading: false,
                  });
                }
              });
            }
          );
        }
      });
    };
    const animatedComponents = makeAnimated();

    const openModal = (
      item: any = null,
      buttonType: EButtonType = EButtonType.create
    ) => {
      this.setState((prevState: { visible: any }) => ({
        visible: !prevState.visible,
      }));
      if (item) {
        this.setState(
          {
            selectedId: item.id,
            actionType: buttonType,
          },
          () => {
            if (buttonType != EButtonType.create) {
              this.setInitialValue(item);
            } else {
              this.setState({
                selectedId: undefined,
                selectRegions: [],
                selectStreams: [],
                selectDirections: [],
                initialValues: null,
              });
            }
          }
        );
      }
    };
    const closeModal = () => {
      this.setState({
        visible: false,
      });
    };

    const handleSubmit = (values: any, setErrors: any) => {
      values.region_id = this.state.selectRegions;

      this.setState({ selectRegions: [] });
      this.setState({ initialValue: null });

      let formData = arrayToFormData(values);

      if (!this._isUnmounted) {
        closeModal();
        this.setState(
          {
            isLoading: true,
          },
          async () => {
            let response;

            if (this.state.actionType == EButtonType.edit) {
              response = await Axios.post(
                `${configApi.api}/stream/update?id=${this.state.selectedId}`,
                formData
              );
            } else {
              response = await Axios.post(
                `${configApi.api}/stream/create`,
                formData
              );
            }

            if (response.data.status == 0) {
              let errors: any = {};

              for (let prop in response.data.errors) {
                errors[prop] = response.data.errors[prop].join(", ");
              }

              if (!this._isUnmounted) {
                this.setState({
                  isLoading: false,
                });
              }
              setErrors(errors);
            } else {
              if (!this._isUnmounted) {
                closeModal();
                this.setState({
                  isLoading: false,
                });
                this.filterStreams();
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }
          }
        );
      }
    };

    let initialValues: any = this.state.initialValues
      ? this.state.initialValues
      : {
          nameStreams: "",
          region_id: [],
          link: "",
          offerId: "",
        };

    return (
      <div className='dashboardMyStreamsSection'>
        <div className='d-flex w-100 flex-wrap'>
          <ul className='breadcrumbs d-flex w-100'>
            <li>
              <Link to='/dashboard'>Главная</Link>
            </li>
            <li>
              <Link to='/dashboard/mystreams'>Мои потоки</Link>
            </li>
          </ul>
        </div>

        <div className='dashboardMainTitleSection'>
          <div className='search-offers'>
            <div className='d-flex flex-wrap'>
              <div className='col-lg-9 col-xs-12'>
                <div className='d-flex align-items-center flex-wrap h-100'>
                  <select
                    name='stream_id'
                    onChange={(e: any) => {
                      this.selectStreamsChange(
                        e.target.value ? e.target.value : null
                      );
                    }}
                  >
                    <option value=''>Название потока</option>
                    {this.state.streams.length > 0 &&
                      this.state.streams.map((items: any, i: number) => {
                        return (
                          <option key={i} value={items.id}>
                            {items.name}
                          </option>
                        );
                      })}
                  </select>

                  <select
                    name='direction_id'
                    onChange={(e: any) => {
                      this.selectDirectionChange(
                        e.target.value ? e.target.value : null
                      );
                    }}
                  >
                    <option value=''>Направление</option>
                    {this.state.directions.length > 0 &&
                      this.state.directions.map((direction: any, i: number) => {
                        return (
                          <option key={i} value={direction.id}>
                            {direction.name}
                          </option>
                        );
                      })}
                  </select>

                  <select
                    name='region_id'
                    onChange={(e: any) => {
                      this.selectRegionsChange(
                        e.target.value ? e.target.value : null
                      );
                    }}
                  >
                    <option value=''>Регион</option>
                    {this.state.regions.length > 0 &&
                      this.state.regions.map((region: any, i: number) => {
                        return (
                          <option key={i} value={region.id}>
                            {region.name}
                          </option>
                        );
                      })}
                  </select>
                  <img
                    src='/assets/svg/refresh2.svg'
                    alt=''
                    style={{ cursor: "pointer" }}
                    onClick={this.clearState}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row className='m-0'>
          <Col md={12}>
            <div className='streamsTable'>
              <div className='streamsTableInfo my-3 d-flex justify-content-between align-items-center '>
                <div className='streamsTableSub'>
                  <div className='title'>Потоки</div>
                  <div className='number ml-2'>
                    <div className='numberSub'>{this.state.streams.length}</div>
                  </div>
                  <div className='stream_archive'>
                    <Link
                      to='/dashboard/archive'
                      className='text-decoration-none'
                    >
                      Архивные потоки
                    </Link>
                  </div>
                </div>
                <div className=''>
                  <Link to='/dashboard/steps'>
                    <button
                      className='site-button'
                      data-toggle='modal'
                      data-target='#exampleModal'
                      onClick={() => {}}
                    >
                      Создать поток
                    </button>
                  </Link>
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
                    {this.state.streams.length > 0 ? (
                      this.state.streams.map((items: any, i: number) => (
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
                                <p className='mb-0'>{items.transitions}</p>
                                <p className='mb-0'>
                                  <Link to='#'>Переходы</Link>
                                </p>
                              </div>
                              <div className='mx-2'>
                                <p className='mb-0'>{items.leads}</p>
                                <p className='mb-0'>
                                  <Link
                                    to={
                                      "/dashboard/leads/" + items.id.toString()
                                    }
                                  >
                                    Лиды
                                  </Link>
                                </p>
                              </div>
                              <div className=''>
                                <p className='mb-0'>{items.leads_success}</p>
                                <p className='mb-0'>
                                  <Link
                                    to={
                                      "/dashboard/requests/" +
                                      items.id.toString()
                                    }
                                  >
                                    Заявки
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='bold'>{items.earned}</td>
                          <td className='actions'>
                            <div className='d-flex'>
                              <Link to={`/dashboard/steps/${items.id}`}>
                                <img
                                  src='/assets/img/cogs.svg'
                                  onClick={() =>
                                    openModal(items, EButtonType.edit)
                                  }
                                  alt=''
                                />
                              </Link>
                              <div className='mx-2'>
                                <img
                                  src='/assets/img/papers.svg'
                                  onClick={() =>
                                    openModal(items, EButtonType.clone)
                                  }
                                  alt=''
                                />
                              </div>
                              <div className=''>
                                <img
                                  src='/assets/img/basket.svg'
                                  style={{ cursor: "pointer" }}
                                  onClick={() => openDeleteModal(items.id)}
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

        <Modal
          isOpen={this.state.visible}
          toggle={openModal}
          size='lg'
          id='exampleModal'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <ModalHeader toggle={closeModal}>
            {this.state.actionType == EButtonType.clone
              ? "Клонировать поток"
              : this.state.actionType == EButtonType.edit
              ? "Редактировать поток"
              : "Создать поток"}
          </ModalHeader>
          <ModalBody>
            <Formik
              initialErrors={this.state.errors}
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async (values: any, { setErrors }: any) => {
                await handleSubmit(values, setErrors);
              }}
              validationSchema={Yup.object().shape({
                nameStreams: Yup.string().required(),
                region_id: Yup.array(),
                link: Yup.string().required(),
                offerId: Yup.number().required(),
              })}
            >
              {(props: any) => {
                const {
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                // console.log(errors);
                // @ts-ignore
                return (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={12} lg={6} xl={6}>
                        <div className='form-group'>
                          <label>Название потока</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Название потока'
                            name='nameStreams'
                            value={values.nameStreams}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Col>
                      <Col md={12} lg={6} xl={6}>
                        <label>Регион </label>
                        <Select
                          defaultValue={values.region_id}
                          isMulti
                          onChange={this.setMyRegions}
                          onBlur={handleBlur}
                          classNamePrefix='select'
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          options={this.state.regions?.map(
                            (regRes: { id: number; name: any }) => {
                              return {
                                value: regRes.id,
                                label: regRes.name,
                              };
                            }
                          )}
                          placeholder='Регион'
                        />
                      </Col>
                      <Col md={12} lg={6} xl={6}>
                        <div className='form-group'>
                          <label>Ссылка</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Ссылка'
                            name='link'
                            value={values.link}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Col>
                      <Col md={12} lg={6} xl={6}>
                        <label htmlFor='offersSelect'>Офферы</label>
                        <select
                          className='form-control'
                          id='offersSelect'
                          name='offerId'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.offerId}
                        >
                          <option value=''>Офферы</option>
                          {this.state.offers.length > 0 &&
                            this.state.offers.map((offers: any, i: number) => {
                              return (
                                <option key={i} value={offers.id}>
                                  {offers.name}
                                </option>
                              );
                            })}
                        </select>
                      </Col>
                    </Row>

                    <button type='submit' className='site-button py-2'>
                      Создать
                    </button>
                    <button
                      type='button'
                      className='site-button py-2'
                      onClick={closeModal}
                    >
                      Отмена
                    </button>
                  </form>
                );
              }}
            </Formik>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.visibleDeleteModal} toggle={openDeleteModal}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <h5 className='deleteModalTitle text-center p-4'>
                  Вы уверены, что хотите удалить этот элемент ?
                </h5>
              </Col>
            </Row>

            <div className='text-center'>
              <button
                type='submit'
                className='site-button py-2'
                onClick={(e) => deleteFunction(this.state.selectedId)}
              >
                Удалить
              </button>
              <button
                className='site-button py-2'
                type='button'
                color=''
                onClick={closeDeleteModal}
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

export default connect(mapStateToProps)(withTranslation()(DashboardMyStreams));
