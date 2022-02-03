import React, { Component } from "react";
import "../../../style.css";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// @ts-ignore
import configApi from "../../../utils/configApi";
import Axios from "axios";
import { Link } from "react-router-dom";
// @ts-ignore
import { Formik } from "formik";
import * as Yup from "yup";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { arrayToFormData } from "../../../utils/helpers";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

enum ESelectType {
  filterForm = 1,
  onPage = 2,
}

class DashboardOffers extends Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    offers: [],
    regions: [],
    directions: [],
    scenarios: [],
    pay: [],
    holds: [],

    showModal: false,

    currentOfferID: null,
    searchText: "",

    selectRegions: [],
    selectScenarios: [],
    selectHolds: null,
    selectDirections: [],
    selectPays: [],
    selectHoldsTwo: [],
  };

  constructor(e: any = null) {
    super(e);
    this.selectRegionsChange = this.selectRegionsChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setMyRegions = this.setMyRegions.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
        Axios.post(`${configApi.api}/universal/get-offers`).then((res) => {
          if (!this._isUnmounted) {
            this.setState({
              offers: res.data,
              isLoading: false,
            });
          }
        });
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

    Axios.post(`${configApi.api}/universal/scenario-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          scenarios: [...res.data],
        });
      }
    });

    Axios.post(`${configApi.api}/universal/pay-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          pay: [...res.data],
        });
      }
    });

    Axios.post(`${configApi.api}/universal/hold-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          holds: [...res.data],
        });
      }
    });
  }

  setMyRegions(e: any) {
    let items = e == null ? [] : e;
    this.setState({
      selectRegions: items.map((item: any) => {
        return item.value;
      }),
    });
  }

  filterOffers() {
    let url = `${configApi.api}/universal/filter-offers`;
    let data = {};

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
    if (this.state.selectScenarios && this.state.selectScenarios.length > 0) {
      data = {
        ...data,
        scenarios: this.state.selectScenarios,
      };
    }

    if (this.state.selectPays && this.state.selectPays.length > 0) {
      data = {
        ...data,
        pays: this.state.selectPays,
      };
    }

    if (this.state.selectHolds && this.state.selectHolds.length > 0) {
      data = {
        ...data,
        hold: this.state.selectHolds,
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
              offers: res.data,
              isLoading: false,
            });
          }
        );
      }
    });
  }

  selectRegionsChange(e: any, type: ESelectType, justFilter: boolean = false) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectRegions: [],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    } else if (type == ESelectType.filterForm) {
      this.setState({
        selectRegions: [...this.state.selectRegions, e],
      });
    } else {
      this.setState(
        {
          selectRegions: [parseInt(e)],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    }
  }

  selectDirectionChange(
    e: any,
    type: ESelectType,
    justFilter: boolean = false
  ) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectDirections: [],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    } else if (type == ESelectType.filterForm) {
      this.setState({
        selectDirections: [...this.state.selectDirections, e],
      });
    } else {
      this.setState(
        {
          selectDirections: [parseInt(e)],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    }
  }

  selectScenariosChange(
    e: any,
    type: ESelectType,
    justFilter: boolean = false
  ) {
    let _this = this;
    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectScenarios: [],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    } else if (type == ESelectType.filterForm) {
      this.setState({
        selectScenarios: [...this.state.selectScenarios, e],
      });
    } else {
      this.setState(
        {
          selectScenarios: [parseInt(e)],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    }
  }

  handleSubmit = (values: any, setErrors: any) => {
    values.region_id = this.state.selectRegions;

    this.setState({ selectRegions: [] });
    this.setState({ initialValue: null });

    let formData = arrayToFormData(values);

    if (!this._isUnmounted) {
      this.setState({ ...this.state, showModal: false });
      this.setState(
        {
          isLoading: true,
        },
        async () => {
          let response;

          response = await Axios.post(
            `${configApi.api}/stream/create`,
            formData
          );

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
              this.setState({ ...this.state, showModal: false });
              this.setState({
                isLoading: false,
              });
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

  selectPayChange(e: any, type: ESelectType, justFilter: boolean = false) {
    let _this = this;
    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectPays: [],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    } else if (type == ESelectType.filterForm) {
      this.setState({
        selectPays: [...this.state.selectPays, e],
      });
    } else {
      this.setState(
        {
          selectPays: [parseInt(e)],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    }
  }

  selectHoldChange(e: any, type: ESelectType, justFilter: boolean = false) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectHolds: [],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    } else if (type == ESelectType.filterForm) {
      this.setState({
        selectHolds: [...this.state.selectHolds, e],
      });
    } else {
      this.setState(
        {
          selectHolds: [parseInt(e)],
        },
        () => {
          if (justFilter) _this.filterOffers();
        }
      );
    }
  }

  clearState() {
    this.setState(
      {
        selectRegions: [],
        selectScenarios: [],
        selectHolds: null,
        selectDirections: [],
        selectPays: [],
      },
      () => {
        this.filterOffers();
      }
    );
  }

  checkBoxSelectRegionsFunc = (id: any) => {
    if (this.state.selectRegions.includes(id)) {
      this.state.selectRegions.splice(this.state.selectRegions.indexOf(id), 1);
    } else this.state.selectRegions.push(id);
    this.setState({
      selectRegions: this.state.selectRegions,
    });
  };

  checkBoxSelectDirectionFunc = (id: any) => {
    if (this.state.selectDirections.includes(id)) {
      this.state.selectDirections.splice(
        this.state.selectDirections.indexOf(id),
        1
      );
    } else this.state.selectDirections.push(id);
    this.setState({
      selectDirections: this.state.selectDirections,
    });
  };

  checkBoxSelectScenariosFunc = (id: any) => {
    if (this.state.selectScenarios.includes(id)) {
      this.state.selectScenarios.splice(
        this.state.selectScenarios.indexOf(id),
        1
      );
    } else this.state.selectScenarios.push(id);
    this.setState({
      selectScenarios: this.state.selectScenarios,
    });
  };

  checkBoxSelectPayFunc = (id: any) => {
    if (this.state.selectPays.includes(id)) {
      this.state.selectPays.splice(this.state.selectPays.indexOf(id), 1);
    } else this.state.selectPays.push(id);
    this.setState({
      selectPays: this.state.selectPays,
    });
  };

  checkBoxSelectHoldsFunc = (id: any) => {
    if (this.state.selectHoldsTwo.includes(id)) {
      this.state.selectHoldsTwo.splice(
        this.state.selectHoldsTwo.indexOf(id),
        1
      );
    } else this.state.selectHoldsTwo.push(id);
    this.setState({
      selectHoldsTwo: this.state.selectHoldsTwo,
    });
  };

  handleSearchChange(e) {
    if (e.target.value === "") {
      Axios.post(`${configApi.api}/universal/get-offers`).then((res) => {
        if (!this._isUnmounted) {
          this.setState({
            offers: res.data,
            isLoading: false,
          });
        }
      });
    } else {
      this.setState({ ...this.state, searchText: e.target.value });
    }
  }

  handleSearch(e) {
    let formData = new FormData();
    formData.append("name", this.state.searchText);
    Axios.post(`${configApi.api}/universal/search-offer`, formData).then(
      (res) => {
        this.setState({
          offers: res.data,
        });
      }
    );
  }

  toggleModal() {
    this.setState({ ...this.state, showModal: !this.state.showModal });
  }

  render() {
    console.log(this.props);
    // @ts-ignore
    const { showModal, showFilterModal, currentItem, dispatch } = this.props;
    const { selectRegions } = this.state;
    const setMyRegions = (e: any) => {
      this.setState({ selectRegions: e });
    };
    /*
     * patok sozdat modal
     * */

    const openModal = (item: any) => {
      this.setState({
        currentOfferID: item,
      });

      dispatch({
        type: "updateState",
        payload: {
          showModal: !showModal,
          currentItem: item,
        },
      });
    };

    const handleSubmit = (values: any, setErrors: any) => {
      values.region_id = selectRegions.map((res: any) => res.value);
      this.setState({ selectedMyRegions: undefined });
      let formData = arrayToFormData(values);

      this.setState(
        {
          isLoading: true,
        },
        async () => {
          Axios.post(`${configApi.api}/stream/create`, formData).then(
            (response) => {
              if (!this._isUnmounted) {
                if (response.data.status == "error") {
                  let errors: any = {};

                  for (let prop in response.data.errors) {
                    errors[prop] = response.data.errors[prop].join(", ");
                  }
                  this.setState({
                    isLoading: false,
                    errors,
                  });
                  setErrors(errors);
                } else {
                  if (!this._isUnmounted) {
                    dispatch({
                      type: "updateState",
                      payload: {
                        showModal: false,
                      },
                    });
                    this.setState({
                      isLoading: false,
                    });
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }
                }
              }
            }
          );
        }
      );
    };

    const openFilterModal = (item: any) => {
      dispatch({
        type: "updateState",
        payload: {
          showFilterModal: !showFilterModal,
          currentItem: item,
        },
      });
    };

    const animatedComponents = makeAnimated();

    let initialValues = {
      nameStreams: "",
      scenario_id: null,
      phone: "",
      region_id: [],
      link: "",
      offerId: this.state.currentOfferID,
    };

    return (
      <div>
        <div className="container-fluid">
          <Modal
            isOpen={this.state.showModal}
            toggle={this.toggleModal}
            size="lg"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <ModalHeader toggle={this.toggleModal}>
              Клонировать поток
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
                          <div className="form-group">
                            <label>Название потока</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Название потока"
                              name="nameStreams"
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
                            classNamePrefix="select"
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
                            placeholder="Регион"
                          />
                        </Col>
                        <Col md={12} lg={6} xl={6}>
                          <div className="form-group">
                            <label>Ссылка</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Ссылка"
                              name="link"
                              value={values.link}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col md={12} lg={6} xl={6}>
                          <label htmlFor="offersSelect">Офферы</label>
                          <select
                            className="form-control"
                            id="offersSelect"
                            name="offerId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.offerId}
                          >
                            <option value="">Офферы</option>
                            {this.state.offers.length > 0 &&
                              this.state.offers.map(
                                (offers: any, i: number) => {
                                  return (
                                    <option key={i} value={offers.id}>
                                      {offers.name}
                                    </option>
                                  );
                                }
                              )}
                          </select>
                        </Col>
                      </Row>

                      <button type="submit" className="site-button py-2">
                        Создать
                      </button>
                      <button
                        type="button"
                        className="site-button py-2"
                        onClick={this.toggleModal}
                      >
                        Отмена
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </ModalBody>
          </Modal>

          <div className="row">
            <div className="content">
              <div className="d-flex w-100 flex-wrap">
                <ul className="breadcrumbs d-flex w-100">
                  <li>
                    <Link to="/dashboard">Главная</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/creatives">Офферы</Link>
                  </li>
                </ul>
              </div>

              <div className="dashboardMainTitleSection">
                <div className="search-offers">
                  <div className="d-flex flex-wrap">
                    <div className="col-lg-7 col-xs-12">
                      <div className="d-flex align-items-center flex-wrap">
                        <select
                          onChange={(e: any) => {
                            this.selectRegionsChange(
                              e.target.value ? e.target.value : null,
                              ESelectType.onPage,
                              true
                            );
                          }}
                        >
                          <option value="">Регион</option>
                          {this.state.regions.length > 0 &&
                            this.state.regions.map((region: any, i: number) => {
                              return (
                                <option key={i} value={region.id}>
                                  {region.name}
                                </option>
                              );
                            })}
                        </select>
                        <select
                          name="direction_id"
                          onChange={(e: any) => {
                            this.selectDirectionChange(
                              e.target.value ? e.target.value : null,
                              ESelectType.onPage,
                              true
                            );
                          }}
                        >
                          <option value="">Направление</option>
                          {this.state.directions.length > 0 &&
                            this.state.directions.map(
                              (direction: any, i: number) => {
                                return (
                                  <option key={i} value={direction.id}>
                                    {direction.name}
                                  </option>
                                );
                              }
                            )}
                        </select>
                        <select
                          name="scenario_id"
                          onChange={(e: any) => {
                            this.selectScenariosChange(
                              e.target.value ? e.target.value : null,
                              ESelectType.onPage,
                              true
                            );
                          }}
                        >
                          <option value="">Сценарии</option>
                          {this.state.scenarios.length > 0 &&
                            this.state.scenarios.map(
                              (scenario: any, i: number) => {
                                return (
                                  <option key={i} value={scenario.id}>
                                    {scenario.name}
                                  </option>
                                );
                              }
                            )}
                        </select>

                        <select
                          name="pay_id"
                          id="selectPayChange"
                          onChange={(e: any) => {
                            this.selectPayChange(
                              e.target.value ? e.target.value : null,
                              ESelectType.onPage,
                              true
                            );
                          }}
                        >
                          <option value="">Выплаты</option>
                          {this.state.pay.length > 0 &&
                            this.state.pay.map((pay: any, i: number) => {
                              return (
                                <option key={i} value={pay.id}>
                                  {pay.name}
                                </option>
                              );
                            })}
                        </select>
                        <span>
                          {this.state.holds &&
                            this.state.holds.length > 0 &&
                            this.state.holds[1].value}
                        </span>
                        <div className="switchToggle">
                          <input
                            type="checkbox"
                            id="switch"
                            defaultValue={
                              this.state.holds &&
                              this.state.holds.length > 0 &&
                              this.state.holds[1].id
                            }
                            onChange={(e: any) => {
                              this.selectHoldChange(
                                e.target.value ? e.target.value : null,
                                ESelectType.onPage,
                                true
                              );
                            }}
                          />
                          <label htmlFor="switch">Toggle</label> &nbsp;
                        </div>
                        <img
                          src="/assets/svg/refresh2.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                          onClick={this.clearState}
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-xs-12 d-flex align-items-center justify-content-end">
                      <div className="form-group fg--search mr-3">
                        <input
                          onChange={this.handleSearchChange}
                          type="text"
                          className="input"
                          placeholder="Поиск"
                        />
                        <button
                          onClick={this.handleSearch}
                          type="submit"
                          style={{ zIndex: 0 }}
                        >
                          <img
                            className="m-0"
                            src="/assets/svg/searchIcon.png"
                            alt="search"
                          />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="filtration-button"
                        onClick={() => openFilterModal("")}
                      >
                        <img src="/assets/svg/filltre.svg" alt="" />
                        Фильтр
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="dashboardGridCards2">
                  {this.state.offers.length > 0 &&
                    this.state.offers.map((items: any, i: number) => (
                      <div className="mb-4" key={i}>
                        {console.log(items)}
                        <div className="dashboardGridCardItems h-100">
                          <div className="m-0 gridCardItemsRow h-100">
                            <div className="gridCardItemsCol1 p-0">
                              <img
                                src={items.path}
                                className="gridCardItemsImg2 img-fluid"
                                alt={items.image}
                              />
                            </div>

                            <div className="gridCardItemsCol2 p-0 h-100">
                              <div className="gridCardItemsFlexInfos2">
                                <div className="gridCardItemsCol1hidden">
                                  <img
                                    src={items.path}
                                    className="gridCardItemsImg2 img-fluid"
                                    alt={items.image}
                                  />
                                </div>
                                <div className="gridCardItemsFlexInfos22">
                                  <div className="gridCardItemsFlexInfos2Sub1">
                                    <p className="title mb-0">{items.name}</p>
                                    <p className="description mb-0">
                                      {items.sub_description}
                                      <Link
                                        to={
                                          "/dashboard/offersDetail/" + items.id
                                        }
                                        className="text-decoration-none text-dark ml-2"
                                      >
                                        Подробно
                                      </Link>
                                    </p>
                                  </div>
                                  <div className="mt-2">
                                    <button
                                      className="site-button"
                                      onClick={() =>
                                        this.setState({
                                          ...this.state,
                                          showModal: true,
                                        })
                                      }
                                    >
                                      Подключить офер
                                    </button>
                                  </div>
                                </div>
                                <div className="dashboardGridCards2SubMain">
                                  <div className="dashboardGridCards2Sub">
                                    <div className="dashboardGridCardItemsSub">
                                      <p className="tegTitle">Регион</p>
                                      <div className="tegTextMain">
                                        {items.region.map(
                                          (offersRegion: any, i: number) => (
                                            <div key={i}>
                                              <p className="tegText">
                                                {offersRegion.name}
                                              </p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="dashboardGridCardItemsSub">
                                      <p className="tegTitle">Направление</p>
                                      <div className="tegTextMain">
                                        <div>
                                          <p className="tegText">
                                            {items.direction.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="dashboardGridCardItemsSub">
                                      <p className="tegTitle">Сценарии</p>
                                      <div className="tegTextMain">
                                        {items.scenario.map(
                                          (offersScenario: any, i: number) => (
                                            <div key={i}>
                                              <p className="tegText">
                                                {offersScenario.name}
                                              </p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>

                                    <div className="dashboardGridCardItemsSub">
                                      <p className="tegTitle">Выплата</p>
                                      <div className="tegTextMain">
                                        {items.pay.map(
                                          (offersPay: any, i: number) => (
                                            <div key={i}>
                                              <p className="tegText">
                                                {offersPay.name}
                                              </p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="dashboardGridCardItemsSub">
                                      <p className="tegTitle">Холд</p>
                                      <div className="tegTextMain">
                                        {items.hold.map(
                                          (offersHold: any, i: number) => (
                                            <div key={i}>
                                              <p className="tegText">
                                                {offersHold.value}
                                              </p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <Pagination aria-label="Page navigation example">
                <PaginationItem>
                  <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink last href="#" />
                </PaginationItem>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// @ts-ignore
DashboardOffers.propTypes = {};

export default DashboardOffers;
