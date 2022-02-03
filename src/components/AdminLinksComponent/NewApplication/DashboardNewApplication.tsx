import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import "../NewApplication/application.scss";
import { arrayToFormData } from "../../../utils/helpers";
import Axios, { AxiosResponse } from "axios";
import configApi from "../../../utils/configApi";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

class DashboardApplicationMaster extends Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    selectedId: undefined,
    region_child: [],
    directions: [],
    offers: [],
    regions: [],
    country_id: null,

    redirect: false,
    fast: null,
    call: null,

    isUpdate: false,
    requestOne: null,
  };

  constructor(e: any = null) {
    super(e);
  }

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.getRequest();
    }
  }

  async getRequest() {
    this.setState(
      {
        requestOne: null,
        isLoading: true,
      },
      async () => {
        let response: AxiosResponse = await Axios.get(
          `${configApi.api}/request/get-request-one?id=${this.props.match.params.id}`
        );

        if (!this._isUnmounted) {
          this.setState(
            {
              requestOne: response.data,
              isLoading: false,
            },
            () => {
              if (this.state.requestOne) {
                let reg: any = this.state.regions.filter((item: any) => {
                  return this.state.requestOne.country_id == item.id;
                });

                this.setState({
                  country_id: this.state.requestOne.country_id,
                  region_child: reg.length > 0 ? reg[0].region_child : [],
                  fast: this.state.requestOne.fast,
                  call: this.state.requestOne.call,
                });
              }
            }
          );
        }
      }
    );
  }

  componentDidMount() {
    Axios.post(`${configApi.api}/universal/direction-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          directions: [...res.data],
        });
      }
    });

    Axios.post(`${configApi.api}/universal/get-offers`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          offers: [...res.data],
        });
      }
    });

    Axios.post(`${configApi.api}/universal/region-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState(
          {
            regions: [...res.data],
          },
          () => {
            if (this.props.match.params.id) {
              this.getRequest();
            }
          }
        );
      }
    });
  }

  // async handleSubmit(values: any, setErrors: any) {
  //
  //     values.fast = this.state.fast;
  //     values.call = this.state.call;
  //     values.country_id = this.state.country_id;
  //     let formData = arrayToFormData(values);
  //
  //     this.setState({
  //         isLoading: true,
  //         fast: null,
  //         call: null,
  //         country_id: null
  //     }, async () => {
  //         Axios.post(`${configApi.api}/request/create-master`, formData).then(response => {
  //             if (!this._isUnmounted) {
  //                 if (response.data.status == "error") {
  //                     let errors: any = {};
  //
  //                     for (let prop in response.data.errors) {
  //                         errors[prop] = response.data.errors[prop].join(", ");
  //                     }
  //                     this.setState({
  //                         isLoading: false,
  //                         errors
  //                     });
  //                     setErrors(
  //                         errors
  //                     );
  //                 } else {
  //                     if (!this._isUnmounted) {
  //                         this.setState({
  //                             isLoading: false,
  //                             redirect: true
  //                         });
  //                         window.scrollTo({
  //                             top: 0,
  //                             left: 0,
  //                             behavior: 'smooth'
  //                         });
  //                     }
  //                 }
  //             }
  //         });
  //     });
  // }

  async handleSubmit(values: any, setErrors: any) {
    values.fast = this.state.fast === null ? 0 : this.state.fast;
    values.call = this.state.call === null ? 0 : this.state.call;
    values.country_id = this.state.country_id;
    let formData = arrayToFormData(values);
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        let url;

        if (this.state.requestOne) {
          url = `${configApi.api}/request/update?id=${this.state.requestOne.id}`;
        } else {
          url = `${configApi.api}/request/create-master`;
        }

        Axios.post(url, formData).then((response) => {
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
                this.setState({
                  isLoading: false,
                  redirect: true,
                  fast: null,
                  country_id: null,
                });

                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }
          }
        });
      }
    );
  }

  handleSelectChange = (event: any) => {
    if (!(event.target.value == null || event.target.value == "")) {
      let reg: any = this.state.regions.filter((item: any) => {
        return event.target.value == item.id;
      });

      this.setState({
        country_id: event.target.value,
        region_child: reg.length > 0 ? reg[0].region_child : [],
      });
    }
  };

  render() {
    // if (!this.props.auth.isAuthentificated) return <Redirect to="/login"/>;
    // if (this.state.redirect) return <Redirect to="/dashboard/applicationmastertable"/>;

    let initialValues;
    if (this.state.requestOne) {
      initialValues = { ...this.state.requestOne };
    } else {
      initialValues = {
        direction_id: "",
        offers_id: "",
        first: "",
        last: "",
        middle: "",
        phone: "",
        region_id: "",
        street: "",
        home: "",
        kv_office: "",
        waiting_date: "",
        waiting_time_from: "",
        waiting_time_to: "",
        comment: "",
        phone_dp: "",
        istochnik: "",
      };
    }

    return (
      <section className="dashboardNewApplicationSection mb-5">
        <div className="d-flex w-100 flex-wrap">
          <ul className="breadcrumbs d-flex w-100">
            <li>
              <Link to="/dashboard">Главная</Link>
            </li>
            <li>
              <Link to="/dashboard/applicationmastertable">
                Таблица заявка от лица частного мастера
              </Link>
            </li>
            <li>
              <Link to="/dashboard/applicationmaster">
                {" "}
                Заявка от лица частного мастера
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardMainTitleSection">
          <Row className="m-0">
            <Col md={12}>
              <p className="my-0 dashboardMainTitle">
                Заявка от лица частного мастера
              </p>
            </Col>
          </Row>
        </div>
        <div className="dashboardMainFormSection mt-3">
          <Row className="m-0">
            <Col
              md={12}
              lg={12}
              xl={8}
              className="dashboardMainFormSectionCol1"
            >
              <Card className="dashboardMainFormSectionCard">
                <Formik
                  initialErrors={this.state.errors}
                  enableReinitialize={true}
                  initialValues={initialValues}
                  onSubmit={async (values: any, { setErrors }: any) => {
                    await this.handleSubmit(values, setErrors);
                  }}
                  validationSchema={Yup.object().shape({
                    direction_id: Yup.number().required(),
                    offers_id: Yup.number().required(),
                    first: Yup.string().required(),
                    last: Yup.string().required(),
                    middle: Yup.string().required(),
                    phone: Yup.string().required(),
                    region_id: Yup.number().required(),
                    street: Yup.string().required(),
                    home: Yup.string().required(),
                    kv_office: Yup.string().required(),
                    waiting_date: Yup.string().required(),
                    waiting_time_from: Yup.number().required(),
                    waiting_time_to: Yup.number().required(),
                    comment: Yup.string().required(),
                    phone_dp: Yup.string().required(),
                    istochnik: Yup.string().required(),
                  })}
                >
                  {(props: any) => {
                    const {
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      touched,
                    } = props;

                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <div className="formGroup2">
                            <Row>
                              <Col md={12} lg={11} xl={11}>
                                <Row>
                                  <Col md={6} className="mb-3">
                                    <select
                                      value={values.direction_id}
                                      name="direction_id"
                                      className={
                                        "form-control w-100" +
                                        (touched.direction_id &&
                                        errors.direction_id
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option value="">Направление</option>
                                      {this.state.directions.length > 0 &&
                                        this.state.directions.map(
                                          (items: any, i: number) => {
                                            return (
                                              <option key={i} value={items.id}>
                                                {items.name}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>
                                  </Col>
                                  <Col md={6} className="mb-3">
                                    <select
                                      value={values.offers_id}
                                      name="offers_id"
                                      className={
                                        "form-control w-100" +
                                        (touched.offers_id && errors.offers_id
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option value="">Офферы</option>
                                      {this.state.offers.length > 0 &&
                                        this.state.offers.map(
                                          (items: any, i: number) => {
                                            return (
                                              <option key={i} value={items.id}>
                                                {items.name}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                          <div className="formGroup2">
                            <p className="formGroup2Title mb-0">
                              Контактные данные клиента
                            </p>
                            <p className="formGroup2Text mb-0">
                              Внимательно проверьте контактные данные клиента,
                              чтобы оператор передал заявку в работу.
                            </p>
                            <Row>
                              <Col md={12} lg={11} xl={11}>
                                <Row className="mt-4">
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="first"
                                      value={values.first}
                                      className={
                                        "form-control " +
                                        (touched.first && errors.first
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Имя"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="last"
                                      value={values.last}
                                      className={
                                        "form-control " +
                                        (touched.last && errors.last
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Фамилия"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="middle"
                                      value={values.middle}
                                      className={
                                        "form-control " +
                                        (touched.middle && errors.middle
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Отчество"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="phone"
                                      value={values.phone}
                                      className={
                                        "form-control " +
                                        (touched.phone && errors.phone
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Телефон"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <select
                                      value={this.state.country_id}
                                      name="country_id"
                                      className="form-control w-100"
                                      onChange={this.handleSelectChange}
                                    >
                                      <option value="">Страна</option>
                                      {this.state.regions.length > 0 &&
                                        this.state.regions.map(
                                          (items: any, i: number) => {
                                            return (
                                              <option key={i} value={items.id}>
                                                {items.name}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <select
                                      value={values.region_id}
                                      name="region_id"
                                      className={
                                        "form-control w-100" +
                                        (touched.region_id && errors.region_id
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option value="">Город</option>
                                      {this.state.region_child.length > 0 &&
                                        this.state.region_child.map(
                                          (items: any, i: number) => {
                                            return (
                                              <option key={i} value={items.id}>
                                                {items.name}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                          <div className="formGroup2">
                            <div className="switchToggleMain d-flex aling-items-center warning-text align-items-center flex-wrap">
                              <div className="switchToggle">
                                <input
                                  name="call"
                                  type="checkbox"
                                  id="switch2"
                                  checked={this.state.call == 1}
                                  onChange={(e: any) => {
                                    this.setState({
                                      call: this.state.call == 1 ? 0 : 1,
                                    });
                                  }}
                                />
                                <label htmlFor="switch2">Toggle</label> &nbsp;
                              </div>
                              &nbsp;{" "}
                              {!this.state.call ? (
                                <span>Клиенту не звонить</span>
                              ) : (
                                <span>Клиенту звонить</span>
                              )}
                            </div>
                            <Row>
                              <Col md={12} lg={11} xl={11}>
                                <Row className="mt-4">
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="street"
                                      value={values.street}
                                      className={
                                        "form-control " +
                                        (touched.street && errors.street
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Улица"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="home"
                                      value={values.home}
                                      className={
                                        "form-control " +
                                        (touched.home && errors.home
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Дом"
                                    />
                                  </Col>
                                  <Col md={4} className="mb-3">
                                    <input
                                      type="text"
                                      name="kv_office"
                                      value={values.kv_office}
                                      className={
                                        "form-control " +
                                        (touched.kv_office && errors.kv_office
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Кв / Офис"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                          <div className="formGroup2">
                            <p className="formGroup2Title mb-0">Время</p>
                            <p className="formGroup2Text mb-0">
                              Учитывайте дорожную обстановку. Рекомендуем
                              ставить выезд в течение двух часов.
                            </p>
                            <Row>
                              <Col md={12} lg={11} xl={11}>
                                <Row className="mt-4">
                                  <Col md={12} className="mb-3 waitingMain">
                                    <p className="waiting">
                                      <span>Клиент ждет</span>
                                      <span>
                                        <input
                                          type="date"
                                          name="waiting_date"
                                          value={values.waiting_date}
                                          className={
                                            "" +
                                            (touched.waiting_date &&
                                            errors.waiting_date
                                              ? "required"
                                              : "")
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </span>
                                      <span>c</span>
                                      <span>
                                        <input
                                          type="number"
                                          style={{ width: "75px" }}
                                          placeholder="15"
                                          name="waiting_time_from"
                                          value={values.waiting_time_from}
                                          className={
                                            "" +
                                            (touched.waiting_time_from &&
                                            errors.waiting_time_from
                                              ? "required"
                                              : "")
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </span>
                                      <span>до</span>
                                      <span>
                                        <input
                                          type="number"
                                          style={{ width: "75px" }}
                                          placeholder="15"
                                          name="waiting_time_to"
                                          value={values.waiting_time_to}
                                          className={
                                            "" +
                                            (touched.waiting_time_to &&
                                            errors.waiting_time_to
                                              ? "required"
                                              : "")
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </span>
                                    </p>
                                    <div className="switchToggleMain d-flex aling-items-center warning-text align-items-center flex-wrap">
                                      <div className="switchToggle">
                                        <input
                                          name="fast"
                                          type="checkbox"
                                          id="switch"
                                          checked={this.state.fast == 1}
                                          onChange={(e: any) => {
                                            this.setState({
                                              fast:
                                                this.state.fast == 1 ? 0 : 1,
                                            });
                                          }}
                                        />
                                        <label htmlFor="switch">Toggle</label>{" "}
                                        &nbsp;
                                        {/*{console.log(values.fast, "fast")}*/}
                                      </div>
                                      &nbsp; Срочно &nbsp;{" "}
                                      <span className="text-danger">
                                        {" "}
                                        Ставьте только когда это действительно
                                        обосновано!
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                          <div className="formGroup2">
                            <p className="formGroup2Title mb-0">
                              Детали заявки
                            </p>
                            <p className="formGroup2Text mb-0">
                              Если вы знаете проблему клиента, опишите её.
                              Оператор задаст меньше вопросов и быстрее назначит
                              мастера на заявку.
                            </p>
                            <Row>
                              <Col md={12} lg={11} xl={11}>
                                <Row className="mt-4">
                                  <Col md={12} className="mb-3">
                                    <textarea
                                      name="comment"
                                      value={values.comment}
                                      className={
                                        "form-control " +
                                        (touched.comment && errors.comment
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Комментарий / Проблема"
                                    />
                                  </Col>
                                  <Col md={5} className="mb-3">
                                    <input
                                      type="text"
                                      name="phone_dp"
                                      value={values.phone_dp}
                                      className={
                                        "form-control " +
                                        (touched.phone_dp && errors.phone_dp
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Дополнительный телефон"
                                    />
                                  </Col>
                                  <Col md={7} className="mb-3">
                                    <input
                                      type="text"
                                      name="istochnik"
                                      value={values.istochnik}
                                      className={
                                        "form-control " +
                                        (touched.istochnik && errors.istochnik
                                          ? "required"
                                          : "")
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Источник"
                                    />
                                  </Col>
                                </Row>
                                <button type="submit" className="site-button">
                                  Отправить
                                </button>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </Card>
            </Col>
            <Col
              md={12}
              lg={12}
              xl={4}
              className="dashboardMainFormSectionCol2"
            >
              <Card className="formSectionCardInfo">
                <CardBody>
                  <div className="infoTitleMain">
                    <p className="infoTitle">
                      <img
                        className="mr-2"
                        src="/assets/svg/inform.svg"
                        alt=""
                      />
                      Информация
                    </p>
                  </div>
                  <div className="infoDescMain">
                    <p className="infoDesc mb-0">
                      Для передачи заявки в ручном формате от лица компании,
                      заполните все необходимые поля и нажмите кнопку отправить.
                      При необходимости вы можете указать источник для
                      дальнейшей аналитики.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(
  withTranslation()(DashboardApplicationMaster)
);
