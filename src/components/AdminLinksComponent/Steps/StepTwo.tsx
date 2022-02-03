import React, { Component } from "react";
import * as Yup from "yup";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Formik } from "formik";
import "./steps.scss";
import Axios from "axios";
import configApi from "../../../utils/configApi";

class StepTwo extends Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    tools: [
      { id: 1, name: "Конструктор форм" },
      { id: 2, name: "Лендинги" },
      { id: 3, name: "Сайт в системе" },
    ],
  };

  back = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    this.props.prevStep();
  };

  async handleSubmit(values: any, setErrors: any) {
    this.props.setMainValue(values);
    console.log(values);
    if (values.tool_id == 3) {
      this.props.setstep(4);
    } else {
      this.props.nextStep();
    }
  }

  render() {
    let initialValues;

    if (this.props.setDefaultValue.tool_id) {
      initialValues = {
        tool_id: this.props.setDefaultValue.tool_id,
      };
    } else {
      initialValues = {
        tool_id: "",
      };
    }

    return (
      <div className='stepOneInSteps'>
        <h1 className='stepsMainTitle'>Выбор инструмента</h1>
        <Formik
          // initialErrors={this.state.errors}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={async (values: any, { setErrors }: any) => {
            await this.handleSubmit(values, setErrors);
          }}
          validationSchema={Yup.object().shape({
            tool_id: Yup.number().required(),
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
            // console.log(errors);

            return (
              <form onSubmit={handleSubmit}>
                <Row className='mt-3 chooseDirectionCardRow'>
                  {this.state.tools &&
                    this.state.tools.length > 0 &&
                    this.state.tools.map((too: any, i: number) => {
                      return (
                        <Col md={4} key={i}>
                          <label
                            className='radioLabel'
                            htmlFor={`choosetools1${i}`}
                          >
                            <input
                              type='radio'
                              id={`choosetools1${i}`}
                              name='tool_id'
                              value={too.id}
                              defaultChecked={
                                this.props.setDefaultValue.tool_id &&
                                this.props.setDefaultValue.tool_id == too.id &&
                                this.props.setDefaultValue.tool_id ==
                                  values.tool_id
                              }
                              className={
                                "form-control chooseDirectionCard " +
                                (touched.tool_id && errors.tool_id
                                  ? "required"
                                  : "")
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className='chooseDirectionCardInput'>
                              <p className='headingTitle'>{too.name}</p>
                            </div>
                          </label>
                        </Col>
                      );
                    })}
                </Row>

                <div
                  style={{ flexWrap: "wrap" }}
                  className=' d-flex justify-content-between w-100 mt-5'
                >
                  <div
                    className='step_two_btn'
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <button className='site-button' onClick={this.back}>
                      Назад
                    </button>
                  </div>
                  <div
                    className='step_two_btn'
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <button className='site-button' type='submit'>
                      Далее
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default StepTwo;
