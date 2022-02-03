import React, { Component } from "react";
import { Card, CardBody, Col, Collapse, Row, TabPane } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Axios from "axios";
import configApi from "../../../utils/configApi";
import "./steps.scss";
import { ETabValue } from "../../../utils/interface";
import LandingDemos from "./Landing/LandingDemos";

class StepThree extends Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    activeCollapse: undefined,
    backgroundFormColor: "red",
    colorActive: false,
    btnBackgroundColor: "black",
    btnColorActive: false,
    formColor: "#fff",
    formColorActive: false,
    stepTabs: ETabValue.tabOne,
    inputBtn: "Позвонити мне",
    inputTitle: "Заказать званок",
    inputDescription: "Введите текст подсказки для поля Описание",
    linkImage: "",
    inputImgBazoviy: "assets/img/bg.jpg",
    showName: false,
    showCountry: false,
    showDescription: false,

    width: "auto",
    height: "auto",
    marginTop: "auto",
    marginBottom: "auto",

    selectRegions: [],
    regions: [],
    initialValues: null,
    fieldname: null,
    fielddescription: null,
    showDefaultBackImage: false,
  };

  constructor(e: any = null) {
    super(e);
    this.setMyRegions = this.setMyRegions.bind(this);
    this.inputBtnChange = this.inputBtnChange.bind(this);
    this.inputTitleChange = this.inputTitleChange.bind(this);
    this.inputDescriptionChange = this.inputDescriptionChange.bind(this);
    this.btnColorHandleChange = this.btnColorHandleChange.bind(this);
    this.setTheme = this.setTheme.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.props.setDefaultValue,
    });
    Axios.post(`${configApi.api}/universal/region-list`).then((res) => {
      if (!this._isUnmounted) {
        const defaultRegions: any = [];
        this.props.setDefaultValue.region_id.forEach((id: any) => {
          let found = res.data.find((r: any) => r.id === id);
          defaultRegions.push({
            value: found.id,
            label: found.name,
          });
        });
        this.setState({
          ...this.state,
          regions: [...res.data],
          region_id: defaultRegions,
        });
      }
    });
  }

  colorHandleChange = (e: any) => {
    this.setState({
      ...this.state,
      backgroundFormColor: e.target.value,
    });
  };

  btnColorHandleChange = (e: any) => {
    this.setState({
      btnBackgroundColor: e.target.value,
    });
  };

  formColorHandleChange = (e: any) => {
    this.setState({
      formColor: e.target.value,
      oldFormColor: this.state.formColor,
      activeFormColor: !this.state.formColorActive,
    });
  };
  inputBtnChange = (e: any) => {
    this.setState({
      inputBtn: e.target.value,
    });
  };
  inputTitleChange = (e: any) => {
    this.setState({
      inputTitle: e.target.value,
    });
  };
  inputDescriptionChange = (e: any) => {
    this.setState({
      inputDescription: e.target.value,
    });
  };

  inputImgChange = (e: any) => {
    this.setState({
      linkImage: e.target.value,
    });
  };

  inputWidthChange = (e: any) => {
    this.setState(
      {
        width: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  inputHeightChange = (e: any) => {
    this.setState({
      height: e.target.value,
    });
  };
  inputMarginTChange = (e: any) => {
    this.setState({
      marginTop: e.target.value,
    });
  };

  inputMarginBChange = (e: any) => {
    this.setState({
      marginBottom: e.target.value,
    });
  };

  setTheme = () => {
    const isVisible = this.state.showDefaultBackImage;
    this.setState({
      ...this.state,
      showDefaultBackImage: isVisible === 1 ? 0 : 1,
    });
  };

  showNameHandleChange = (e: any) => {
    const isVisible = this.state.showNameInput;
    console.log(this.state);
    this.setState({
      ...this.state,
      showNameInput: isVisible === 1 ? 0 : 1,
    });
  };
  showCountryHandleChange = () => {
    const isVisible = this.state.showRegion;
    this.setState({
      ...this.state,
      showRegion: isVisible === 1 ? 0 : 1,
    });
  };

  showDescriptionHandleChange = () => {
    const isVisible = this.state.showDescriptionInput;
    this.setState({
      showDescriptionInput: isVisible === 1 ? 0 : 1,
    });
  };

  back = (values: any) => {
    this.setStates(values);
    this.props.setmainFormVals({ ...this.props.setDefaultValue, ...values });
    // @ts-ignore
    this.props.prevStep();
  };

  setMyRegions(e: any) {
    // if (this.props.setDefaultValue) {
    this.setState({
      ...this.state,
      region_id: e,
    });
  }

  setStates(values: any) {
    let regions = this.state.region_id.map((r: any) => r.value);
    values.region_id = regions;
    values.showDescriptionInput = this.state.showDescriptionInput;
    values.showNameInput = this.state.showNameInput;
    values.showRegion = this.state.showRegion;
    values.showDefaultBackImage = this.state.showDefaultBackImage;
    values.backgroundFormColor = this.state.backgroundFormColor;
    return values;
  }

  async handleSubmit(values: any, setErrors: any) {
    this.props.setMainValue(this.setStates(values));
    this.props.nextStep();
  }

  render() {
    let initialValues;

    initialValues = {
      ...this.props.setDefaultValue,
    };

    const animatedComponents = makeAnimated();

    const changeActiveCollapse = (index: any) => {
      this.setState({
        activeCollapse: this.state.activeCollapse === index ? -1 : index,
      });
    };
    return (
      <div>
        {this.props.setDefaultValue.tool_id == 2 && (
          <LandingDemos setstep={this.props.setstep} extraData={{mainFormVals: this.props.setDefaultValue, setmainFormVals:  this.props.setmainFormVals}} />
        )}
        {this.props.setDefaultValue.tool_id != 2 && (
          <div className='stepOneInSteps position-relative'>
            <div className='stepsMainFlex d-flex justify-content-between align-items-center w-100 h-100'>
              <div className=''>
                <h1 className='stepsMainTitle mb-0'>Настройка формы</h1>
              </div>
              <div>
                <div className='d-flex align-items-center h-100 w-100'>
                  {/* <div className="mr-3">
                                            <p>Настройки формы</p>
                                        </div> */}
                  <div className=''>
                    <button
                      className={`site-button2 ${
                        this.state.stepTabs === "tabOne" ? "currentTab" : "fg"
                      }`}
                      onClick={() =>
                        this.setState({ stepTabs: ETabValue.tabOne })
                      }
                    >
                      Базовые
                    </button>
                    <button
                      className={`site-button2 ${
                        this.state.stepTabs === "tabTwo" ? "currentTab" : ""
                      }`}
                      onClick={() =>
                        this.setState({ stepTabs: ETabValue.tabTwo })
                      }
                    >
                      Продвинутые
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Formik
              // initialErrors={this.state.errors}
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async (values: any, { setErrors }: any) => {
                await this.handleSubmit(values, setErrors);
              }}
              // validationSchema={
              //     Yup.object().shape({
              //         themecolor: Yup.string(),
              //         region_id: Yup.array(),
              //         title: Yup.string(),
              //         help: Yup.string(),
              //         button: Yup.string(),
              //         choosecountry: Yup.string(),
              //         yourphone: Yup.string(),
              //         showdescription: Yup.string(),
              //         width: Yup.string(),
              //         minimumHeight: Yup.string(),
              //         topIndent: Yup.string(),
              //         bottomIndent: Yup.string(),
              //     })}
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

                // console.log(values);
                // console.log(errors);

                return (
                  <form onSubmit={handleSubmit}>
                    <div className=''>
                      <Row>
                        <Col md={7}>
                          <p className='justStepLabel'>Регион</p>

                          <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={this.state.region_id}
                            isMulti
                            value={this.state.region_id}
                            options={this.state.regions.map((o: any) => {
                              return {
                                value: o.id,
                                label: o.name,
                              };
                            })}
                            onChange={this.setMyRegions}
                          />
                        </Col>

                        <Col md={6} className='mt-4'>
                          <div className='switchToggleMain d-flex aling-items-center warning-text align-items-center flex-wrap'>
                            <div className='switchToggle'>
                              <input
                                type='checkbox'
                                id='switch12'
                                checked={this.state.showRegion === 1}
                                onChange={this.showCountryHandleChange}
                              />
                              <label htmlFor='switch12'>Toggle</label> &nbsp;
                            </div>
                            &nbsp; Показать регион
                          </div>
                        </Col>

                        <Col md={7}>
                          <h1 className='stepsMainTitle mb-0 mt-4'>
                            Структура
                          </h1>
                          <p className='justStepLabel mt-2'>Заголовок</p>
                          <input
                            type='text'
                            name='titleForm'
                            value={values.titleForm}
                            className={
                              "form-control " +
                              (touched.inputTitle && errors.inputTitle
                                ? "required"
                                : "")
                            }
                            onChange={handleChange}
                            // onChange={this.inputTitleChange}
                            onBlur={handleBlur}
                            placeholder='Заголовок'
                          />
                        </Col>
                        <Col md={6} className='mt-4'>
                          <div className='switchToggleMain d-flex aling-items-center warning-text align-items-center flex-wrap'>
                            <div className='switchToggle'>
                              <input
                                type='checkbox'
                                id='switch'
                                checked={this.state.showNameInput === 1}
                                onChange={this.showNameHandleChange}
                              />
                              <label htmlFor='switch'>Toggle</label> &nbsp;
                            </div>
                            &nbsp; Показать поле имя
                          </div>
                        </Col>
                        <Col md={6} className='mt-4'>
                          <div className='switchToggleMain d-flex aling-items-center warning-text align-items-center flex-wrap'>
                            <div className='switchToggle'>
                              <input
                                type='checkbox'
                                id='switch2'
                                checked={this.state.showDescriptionInput}
                                onChange={this.showDescriptionHandleChange}
                              />
                              <label htmlFor='switch2'>Toggle</label> &nbsp;
                            </div>
                            &nbsp; Показать поле описание
                          </div>
                        </Col>
                        {this.state.stepTabs === ETabValue.tabTwo ? (
                          <Col md={7} className='mt-4'>
                            <p className='justStepLabel mt-2'>Подсказка</p>
                            <input
                              type='text'
                              name='inputDescription'
                              value={this.state.inputDescription}
                              className={
                                "form-control " +
                                (touched.inputDescription &&
                                errors.inputDescription
                                  ? "required"
                                  : "")
                              }
                              onChange={this.inputDescriptionChange}
                              onBlur={handleBlur}
                              placeholder='Подсказка'
                            />
                          </Col>
                        ) : (
                          ""
                        )}
                        <Col md={7} className='mt-4'>
                          <p className='justStepLabel mt-2'>Кнопка</p>
                          <input
                            type='text'
                            name='buttonTitle'
                            value={values.buttonTitle}
                            className={
                              "form-control " +
                              (touched.inputBtn && errors.inputBtn
                                ? "required"
                                : "")
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Кнопка'
                          />
                        </Col>
                      </Row>
                      <h1 className='stepsMainTitle mb-0 mt-4'>Внешный вид</h1>
                      {this.state.stepTabs === ETabValue.tabOne ? (
                        <div>
                          <Row className='mt-3 chooseDirectionCardRow'>
                            <Col md={4} lg={3} xl={3}>
                              <label
                                className='radioLabel'
                                htmlFor='themecolor1'
                              >
                                <input
                                  type='radio'
                                  id='themecolor1'
                                  name='themecolor'
                                  value='red'
                                  checked={
                                    this.state.backgroundFormColor === "red"
                                  }
                                  className={
                                    "form-control chooseDirectionCard" +
                                    (touched.themecolor && errors.themecolor
                                      ? "required"
                                      : "")
                                  }
                                  onChange={this.colorHandleChange}
                                  onBlur={handleBlur}
                                />
                                <div className='chooseDirectionCardInput'>
                                  <div className='cardsColors d-flex align-items-center h-100 w-100'>
                                    <div className='redCard mr-2' />
                                    <p className='headingTitle'> Красная</p>
                                  </div>
                                </div>
                              </label>
                            </Col>
                            <Col md={4} lg={3} xl={3}>
                              <label
                                className='radioLabel'
                                htmlFor='themecolor'
                              >
                                <input
                                  type='radio'
                                  id='themecolor'
                                  name='themecolor'
                                  value='green'
                                  checked={
                                    this.state.backgroundFormColor === "green"
                                  }
                                  className={
                                    "form-control chooseDirectionCard" +
                                    (touched.themecolor && errors.themecolor
                                      ? "required"
                                      : "")
                                  }
                                  onChange={this.colorHandleChange}
                                  onBlur={handleBlur}
                                />
                                <div className='chooseDirectionCardInput'>
                                  <div className='cardsColors d-flex align-items-center h-100 w-100'>
                                    <div className='greenCard mr-2' />
                                    <p className='headingTitle'>Зеленая</p>
                                  </div>
                                </div>
                              </label>
                            </Col>
                            <Col md={4} lg={3} xl={3}>
                              <label
                                className='radioLabel'
                                htmlFor='themecolor3'
                              >
                                <input
                                  type='radio'
                                  id='themecolor3'
                                  name='themecolor'
                                  value='blue'
                                  checked={
                                    this.state.backgroundFormColor === "blue"
                                  }
                                  className={
                                    "form-control chooseDirectionCard" +
                                    (touched.themecolor && errors.themecolor
                                      ? "required"
                                      : "")
                                  }
                                  onChange={this.colorHandleChange}
                                  onBlur={handleBlur}
                                />
                                <div className='chooseDirectionCardInput'>
                                  <div className='cardsColors d-flex align-items-center h-100 w-100'>
                                    <div className='blueCard mr-2' />
                                    <p className='headingTitle'>Синяя</p>
                                  </div>
                                </div>
                              </label>
                            </Col>
                            <Col md={4} lg={3} xl={3}>
                              <label
                                className='radioLabel'
                                htmlFor='themecolor4'
                              >
                                <input
                                  type='radio'
                                  id='themecolor4'
                                  name='themecolor'
                                  value='transparent'
                                  checked={
                                    this.state.backgroundFormColor ===
                                    "transparent"
                                  }
                                  className={
                                    "form-control chooseDirectionCard" +
                                    (touched.themecolor && errors.themecolor
                                      ? "required"
                                      : "")
                                  }
                                  onChange={this.colorHandleChange}
                                  onBlur={handleBlur}
                                />
                                <div className='chooseDirectionCardInput'>
                                  <div className='cardsColors d-flex align-items-center h-100 w-100'>
                                    <div className='transparentCard mr-2' />
                                    <p className='headingTitle'>Прозрачная</p>
                                  </div>
                                </div>
                              </label>
                            </Col>

                            <Col md={12} className='mt-4'>
                              <div className='switchToggleMain d-flex aling-items-center warning-text align-items-center flex-wrap'>
                                <div className='switchToggle'>
                                  <input
                                    name='useTheme'
                                    type='checkbox'
                                    id='switch3'
                                    checked={this.state.showDefaultBackImage}
                                    onChange={this.setTheme}
                                  />
                                  <label htmlFor='switch3'>Toggle</label> &nbsp;
                                </div>
                                &nbsp; Использовать картинку темы
                              </div>
                            </Col>
                          </Row>
                          <div className='d-flex justify-content-between w-100 mt-5'>
                            <div className=''>
                              <button
                                className='site-button'
                                onClick={() => this.back(values)}
                              >
                                Назад
                              </button>
                            </div>
                            <div className=''>
                              <button className='site-button' type='submit'>
                                Далее
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : this.state.stepTabs === ETabValue.tabTwo ? (
                        <div>
                          <Row className='mt-3 chooseDirectionCardRow'>
                            <Col md={4} lg={3} xl={3}>
                              <p className='mt-3'>Цвет формы</p>
                              <label className='color-selector mt-2'>
                                <span
                                  className='circle'
                                  style={{
                                    background: this.state.backgroundColor,
                                  }}
                                />
                                <span>{this.state.backgroundColor}</span>
                                <input
                                  type='color'
                                  value={this.state.backgroundColor}
                                  onChange={this.colorHandleChange}
                                  className='hidden'
                                />
                              </label>
                            </Col>
                            <Col md={4} lg={3} xl={3}>
                              <p className='mt-3'>Цвет текст формы</p>
                              <label className='color-selector mt-2'>
                                <span
                                  className='circle'
                                  style={{
                                    background: this.state.formColor,
                                  }}
                                />
                                <span>{this.state.formColor}</span>
                                <input
                                  type='color'
                                  value={this.state.formColor}
                                  onChange={this.formColorHandleChange}
                                  className='hidden'
                                />
                              </label>
                            </Col>
                            <Col md={4} lg={3} xl={3}>
                              <p className='mt-3'>Цвет кнопки</p>
                              <label className='color-selector mt-2'>
                                <span
                                  className='circle'
                                  style={{
                                    background: this.state.btnBackgroundColor,
                                  }}
                                />
                                <span>{this.state.btnBackgroundColor}</span>
                                <input
                                  type='color'
                                  value={this.state.btnBackgroundColor}
                                  onChange={this.btnColorHandleChange}
                                  className='hidden'
                                />
                              </label>
                            </Col>
                            <Col md={12}>
                              <p className='mt-3'>Cсылка на свою картинку</p>
                              <input
                                type='text'
                                name='linkImage'
                                value={values.linkImage}
                                className={
                                  "form-control " +
                                  (touched.linkImage && errors.linkImage
                                    ? "required"
                                    : "")
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Cсылка на картинку'
                              />
                            </Col>
                            <Col md={4}>
                              <p className='mt-3'>Ширина</p>
                              <input
                                type='text'
                                name='width'
                                value={values.width}
                                className={"form-control"}
                                onChange={handleChange}
                                placeholder='Ширина'
                              />
                            </Col>
                            <Col md={4}>
                              <p className='mt-3'>Минимальная высота</p>
                              <input
                                type='text'
                                name='height'
                                value={values.height}
                                className={"form-control"}
                                onChange={handleChange}
                                placeholder='Высота'
                              />
                            </Col>
                            <Col md={4}>
                              <p className='mt-3'>Отступ сверху</p>
                              <input
                                type='text'
                                name='marginTop'
                                value={values.marginTop}
                                className={"form-control"}
                                onChange={handleChange}
                                placeholder='Отступ сверху'
                              />
                            </Col>
                            <Col md={4}>
                              <p className='mt-3'>Отступ снизу</p>
                              <input
                                type='text'
                                name='marginBottom'
                                value={values.marginBottom}
                                className={"form-control"}
                                onChange={handleChange}
                                placeholder='Отступ снизу'
                              />
                            </Col>
                          </Row>
                          <div className='d-flex justify-content-between w-100 mt-5'>
                            <div className=''>
                              <button
                                className='site-button'
                                onClick={this.back}
                              >
                                Назад
                              </button>
                            </div>
                            <div className=''>
                              <button className='site-button' type='submit'>
                                Далее
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        "1"
                      )}
                    </div>

                    {/*generatsiya bulgan forma*/}
                    <div className='backgroundChangerCard mt-5 position-relative'>
                      <div
                        className='backgroundChanger'
                        style={{
                          background: this.state.backgroundFormColor,
                        }}
                      />

                      {this.state.stepTabs !== ETabValue.tabTwo ? (
                        this.state.useTheme == true && (
                          <img
                            src={this.state.inputImgBazoviy}
                            className='img-fluid h-100 w-100'
                            alt=''
                          />
                        )
                      ) : (
                        <img
                          src={this.state.inputImg}
                          className='img-fluid h-100 w-100'
                          alt=''
                        />
                      )}

                      <div className='backgroundChangerInfos'>
                        <div className=''>
                          <div className=''>
                            <p
                              className='inputTitle'
                              style={{
                                color: this.state.formColorActive
                                  ? this.state.oldFormColor
                                  : this.state.formColor,
                              }}
                            >
                              {this.state.inputTitle}
                            </p>

                            {this.state.showCountry ? (
                              <select
                                name='choosecountry'
                                className={
                                  "form-control my-2" +
                                  (touched.choosecountry && errors.choosecountry
                                    ? "required"
                                    : "")
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value=''>Выберити свой город</option>
                                {this.state.selectRegions &&
                                  this.state.selectRegions.length > 0 &&
                                  this.state.selectRegions.map(
                                    (reg: any, i: number) => {
                                      console.log(this.state.selectRegions);
                                      return (
                                        <option key={i} value={reg.value}>
                                          {reg.label}
                                        </option>
                                      );
                                    }
                                  )}
                              </select>
                            ) : null}

                            {this.state.showName ? (
                              <input
                                type='text'
                                name='yourname'
                                value={values.yourname}
                                className={
                                  "form-control my-2 " +
                                  (touched.yourname && errors.yourname
                                    ? "required"
                                    : "")
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Ваше имя'
                              />
                            ) : null}

                            <input
                              type='text'
                              name='yourphone'
                              value={values.yourphone}
                              className={
                                "form-control  my-2" +
                                (touched.yourphone && errors.yourphone
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder='Ваш телефон'
                            />

                            {this.state.showDescription ? (
                              <textarea
                                name='showdescription'
                                value={values.showdescription}
                                className={
                                  "form-control my-2" +
                                  (touched.showdescription &&
                                  errors.showdescription
                                    ? "required"
                                    : "")
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={this.state.inputDescription}
                              />
                            ) : null}

                            <button
                              type='button'
                              className='site-button3 my-2'
                              style={{
                                background:
                                  this.state.stepTabs === ETabValue.tabTwo
                                    ? this.state.btnBackgroundColor
                                    : "white",
                                color:
                                  this.state.stepTabs === ETabValue.tabTwo
                                    ? this.state.formColorActive
                                      ? this.state.oldFormColor
                                      : this.state.formColor
                                    : "black",
                              }}
                            >
                              {this.state.inputBtn}
                            </button>

                            <p
                              className='site-button3-info'
                              style={{
                                width: "300px",
                                color: this.state.formColorActive
                                  ? this.state.oldFormColor
                                  : this.state.formColor,
                              }}
                            >
                              Оставляя зоявку вы соглашайтесь с политикой
                              конфиденциальности.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>

            <div className='backgroundChangerPosition'>
              <TabPane tabId={1}>
                <div
                  className={`faqCollapse col-lg-12 col-12 px-0 ${
                    this.state.activeCollapse === 1 ? "active-line" : ""
                  }`}
                >
                  <div
                    className='collapse-header'
                    onClick={() => changeActiveCollapse(1)}
                  >
                    <div
                      className={`faqCollapseFlex d-flex ${
                        this.state.activeCollapse === 1
                          ? "active-flex"
                          : "non-active-flex"
                      }`}
                    >
                      <div className='w-75'>
                        <p className='titleFaq mb-0'>Превю формы</p>
                      </div>
                      <div className='w-25 text-right ml-2'>
                        <span style={{ transform: "translate(0px,-1px)" }}>
                          {this.state.activeCollapse !== 1 ? (
                            <span className='plusMinus'>+</span>
                          ) : (
                            <span className='plusMinus'>-</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Collapse
                    isOpen={this.state.activeCollapse === 1}
                    className='collapseBody'
                  >
                    <Row>
                      <Col md={12}>
                        <Formik
                          // initialErrors={this.state.errors}
                          enableReinitialize={true}
                          initialValues={initialValues}
                          onSubmit={async (values: any, { setErrors }: any) => {
                            await this.handleSubmit(values, setErrors);
                          }}
                          validationSchema={Yup.object().shape({
                            themecolor: Yup.string().required(),
                            region_id: Yup.array(),
                            title: Yup.string().required(),
                            help: Yup.string().required(),
                            button: Yup.string().required(),
                            choosecountry: Yup.string().required(),
                            yourphone: Yup.string().required(),
                            showdescription: Yup.string().required(),
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
                                <div className='backgroundChangerCard2 position-relative'>
                                  <div
                                    className='backgroundChanger'
                                    style={{
                                      background: this.state.colorActive
                                        ? this.state.oldBackgroundColor
                                        : this.state.backgroundFormColor,
                                    }}
                                  />
                                  <img
                                    src={this.state.inputImg}
                                    className='backgroundChangerImg'
                                    alt=''
                                  />
                                  <div className='backgroundChangerInfos'>
                                    <div className=''>
                                      <div className=''>
                                        <p
                                          className='inputTitle'
                                          style={{
                                            color: this.state.formColorActive
                                              ? this.state.oldFormColor
                                              : this.state.formColor,
                                          }}
                                        >
                                          {this.state.inputTitle}
                                        </p>

                                        {this.state.showCountry ? (
                                          <select
                                            value={values.choosecountry}
                                            name='choosecountry'
                                            className={
                                              "form-control my-2" +
                                              (touched.choosecountry &&
                                              errors.choosecountry
                                                ? "required"
                                                : "")
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          >
                                            <option value=''>
                                              Выберити свой город
                                            </option>
                                          </select>
                                        ) : null}

                                        {this.state.showName ? (
                                          <input
                                            type='text'
                                            name='yourname'
                                            value={values.yourname}
                                            className={
                                              "form-control my-2 " +
                                              (touched.yourname &&
                                              errors.yourname
                                                ? "required"
                                                : "")
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Ваше имя'
                                          />
                                        ) : null}

                                        <input
                                          type='text'
                                          name='yourphone'
                                          value={values.yourphone}
                                          className={
                                            "form-control  my-2" +
                                            (touched.yourphone &&
                                            errors.yourphone
                                              ? "required"
                                              : "")
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder='Ваш телефон'
                                        />

                                        {this.state.showDescription ? (
                                          <textarea
                                            name='showdescription'
                                            value={values.showdescription}
                                            className={
                                              "form-control my-2" +
                                              (touched.showdescription &&
                                              errors.showdescription
                                                ? "required"
                                                : "")
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder={
                                              this.state.inputDescription
                                            }
                                          />
                                        ) : null}

                                        <button
                                          type='button'
                                          className='site-button3 my-2'
                                          style={{
                                            background: this.state
                                              .btnBackgroundColor,
                                            color: this.state.formColorActive
                                              ? this.state.oldFormColor
                                              : this.state.formColor,
                                          }}
                                        >
                                          {this.state.inputBtn}
                                        </button>

                                        <p
                                          className='site-button3-info'
                                          style={{
                                            width: "250px",
                                            color: this.state.formColorActive
                                              ? this.state.oldFormColor
                                              : this.state.formColor,
                                          }}
                                        >
                                          Оставляя зоявку вы соглашайтесь с
                                          политикой конфиденциальности.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            );
                          }}
                        </Formik>
                      </Col>
                    </Row>
                  </Collapse>
                </div>
              </TabPane>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default StepThree;
