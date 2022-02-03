import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Axios from 'axios';
import {Card, Col, Collapse, Row, TabPane} from "reactstrap";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import configApi from '../../../../utils/configApi';
import moment from 'moment';

const DashboardOffersDetails  = (props:any) => {
    
    const { id }:any = useParams();
    const [offers, setOffers] = useState<any>({}); 
    const [activeCollapse, setActiveCollapse] = useState<number>();
    const getOffers = async () => {
        let url:string
            try {
                id ? url = `?stream_id=${id}` : url = "";
                let res = await Axios.get(`${configApi.api}/universal/get-offer?id=${id}`); 
                 if (res.data) {
                     setOffers(res.data);
                 }
            } catch (e) {
                    console.log(e);
            } 
    }

    useEffect(() => {
        getOffers();
    }, [])

        const changeActiveCollapse = (index: any) => {
            setActiveCollapse(activeCollapse === index ? -1 : index);
        };

        const offersDetail = [
            {
                imgFlag: <img src="/assets/img/offersDetailFlag1.png" alt=""/>,
                flagNumber: "39",
                euroNumber: "24",
                euro: <img src="/assets/img/euro.svg" alt=""/>,
            },
            {
                imgFlag: <img src="/assets/img/offersDetailFlag2.png" alt=""/>,
                flagNumber: "89",
                euroNumber: "32",
                euro: <img src="/assets/img/euro.svg" alt=""/>,
            },
            {
                imgFlag: <img src="/assets/img/offersDetailFlag3.png" alt=""/>,
                flagNumber: "87",
                euroNumber: "22",
                euro: <img src="/assets/img/euro.svg" alt=""/>,
            },
            {
                imgFlag: <img src="/assets/img/offersDetailFlag4.png" alt=""/>,
                flagNumber: "67",
                euroNumber: "25",
                euro: <img src="/assets/img/euro.svg" alt=""/>,
            },
        ];
        const topSourcesData = [
            {
                imgFlag: <img src="/assets/svg/facebook.svg" alt=""/>,
                flagNumber: "Facebook",
            },
        ];
        const workGraphicData = [
            {
                imgFlag: <img src="/assets/img/offersDetailFlag1.png" alt=""/>,
                text: "9 am - 8 pm по местному времени",
            },
            {
                imgFlag: <img src="/assets/img/offersDetailFlag2.png" alt=""/>,
                text: "8 am - 8 pm по местному времени",
            },
            {
                imgFlag: <img src="/assets/img/offersDetailFlag3.png" alt=""/>,
                text: "8 am - 8 pm по местному времени",
            },
        ];
        // const getLinksData = [
        //     {
        //         label: "Главный",
        //         lineText: "0"
        //     },
        //     {
        //         label: "Landing PL",
        //         lineText: "0"
        //     },
        //     {
        //         label: "Лент IT (мобильный)",
        //         lineText: "0"
        //     },
        // ];
        const domainFaqs = [
            {
                title: "Постебки",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et facilis inventore magni molestias,\n" +
                    "mollitia nostrum! Distinctio, optio perspiciatis! Aliquid animi consequuntur ea eaque esse natus\n" +
                    "nesciunt obcaecati quae quas.",
            },
            {
                title: "Субаккаунты",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et facilis inventore magni molestias,\n" +
                    "mollitia nostrum! Distinctio, optio perspiciatis! Aliquid animi consequuntur ea eaque esse natus\n" +
                    "nesciunt obcaecati quae quas.",
            },
            {
                title: "Вставка кода",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et facilis inventore magni molestias,\n" +
                    "mollitia nostrum! Distinctio, optio perspiciatis! Aliquid animi consequuntur ea eaque esse natus\n" +
                    "nesciunt obcaecati quae quas.",
            },
            {
                title: "Парковка домена",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error et facilis inventore magni molestias,\n" +
                    "mollitia nostrum! Distinctio, optio perspiciatis! Aliquid animi consequuntur ea eaque esse natus\n" +
                    "nesciunt obcaecati quae quas.",
            },
        ];
        // const checkBoxLimitData = [
        //     {
        //         labelCheckBox: "Москва",
        //     },
        //     {
        //         labelCheckBox: "Санкт-Петербург"
        //     },
        //     {
        //         labelCheckBox: "Новосибирск"
        //     },
        //     {
        //         labelCheckBox: "Екатеринбург"
        //     },
        //     {
        //         labelCheckBox: "Нижний"
        //     },
        //     {
        //         labelCheckBox: "Новгород"
        //     },
        //     {
        //         labelCheckBox: "Казань"
        //     },
        //     {
        //         labelCheckBox: "Челябинск"
        //     },
        //     {
        //         labelCheckBox: "Омск"
        //     },
        //     {
        //         labelCheckBox: "Самара"
        //     },
        //     {
        //         labelCheckBox: "Ростов-на-Дону"
        //     },
        //     {
        //         labelCheckBox: "Уфа"
        //     },
        //     {
        //         labelCheckBox: "Красноярск"
        //     },
        //     {
        //         labelCheckBox: "Пермь"
        //     },
        //     {
        //         labelCheckBox: "Воронеж"
        //     },
        //     {
        //         labelCheckBox: "Волгоград"
        //     },
        // ];
        let date;
        let formattedDate;
        let fromDate;
        if (offers.hold) {
            date = offers.hold[0].value.split(" ");
            formattedDate = parseInt(date[0])/24;
            if (formattedDate >= 1) {
                formattedDate = formattedDate.toFixed(0);
                fromDate = moment().subtract(formattedDate, 'days').calendar();
            } else {
                fromDate = null;
            }
        }

        return (
            <div>
                {/*Offer Details Links*/}
                {!offers ? null : (
                <>
                <div className="d-flex w-100 flex-wrap">
                    <ul className="breadcrumbs d-flex w-100">
                        <li><Link to="/dashboard">Главная</Link></li>
                        <li><Link to="/dashboard/offers">Офферы</Link></li>
                        <li><Link to="/dashboard/offersDetail">{offers.name}</Link></li>
                    </ul>
                </div>

                <div className="container-fluid dashboardOffersDetailsMain">
                    {/*Offer Details Main Code Section*/}
                    <div className="row">
                        <div className="col-md-2 mt-3 offersDetailsRowOneCol1">
                            <img src={offers.path} alt=""/>
                        </div>
                        <div className="col-md-7 mt-3 offersDetailsRowOneCol2">
                            <div className="rowOneCol2Flex row m-0 pt-3">
                                <div className="col-md-7 rowOneCol2Flex1">
                                    <p className="rowOneCol2FlexText1">{offers.sub_description}</p>
                                    <p className="rowOneCol2FlexText2">Активен</p>
                                    <p className="rowOneCol2FlexText1">
                                        <span> {formattedDate >= 1 ? "Запущен: " + formattedDate + " дней назад " : null}
                                          {fromDate ? moment(fromDate).format('DD.MM.YYYY') : null} </span> 
                                    </p>
                                    <p className="rowOneCol2FlexText1">
                                        <span>Сейчас льют:</span> много Facebook
                                    </p>
                                    <button className="rowOneCol2FlexBtn mr-2">
                                        ВОРДСТАТ
                                    </button>
                                    <button className="rowOneCol2FlexBtn">
                                        GOOGLE ТРЕНД
                                    </button>
                                </div>
                                <div className="col-md-5 rowOneCol2Flex2 pt-2">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="tableThOne">Условия</th>
                                                <th/>
                                                <th className="tableThTwo">CR</th>
                                                <th className="tableThTwo">EPC</th>
                                                <th className="tableThTwo">Апрув</th>
                                            </tr>
                                            </thead>
                                            <tbody className="table-responsive-Body">
                                            {/*{this.state.offersDetail.length > 0 && this.state.offersDetail.map((items: any, i: number) => {*/}
                                            {offersDetail.map((items: any, i: number) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="imgFlexFlag">
                                                                <div className="mr-2">
                                                                    {items.imgFlag}
                                                                </div>
                                                                <div className="">
                                                                    <p>
                                                                        {items.flagNumber}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="euroFlex">
                                                                <div className="mr-1">
                                                                    {items.euroNumber}
                                                                </div>
                                                                <div className="">
                                                                    <p>
                                                                        {items.euro}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="h-100">
                                                            <div className="lineTextFlex">
                                                                {/*<div className="lineText">*/}
                                                                {/*    {items.lineText}*/}
                                                                {/*</div>*/}
                                                                <div className="line"/>
                                                            </div>
                                                        </td>
                                                        <td className="h-100">
                                                            <div className="lineTextFlex">
                                                                {/*<div className="lineText">*/}
                                                                {/*    {items.lineText}*/}
                                                                {/*</div>*/}
                                                                <div className="line"/>
                                                            </div>
                                                        </td>
                                                        <td className="h-100">
                                                            <div className="lineTextFlex">
                                                                {/*<div className="lineText">*/}
                                                                {/*    {items.lineText}*/}
                                                                {/*</div>*/}
                                                                <div className="line"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                            <thead>
                                            <tr className="trTwo">
                                                <th className="tableThOne">Средний:</th>
                                                <th/>
                                                <th className="tableThTwo">1/2...</th>
                                                <th className="tableThTwo">0</th>
                                                <th className="tableThTwo">50%</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                                {/* <div className="rowOneCol2Flex1 mr-3">
                                    
                                </div> */}
                                {/* <div className="rowOneCol2Flex2">
                                    
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-3 mt-3 offersDetailsRowOneCol3">
                            <Card>
                                <p className="text1">
                                    Запрещенные источники
                                </p>
                                <p className="text2">
                                    <img src="/assets/svg/limitSvg.svg" className="" alt=""/> Cashback-трафик
                                </p>
                                <p className="text2">
                                    <img src="/assets/svg/limitSvg.svg" className="" alt=""/> Мотивированный трафик
                                </p>
                            </Card>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-9 offersDetailsRowOneCol4">
                            <Card>
                                <p className="text1">
                                    Описание оффера
                                </p>
                                <p className="text2 mt-4">Цель: Подтвержденная заяавка IT</p>
                                <p className="text2">Цена товара : 39 рублей</p>
                                <p className="text2">Оплата действия : до 22 рублей</p>
                                <p className="text2">График работы Call-center:9 am-8 pm(по местному времени) </p>
                                <p className="text2">ГЕО ограничения:Нет</p>
                                <p className="text2 pb-4">Запрещенные источники: СashBack , мотивированный</p>
                                <Link to="#" className="unionLink">
                                    СКРЫТ <img src="/assets/svg/Union.svg" className="" alt=""/>
                                </Link>
                            </Card>

                            
                        </div>
                        {/* <Col md={12} lg={4} xl={4} className="offersDetailsRowOneCol5">
                            <Card>
                                <p className="text1">
                                    Получить сылку
                                </p>

                                <div className="table-responsive">
                                    <table className="table getLinksTable">
                                        <thead>
                                        <tr>
                                            <th className="getLinksTh1">Выберите лендинг</th>
                                            <th className="getLinksTh2">CR</th>
                                            <th className="getLinksTh2">EPC</th>
                                            <th className="getLinksTh2">Апрув</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-responsive-Body">
                                        {offers.tool? offers.tool.map((items: any, i: number) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <div className="imgFlexFlag">
                                                            <div className="">
                                                                <div className="checkBoxLabel" key={i}>
                                                                    <FormControlLabel label={items.name}
                                                                                      control={<Checkbox
                                                                                          color="primary"/>}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-100">
                                                        <div className="lineTextFlex">
                                                            <div className="line"/>
                                                        </div>
                                                    </td>
                                                    <td className="h-100">
                                                        <div className="lineTextFlex">
                                                            <div className="line"/>
                                                        </div>
                                                    </td>
                                                    <td className="h-100">
                                                        <div className="lineTextFlex">
                                                            <div className="lineText">
                                                                {items.lineText}%
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }): null}
                                        </tbody>
                                    </table>
                                </div>

                                <form className="">
                                    <Row className="offersDetailsForm">
                                        <Col md={12}>
                                            <div className="input-group">
                                                <input type="text"
                                                       className="form-control"
                                                       id="links"
                                                       placeholder="Ссылка для HairIntense  - для роста и укдепления бороды БУРЖ"
                                                       required/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="links">
                                                        <img src="/assets/svg/questionSvg.svg" alt=""/>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md={12} lg={6} xl={6} className="mt-3">
                                            <div className="input-group">
                                                <select className="form-control" id="social">
                                                    <option>Facebook</option>
                                                </select>
                                                <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="social">
                                                        <img src="/assets/svg/questionSvg.svg" alt=""/>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} lg={6} xl={6} className="mt-3">
                                            <div className="input-group">
                                                <input type="text"
                                                       className="form-control"
                                                       id="url"
                                                       placeholder="Тариф-бек URL"
                                                       required/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text"
                                                          id="url">
                                                        <img src="/assets/svg/questionSvg.svg" alt=""/>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>

                                <div className="faqCollapseMAIN">
                                    {domainFaqs.map((items, index) => (
                                        <TabPane tabId={index} key={index}>
                                            <div
                                                className={`faqCollapse col-lg-12 col-12 px-0 ${activeCollapse === index ? 'active-line' : ''}`}>
                                                <div className="collapse-header"
                                                     onClick={() => changeActiveCollapse(index)}>
                                                    <div
                                                        className={`faqCollapseFlex d-flex ${activeCollapse === index ? 'active-flex' : 'non-active-flex'}`}>
                                                        <div className="w-75">
                                                            <p className="titleFaq mb-0">{items.title}</p>
                                                        </div>
                                                        <div className="w-25 text-right ml-2">
                                                            <span style={{transform: "translate(0px,-1px)"}}>
                                                                {activeCollapse !== index ?
                                                                    <span className="plusMinus">
                                                                        <img src="/assets/svg/UnionDown.svg" alt=""/>
                                                                    </span> :
                                                                    <span className="plusMinus">
                                                                        <img src="/assets/svg/UnionDown.svg" alt=""/>
                                                                    </span>
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Collapse isOpen={activeCollapse === index}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <p className="collapseTextFaq">{items.description}</p>
                                                        </Col>
                                                    </Row>
                                                </Collapse>
                                            </div>
                                        </TabPane>
                                    ))}
                                </div>
                            </Card>
                        </Col> */}
                        <div className="col-md-3 offersDetailsRowOneCol6">
                            <Card>
                                <p className="text11">
                                    Трафик принимается по городам:
                                </p>
                                <form className="">
                                    <div className="offersDetailsFormAnother">
                                        {offers.region ?  offers.region.map((items:any, i:number)=>
                                            <div key={i}>
                                                <FormControlLabel
                                                    value=""
                                                    control={<Checkbox color="primary"/>}
                                                    label={
                                                        <div className="labelCheckBox">
                                                            {items.name + ": "}
                                                            {items.region_child !== undefined && items.region_child[0] !== undefined
                                                             ? items.region_child[0].name : null} 
                                                        </div>
                                                    }
                                                    labelPlacement="start"
                                                />
                                            </div>
                                        ):
                                            <div>
                                                нет дата
                                            </div>
                                        }
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>

                          {/* <Row className="anotherOfferDetailsTables">
                                
                                
                            </Row>       */}
                    <div className="row mt-3 anotherOfferDetailsTables">

                        <div className="col-md-3 topSourcesTableCol">
                                    <Card>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th className="tableThOne">Условия</th>
                                                    <th className="tableThTwo">CR</th>
                                                    <th className="tableThTwo">EPC</th>
                                                    <th/>
                                                </tr>
                                                </thead>
                                                <tbody className="table-responsive-Body">
                                                {/*{this.state.topSourcesData.length > 0 && this.state.topSourcesData.map((items: any, i: number) => {*/}
                                                {topSourcesData.map((items: any, i: number) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>
                                                                <div className="imgFlexFlag">
                                                                    <div className="mr-2">
                                                                        {items.imgFlag}
                                                                    </div>
                                                                    <div className="">
                                                                        <p>
                                                                            {items.flagNumber}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="h-100">
                                                                <div className="lineTextFlex">
                                                                    {/*<div className="lineText">*/}
                                                                    {/*    {items.lineText}*/}
                                                                    {/*</div>*/}
                                                                    <div className="line"/>
                                                                </div>
                                                            </td>
                                                            <td className="h-100">
                                                                <div className="lineTextFlex">
                                                                    {/*<div className="lineText">*/}
                                                                    {/*    {items.lineText}*/}
                                                                    {/*</div>*/}
                                                                    <div className="line"/>
                                                                </div>
                                                            </td>
                                                            <td className="h-100">
                                                                <div className="lineTextFlex">
                                                                    {/*<div className="lineText">*/}
                                                                    {/*    {items.lineText}*/}
                                                                    {/*</div>*/}
                                                                    <div className="line"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>

                                                <thead>
                                                <tr className="trTwo">
                                                    <th className="tableThOne">
                                                        Контекстная рекл...
                                                    </th>
                                                    <th className="">
                                                        <div className="lineTextFlex2">
                                                            {/*<div className="lineText">*/}
                                                            {/*    {items.lineText}*/}
                                                            {/*</div>*/}
                                                            <div className="line"/>
                                                        </div>
                                                    </th>
                                                    <th className="">
                                                        <div className="lineTextFlex2">
                                                            {/*<div className="lineText">*/}
                                                            {/*    {items.lineText}*/}
                                                            {/*</div>*/}
                                                            <div className="line"/>
                                                        </div>
                                                    </th>
                                                    <th className="">
                                                        <div className="lineTextFlex2">
                                                            {/*<div className="lineText">*/}
                                                            {/*    {items.lineText}*/}
                                                            {/*</div>*/}
                                                            <div className="line"/>
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </Card>
                                </div>

                        <div className="col-md-3 workGraphicTableCol">
                            <Card>
                                <p className="workGraphicText1">График работы КЦ</p>
                                {workGraphicData.length > 0 && workGraphicData.map((item: any, i: number) => {
                                    return (
                                        <div key={i}>
                                            <p className="workGraphicText2">
                                                {item.imgFlag} {item.text}
                                            </p>
                                        </div>
                                    )
                                })}
                            </Card>
                        </div>

                        
                    </div>
                </div>
                </>
                )}
         
            </div>
        );
}

export default DashboardOffersDetails;