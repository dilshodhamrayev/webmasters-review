import React, { Component, useState } from 'react';
import Axios from "axios";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import configApi from "../../../utils/configApi";
import './index.scss'
import Modal from "../../../components/global/Modal"
import Tabs from "./AccountFor/Tabs"
import ReactstrapModal from './ReactstrapModal';


const DashboardInstruments: React.FC = () => {
    const [modal1, setModal1] = useState(false);
    const [modal2, setmodal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>();
    const [from, setFrom] = useState<number>(0)

    const toggle1 = () => {
        setModal1(!modal1);
        setData(null);
        setFrom(1);
    };
    const toggle3 = () => {
        setModal3(!modal3);
        setData(null);
        setFrom(3);
    };

    const getData = async () => {
        let toUrl: string;
        from === 1 ? toUrl = "extension" : from === 3 ? toUrl = "quizz" : toUrl = ""
        try {
            setLoading(true);
            let res = await Axios.get(`${configApi.api}/instruments/${toUrl}`);
            if (res.data) {
                setData(res.data);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const instrumentsData = [
        {
            img: <img src="/assets/img/Seo.png" alt="" />,
            title: "Конструктор форм",
            description: "Создайте и настройте под себя форму обратной связи с помощью инструмента\n" +
                "                                        конструктор\n" +
                "                                        форм. Разместите ее на своём WEB ресурсе и начните зарабатывать на лидах уже\n" +
                "                                        сегодня. Это просто.",
            btn: <Link to='/dashboard/steps' className="text-decoration-none">
                <button className="site-button mt-3">
                    Создать поток
                        </button>
            </Link>,
        },
        {
            img: <img src="/assets/img/landing.png" alt="" />,
            title: "Лендинги",
            description: "Мощный инструмент для лидогенерации. Библиотека уже готовых решений, для\n" +
                "быстрого\n" +
                "тестирования идей и новых направлений. Настройте посадочную страницу за 5 минут.",
            btn: <Link to='/dashboard/steps' className="text-decoration-none">
                <button className="site-button mt-3">
                    Создать лендинг
                    </button>
            </Link>,
        },
        {
            img: <img src="/assets/img/analytics.png" alt="" />,
            title: "Сайт в системе",
            description: "Подключите свой собственный сайт \n" +
                "к нашей партнерской сети для передачи лидов и сбора\n" +
                "статистики.",
            btn: <Link to='/dashboard/steps' className="text-decoration-none">
                <button className="site-button mt-3">
                    Создать поток
                    </button>
            </Link>,
        },
        {
            img: <img src="/assets/img/customer.png" alt="" />,
            title: "Ручная передача лидов",
            description: "Передавайте ваши лиды напрямую через интерфейс личного кабинета. Этот инструмент\n" +
                " позволит передать всю необходимую информацию о лиде и посмотреть статистику по\n" +
                " конверсии.",
            btn: <Link to='/dashboard/standartapplicationtable' className="text-decoration-none">
                <button className="site-button mt-3">
                    Создать ЛИД
                    </button>
            </Link>,
        },
        {
            img: <img src="/assets/svg/statistik1.svg" alt="" />,
            title: "браузер антидетект\n" +
                "Расширение для авито/юла/Olx",
            description: "Специально разработанное расширение которое позволяет выполнять постинг ",
            btn:
                <button onClick={toggle1} name="createLead" className="site-button mt-3">
                    Создать ЛИД
                </button>

        },
        // {
        //     img: <img src="/assets/svg/statistik2.svg" alt="" />,
        //     title: "Spy сервисы",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать сервисы
        //         </button>
        //     </Link>,
        // },
        // {
        //     img: <img src="/assets/svg/statistik3.svg" alt="" />,
        //     title: "Сервисы для создания креативов ",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать креатив
        //         </button>
        //     </Link>,
        // },
        // {
        //     img: <img src="/assets/svg/statistik4.svg" alt="" />,
        //     title: "Формы по арбитражу трафика",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать Форма
        //         </button>
        //     </Link>,
        // },

        {
            img: <img src="/assets/svg/statistik5.svg" alt="" />,
            title: "Аккаунты для фейсбука/Google/Vk",
            description: "Lorem ipsum dolor sit amet," +
                " consectetur adipiscing elit. Vulputate venenatis, " +
                "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
            btn:
                <button onClick={() => setmodal2(true)} className="site-button mt-3">
                    Создать Аккаунт
                </button>

        },
        // {
        //     img: <img src="/assets/svg/statistik6.svg" alt="" />,
        //     title: "Модератор комментариев в фейсбуке",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать Модератор
        //         </button>
        //     </Link>,
        // },
        // {
        //     img: <img src="/assets/svg/statistik7.svg" alt="" />,
        //     title: "Расширение для выгрузки страницы",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать Расширение
        //         </button>
        //     </Link>,
        // },
        // {
        //     img: <img src="/assets/svg/statistik8.svg" alt="" />,
        //     title: "Уникализатор сайтов",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать сайт
        //         </button>
        //     </Link>,
        // },
        // {
        //     img: <img src="/assets/svg/statistik9.svg" alt="" />,
        //     title: "Генератор WhitePage",
        //     description: "Lorem ipsum dolor sit amet," +
        //         " consectetur adipiscing elit. Vulputate venenatis, " +
        //         "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
        //     btn: <Link to='' className="text-decoration-none">
        //         <button className="site-button mt-3">
        //             Создать Генератор
        //         </button>
        //     </Link>,
        // },
        {
            img: <img src="/assets/svg/statistik10.svg" alt="" />,
            title: "Сервис для создания квиз страниц\n",
            description: "Lorem ipsum dolor sit amet," +
                " consectetur adipiscing elit. Vulputate venenatis, " +
                "lorem id amet tortor non. Maecenas aliquam pretium mauris ac tortor bibendum purus. ",
            btn: <button
                onClick={toggle3}
                className="site-button mt-3"
                name="createService"
            >
                Создать Сервис
                </button>

        },
    ];
    return (
        <div className="dashboardInstrumentsSection">
            <Modal setopen={setmodal2} open={modal2} title="Аккаунты для фейсбука/Google/Vk" ><Tabs /></Modal>
            <ReactstrapModal
                modalHeaderTitle="браузер антидетект Расширение для авито/юла/Olx"
                firstBtnColor="primary"
                firstBtnTitle="Получить доступ"
                firstBtnFunc={getData}
                secondBtn={false}
                toggle={toggle1}
                open={modal1}
                title="браузер антидетект Расширение для авито/юла/Olx"
                data={data}
                loading={loading}
            />
            <ReactstrapModal
                modalHeaderTitle="Сервис для создания квиз страниц"
                firstBtnColor="primary"
                firstBtnTitle="Получить доступ"
                firstBtnFunc={getData}
                secondBtn={false}
                toggle={toggle3}
                open={modal3}
                title="Сервис для создания квиз страниц"
                data={data}
                loading={loading}
            />

            <div className="d-flex w-100 flex-wrap">
                <ul className="breadcrumbs d-flex w-100">
                    <li><Link to="/dashboard">Главная</Link></li>
                    <li><Link to="/dashboard/instruments">Инструменты</Link></li>
                </ul>
            </div>
            <div className="dashboardMainTitleSection">
                <Row className="m-0">
                    <Col md={12}>
                        <p className="my-0 dashboardMainTitle">Инструменты</p>
                    </Col>
                </Row>
            </div>
            <div className="row m-0">
                <div className="col-lg-12">
                    <div className="streams instruments mt-3">
                        {instrumentsData.map((items, i) => {
                            return (
                                <div key={i} className="ins d-flex flex-column align-items-center justify-content-between">
                                    <div>
                                        {items.img}
                                        <h3>{items.title}</h3>
                                        <p>{items.description}</p>
                                    </div>
                                    {items.btn}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardInstruments;