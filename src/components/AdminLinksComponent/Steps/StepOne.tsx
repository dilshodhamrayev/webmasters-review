import React, { Component } from "react";
import "./steps.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, Col, Row } from "reactstrap";
import Axios from "axios";
import configApi from "../../../utils/configApi";

class StepOne extends Component<any, any> {
    private _isUnmounted: boolean = false;

    public state: any = {
        directions: [],
        scenarios: [],
        offers: [],
    };

    componentDidMount() {
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

        Axios.post(`${configApi.api}/universal/get-offers`).then((res) => {
            if (!this._isUnmounted) {
                this.setState({
                    offers: res.data,
                });
            }
        });
    }

    async handleSubmit(values: any, setErrors: any) {
        console.log(values);

        this.props.setMainValue(values);
        this.props.nextStep();
    }

    render() {
        // console.log(this.props);

        let initialValues;
        // optimallahtirish kerak.
        console.log(this.props.setDefaultValue);
        initialValues = {
            streamName: this.props.setDefaultValue.streamName,
            direction_id: this.props.setDefaultValue.direction_id,
            offer_id: this.props.setDefaultValue.offer_id,
            scenarios_id: this.props.setDefaultValue.scenarios_id,
        };

        return (
            <div className='stepOneInSteps'>

                <h1 className='stepsMainTitle'>Настройка оффера</h1>
                <Formik
                    // initialErrors={this.state.errors}
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={async (values: any, { setErrors }: any) => {
                        await this.handleSubmit(values, setErrors);
                    }}
                    validationSchema={Yup.object().shape({
                        streamName: Yup.string().required(),
                        direction_id: Yup.number().required(),
                        offer_id: Yup.number().required(),
                        scenarios_id: Yup.number().required(),
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
                                <Row>
                                    <Col md={12}>
                                        <p className='justStepLabel'>Название потока</p>
                                        <input
                                            type='text'
                                            name='streamName'
                                            value={values.streamName}
                                            className={
                                                "form-control " +
                                                (touched.streamName && errors.streamName
                                                    ? "required"
                                                    : "")
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Название потока'
                                        />
                                    </Col>
                                </Row>
                                <Row className='mt-3 chooseDirectionCardRow'>
                                    <Col md={12}>
                                        <p className='justStepLabel'>Выбор направления</p>
                                    </Col>

                                    {this.state.directions &&
                                        this.state.directions.length > 0 &&
                                        this.state.directions.map((dir: any, i: number) => {
                                            return (
                                                <Col md={4} key={i}>
                                                    <label
                                                        className='radioLabel'
                                                        htmlFor={`choosedirection1${i}`}
                                                    >
                                                        <input
                                                            type='radio'
                                                            id={`choosedirection1${i}`}
                                                            name='direction_id'
                                                            value={dir.id}
                                                            defaultChecked={
                                                                this.props.setDefaultValue
                                                                    ?.direction_id &&
                                                                this.props.setDefaultValue
                                                                    ?.direction_id == dir.id &&
                                                                this.props.setDefaultValue
                                                                    ?.direction_id == values?.direction_id
                                                            }
                                                            className={
                                                                "form-control chooseDirectionCard " +
                                                                (touched.direction_id &&
                                                                    errors.direction_id
                                                                    ? "required"
                                                                    : "")
                                                            }
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />

                                                        <div className='chooseDirectionCardInput'>
                                                            <p className='headingTitle'>{dir.name}</p>
                                                        </div>
                                                    </label>
                                                </Col>
                                            );
                                        })}
                                </Row>

                                <Row className='mt-3 chooseDirectionCardRow'>
                                    <Col md={12}>
                                        <p className='justStepLabel'>Выбор оффера</p>
                                    </Col>

                                    {this.state.offers &&
                                        this.state.offers.length > 0 &&
                                        this.state.offers.map((off: any, i: number) => {
                                            return (
                                                <Col md={4} key={i}>
                                                    <label
                                                        className='radioLabel'
                                                        htmlFor={`chooseoffer1${i}`}
                                                    >
                                                        <input
                                                            type='radio'
                                                            id={`chooseoffer1${i}`}
                                                            name='offer_id'
                                                            value={off.id}
                                                            defaultChecked={
                                                                this.props.setDefaultValue?.offer_id &&
                                                                this.props.setDefaultValue?.offer_id ==
                                                                off.id &&
                                                                this.props.setDefaultValue?.offer_id ==
                                                                values.offer_id
                                                            }
                                                            className={
                                                                "form-control chooseDirectionCard " +
                                                                (touched.offer_id && errors.offer_id
                                                                    ? "required"
                                                                    : "")
                                                            }
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <div className='chooseDirectionCardInput'>
                                                            <p className='headingTitle'>{off.name}</p>
                                                        </div>
                                                    </label>
                                                </Col>
                                            );
                                        })}
                                </Row>

                                <Row className='mt-3 chooseDirectionCardRow'>
                                    <Col md={12}>
                                        <p className='justStepLabel'>
                                            Выбор сценария обработки лида
                          </p>
                                    </Col>
                                    {this.state.scenarios &&
                                        this.state.scenarios.length > 0 &&
                                        this.state.scenarios.map((scenar: any, i: number) => {
                                            return (
                                                <Col md={4} key={i}>
                                                    <label
                                                        className='radioLabel'
                                                        htmlFor={`selectingscenarios_id${i}`}
                                                    >
                                                        <input
                                                            type='radio'
                                                            id={`selectingscenarios_id${i}`}
                                                            name='scenarios_id'
                                                            value={scenar.id}
                                                            defaultChecked={
                                                                this.props.setDefaultValue
                                                                    ?.scenarios_id &&
                                                                this.props.setDefaultValue.scenarios_id ==
                                                                scenar.id &&
                                                                this.props.setDefaultValue
                                                                    ?.scenarios_id == values?.scenarios_id
                                                            }
                                                            className={
                                                                "form-control chooseDirectionCard " +
                                                                (touched?.scenarios_id &&
                                                                    errors?.scenarios_id
                                                                    ? "required"
                                                                    : "")
                                                            }
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <div className='chooseDirectionCardInput'>
                                                            <p className='headingTitle'>
                                                                {scenar.name}
                                                            </p>
                                                        </div>
                                                    </label>
                                                </Col>
                                            );
                                        })}
                                </Row>

                                <div className='d-flex justify-content-end w-100 mt-5'>
                                    <div className=''>
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

export default StepOne;
