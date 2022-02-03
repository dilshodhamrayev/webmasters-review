import React, { Component } from "react";
import "./creatives.scss";
import { Link } from "react-router-dom";
// @ts-ignore
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
import { connect } from "react-redux";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Axios from "axios";
import configApi from "../../../utils/configApi";
import { arrayToFormData } from "../../../utils/helpers";
import { Formik } from "formik";
import * as Yup from "yup";

enum EButtonType {
  create = 1,
}

class DashboardCreatives extends Component {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    file: null,
    visible: true,
    showModal: false,
    creatives: [],

    offer: [],
    type: [],
    size: [],
    social: [],

    selectOffer: [],
    selectType: [],
    selectSize: [],
    selectSocial: [],

    selectedId: undefined,
    imageInput: null,
    uploadImageFile: null,
  };

  constructor(e: any = null) {
    super(e);
    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ ...this.state, showModal: !this.state.showModal });
  }

  handleChange(event: any) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
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
        Axios.post(`${configApi.api}/universal/creatives`).then((res) => {
          if (!this._isUnmounted) {
            this.setState({
              creatives: res.data,
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
          offer: [...res.data],
        });
      }
    });
    Axios.post(`${configApi.api}/universal/size-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          size: [...res.data],
        });
      }
    });
    Axios.post(`${configApi.api}/universal/type-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          type: [...res.data],
        });
      }
    });
    Axios.post(`${configApi.api}/universal/social-list`).then((res) => {
      if (!this._isUnmounted) {
        this.setState({
          social: [...res.data],
        });
      }
    });
  }

  filterCreatives() {
    let url = `${configApi.api}/universal/filter-creative`;
    let data = {};

    if (this.state.selectOffer && this.state.selectOffer.length > 0) {
      data = {
        offer: this.state.selectOffer,
      };
    }

    if (this.state.selectType && this.state.selectType.length > 0) {
      data = {
        ...data,
        type: this.state.selectType,
      };
    }

    if (this.state.selectSize && this.state.selectSize.length > 0) {
      data = {
        ...data,
        size: this.state.selectSize,
      };
    }

    if (this.state.selectSocial && this.state.selectSocial.length > 0) {
      data = {
        ...data,
        social: this.state.selectSocial,
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
              creatives: res.data,
              isLoading: false,
            });
          }
        );
      }
    });
  }

  selectOfferChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectOffer: [],
        },
        () => {
          _this.filterCreatives();
        }
      );
    } else {
      this.setState(
        {
          selectOffer: [parseInt(e)],
        },
        () => {
          _this.filterCreatives();
        }
      );
    }
  }

  selectTypeChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectType: [],
        },
        () => {
          _this.filterCreatives();
        }
      );
    } else {
      this.setState(
        {
          selectType: [parseInt(e)],
        },
        () => {
          _this.filterCreatives();
        }
      );
    }
  }

  selectSizeChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectSize: [],
        },
        () => {
          _this.filterCreatives();
        }
      );
    } else {
      this.setState(
        {
          selectSize: [parseInt(e)],
        },
        () => {
          _this.filterCreatives();
        }
      );
    }
  }

  selectSocialChange(e: any) {
    let _this = this;

    if (isNaN(e) || e == null) {
      this.setState(
        {
          selectSocial: [],
        },
        () => {
          _this.filterCreatives();
        }
      );
    } else {
      this.setState(
        {
          selectSocial: [parseInt(e)],
        },
        () => {
          _this.filterCreatives();
        }
      );
    }
  }

  clearState() {
    this.setState(
      {
        selectOffer: [],
        selectType: [],
        selectSize: [],
        selectSocial: [],
      },
      () => {
        this.filterCreatives();
      }
    );
  }

  render() {
    // @ts-ignore
    const { showModal, dispatch, currentItem } = this.props;

    const PhotoItem = ({ image, title, creativeGalleryBack }: any) => (
      <div>
        <LightgalleryItem group="any" src={image}>
          <img src={image} className="creativeGalleryImg" alt="" />
          <div className="">{title}</div>
          <div className="">{creativeGalleryBack}</div>
        </LightgalleryItem>
      </div>
    );

    const handleSubmit = (values: any, setErrors: any) => {
      let formData = arrayToFormData(values);

      this.setState(
        {
          isLoading: true,
        },
        async () => {
          Axios.post(
            `${configApi.api}/universal/creative-create`,
            formData
          ).then((response) => {
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
                this.setState({ ...this.state, showModal: false });
                Axios.post(`${configApi.api}/universal/creatives`).then(
                  (res) => {
                    if (!this._isUnmounted) {
                      this.setState({
                        creatives: res.data,
                        isLoading: false,
                      });
                    }
                  }
                );
              }
            }
          });
        }
      );
    };

    const handleFile = (
      file: any,
      setFieldValue: any,
      setFieldTouched: any,
      setFieldError: any,
      setErrors: any
    ) => {
      var fr = new FileReader();

      let _this = this;

      fr.onload = function () {
        // file is loaded
        var img: any = new Image();

        img.onload = function () {
          setFieldTouched("image", true);
          setFieldValue("image", file);

          if (
            file &&
            [
              "image/jpg",
              "image/jpeg",
              "image/gif",
              "image/webp",
              "image/png",
            ].includes(file.type)
          ) {
            _this.setState({
              uploadImageFile: file,
              url: URL.createObjectURL(file),
            });
          }
        };
        img.src = fr.result; // is the data URL because called with readAsDataURL
      };
      fr.readAsDataURL(file);
    };

    let initialValues = {
      title: "",
      image: "",
      social_id: "",
      size_id: "",
      type_id: "",
      offer_id: "",
    };

    const openModal = (item: any) => {
      dispatch({
        type: "updateState",
        payload: {
          showModal: !showModal,
          currentItem: item,
        },
      });
    };

    return (
      <div className="dashboardCreativesSection">
        <div className="d-flex w-100 flex-wrap">
          <ul className="breadcrumbs d-flex w-100">
            <li>
              <Link to="/dashboard">Главная</Link>
            </li>
            <li>
              <Link to="/dashboard/creatives">Креативы</Link>
            </li>
          </ul>
        </div>

        <div className="dashboardCreativesMain mt-3">
          <div className="creativeMainHeaderFlex">
            <div className="creativeMainHeaderFlexSUB">
              <form>
                <div className="creativeMainHeaderFlex2">
                  <div className="item">
                    <p className="title mb-0">Выбор креатива</p>
                  </div>
                  <div className="item">
                    <select
                      name="offer_id"
                      onChange={(e: any) => {
                        this.selectOfferChange(
                          e.target.value ? e.target.value : null
                        );
                      }}
                    >
                      <option value="">Оффер</option>
                      {this.state.offer.length > 0 &&
                        this.state.offer.map((typeCreative: any, i: number) => {
                          return (
                            <option key={i} value={typeCreative.id}>
                              {typeCreative.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="item">
                    <select
                      name="type_id"
                      onChange={(e: any) => {
                        this.selectTypeChange(
                          e.target.value ? e.target.value : null
                        );
                      }}
                    >
                      <option value="">Тип</option>
                      {this.state.type.length > 0 &&
                        this.state.type.map((typeCreative: any, i: number) => {
                          return (
                            <option key={i} value={typeCreative.id}>
                              {typeCreative.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="item">
                    <select
                      name="size_id"
                      onChange={(e: any) => {
                        this.selectSizeChange(
                          e.target.value ? e.target.value : null
                        );
                      }}
                    >
                      <option value="">Размер</option>
                      {this.state.size.length > 0 &&
                        this.state.size.map((typeCreative: any, i: number) => {
                          return (
                            <option key={i} value={typeCreative.id}>
                              {typeCreative.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="item">
                    <select
                      name="social_id"
                      onChange={(e: any) => {
                        this.selectSocialChange(
                          e.target.value ? e.target.value : null
                        );
                      }}
                    >
                      <option value="">Соц. сети</option>
                      {this.state.social.length > 0 &&
                        this.state.social.map(
                          (typeCreative: any, i: number) => {
                            return (
                              <option key={i} value={typeCreative.id}>
                                {typeCreative.name}
                              </option>
                            );
                          }
                        )}
                    </select>
                  </div>
                  <div className="item">
                    <img
                      src="/assets/svg/refresh2.svg"
                      alt=""
                      style={{ cursor: "pointer" }}
                      onClick={this.clearState}
                    />
                  </div>
                </div>
              </form>
            </div>
            {/* () => this.setstate({...this.state, this.state.showModal: true}) */}
            <div className="">
              <button
                className="site-button"
                onClick={() =>
                  this.setState({ ...this.state, showModal: true })
                }
              >
                создать креатив
              </button>
            </div>
          </div>

          <div className="mt-5">
            <div className="">
              {this.state.visible ? (
                <LightgalleryProvider>
                  <div className="creativeGalleryGridContainer">
                    {this.state.creatives.length > 0
                      ? this.state.creatives.map((p: any, i: any) => (
                          <div className="creativeGalleryGridItem" key={i}>
                            <PhotoItem
                              key={i}
                              image={p.path}
                              title={
                                <div className="galleryTexts">
                                  <div className="d-flex flex-column justify-content-center align-content-center h-100 w-100">
                                    <div className="">
                                      <img
                                        src="/assets/img/creative%20search.svg"
                                        className="creativeGalleryImgSearch img-fluid"
                                        alt=""
                                      />
                                    </div>
                                    <div className="mt-2">{p.title}</div>
                                  </div>
                                </div>
                              }
                              creativeGalleryBack={
                                <div className="creativeGalleryBack" />
                              }
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </LightgalleryProvider>
              ) : null}
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>
            {currentItem ? "Редактировать креатив" : "Создать креатив"}
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
                title: Yup.string().required(),
                image: Yup.mixed()
                  .test("fileFormat", "image only", (value: any) => {
                    return (
                      !value ||
                      (value &&
                        [
                          "image/jpg",
                          "image/jpeg",
                          "image/gif",
                          "image/webp",
                          "image/png",
                        ].includes(value.type))
                    );
                  })
                  .required(),
                social_id: Yup.number().required(),
                size_id: Yup.number().required(),
                type_id: Yup.number().required(),
                offer_id: Yup.number().required(),
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
                  setFieldValue,
                  setFieldTouched,
                  setErrors,
                  setFieldError,
                } = props;

                return (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col
                        md={12}
                        lg={4}
                        xl={4}
                        className="dashboardContentFormColTwo"
                      >
                        <div className="advert-right">
                          <div
                            className="dropzone"
                            id="drop-area"
                            onDrop={(e: any) => {
                              e.preventDefault();
                              e.stopPropagation();

                              let dt = e.dataTransfer;
                              let files = dt.files;

                              handleFile(
                                files[0],
                                setFieldValue,
                                setFieldTouched,
                                setFieldError,
                                setErrors
                              );
                            }}
                          >
                            <div className="dz-default dz-message">
                              <div className="upload_file">
                                {this.state.uploadImageFile ? (
                                  <img
                                    className="img-fluid formColTwoImg"
                                    src={this.state.url}
                                    style={{ height: "200px" }}
                                    alt={
                                      this.state.uploadImageFile &&
                                      this.state.uploadImageFile.name
                                    }
                                  />
                                ) : (
                                  <div className="formColTwoImgContent">
                                    <div className="formColTwoImgContentSub">
                                      <p className="formColTwoImgContentText mb-0">
                                        Создать креатив
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="formFileContent">
                                  <label>
                                    {" "}
                                    Загрузить
                                    <input
                                      type="file"
                                      onClick={(e: any) => {
                                        e.preventDefault();
                                        this.state.imageInput.click();
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="fallback d-none" id="myId">
                              <input
                                type="file"
                                accept="image/*"
                                name="logo"
                                onChange={(e: any) => {
                                  handleFile(
                                    e.target.files[0],
                                    setFieldValue,
                                    setFieldTouched,
                                    setFieldError,
                                    setErrors
                                  );
                                }}
                                ref={(input) => (this.state.imageInput = input)}
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={12} lg={8} xl={8} className="">
                        <Row>
                          <Col md={12}>
                            <label>Название</label>
                            <input
                              type="text"
                              name="title"
                              value={values.title}
                              className={
                                "form-control " +
                                (touched.title && errors.title
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Название"
                            />
                            {errors.title && touched.title ? (
                              <div className="text-danger">
                                Поле должно быть заполнено
                              </div>
                            ) : null}
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <label>Офферы</label>
                            <select
                              value={values.offer_id}
                              name="offer_id"
                              className={
                                "form-control " +
                                (touched.offer_id && errors.offer_id
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Офферы</option>
                              {this.state.offer.length > 0 &&
                                this.state.offer.map(
                                  (typeCreative: any, i: number) => {
                                    return (
                                      <option key={i} value={typeCreative.id}>
                                        {typeCreative.name}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <label>Тип</label>
                            <select
                              value={values.type_id}
                              name="type_id"
                              className={
                                "form-control " +
                                (touched.type_id && errors.type_id
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Тип</option>
                              {this.state.type.length > 0 &&
                                this.state.type.map(
                                  (typeCreative: any, i: number) => {
                                    return (
                                      <option key={i} value={typeCreative.id}>
                                        {typeCreative.name}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <label>Размер</label>
                            <select
                              value={values.size_id}
                              name="size_id"
                              className={
                                "form-control " +
                                (touched.size_id && errors.size_id
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Размер</option>
                              {this.state.size.length > 0 &&
                                this.state.size.map(
                                  (typeCreative: any, i: number) => {
                                    return (
                                      <option key={i} value={typeCreative.id}>
                                        {typeCreative.name}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <label>Соц. сети</label>
                            <select
                              value={values.social_id}
                              name="social_id"
                              className={
                                "form-control " +
                                (touched.social_id && errors.social_id
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Соц. сети</option>
                              {this.state.social.length > 0 &&
                                this.state.social.map(
                                  (typeCreative: any, i: number) => {
                                    return (
                                      <option key={i} value={typeCreative.id}>
                                        {typeCreative.name}
                                      </option>
                                    );
                                  }
                                )}
                            </select>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end w-100">
                      <div className="">
                        <button
                          type="submit"
                          className="site-button py-2"
                          color=""
                        >
                          Создать
                        </button>
                        <button
                          className="site-button py-2"
                          type="button"
                          color=""
                          onClick={this.toggleModal}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// @ts-ignore
export default DashboardCreatives;
