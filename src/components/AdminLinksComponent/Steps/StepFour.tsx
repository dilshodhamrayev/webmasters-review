import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import configApi from "../../../utils/configApi";
import { NavLink } from "react-router-dom";
import LandingSettings from "./Landing/LandingSettings";

class StepFour extends Component<any, any> {
  private _isUnmounted: boolean = false;
  componentWillUnmount() {
    this._isUnmounted = true;
  }

  continue = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    this.props.nextStep();
  };

  back = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    if (this.props.setDefaultValue.tool_id === "3") {
      this.props.setstep(2);
    } else {
      this.props.prevStep();
    }
  };

  async handleSubmit(values: any, setErrors: any) {}
  render() {
    let initialValues = {
      choosetools: "",
      subit1: "",
      subit2: "",
      subit3: "",
      code: this.props.setDefaultValue.formCode?.render,
    };
    return (
      <div>
        {this.props.setDefaultValue.tool_id == 2 && (
          <LandingSettings
            setmainFormVals={this.props.setmainFormVals}
            mainFormVals={this.props.setDefaultValue}
            setstep={this.props.setstep}
          />
        )}
        {this.props.setDefaultValue.tool_id != 2 && (
          <div className='stepOneInSteps'>
            <Formik
              // initialErrors={this.state.errors}
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async (values: any, { setErrors }: any) => {
                await this.handleSubmit(values, setErrors);
              }}
              validationSchema={Yup.object().shape({
                choosetools: Yup.string(),
                code: Yup.string(),
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
                    <Row className='mt-3 chooseDirectionCardRow'>
                      <Col md={12}>
                        <p className='mt-3 mb-2'>
                          Скопируйте код расположенный ниже, и вставти в то
                          месте, где должно быть форма
                        </p>
                        <textarea
                          name='code'
                          readOnly={true}
                          value={values.code}
                          className={
                            "form-control " +
                            (touched.code && errors.code ? "required" : "")
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ height: "300px" }}
                          placeholder='Код'
                        />
                      </Col>
                    </Row>

                    <div className='d-flex justify-content-between w-100 mt-5'>
                      <div className=''>
                        <button className='site-button' onClick={this.back}>
                          Назад
                        </button>
                      </div>
                      <div className=''>
                        <NavLink
                          to='/dashboard/mystreams'
                          className='site-button px-3'
                        >
                          Вернуться к списку
                        </NavLink>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    );
  }
}

export default StepFour;
