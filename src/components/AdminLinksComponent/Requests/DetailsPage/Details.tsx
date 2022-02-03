import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import configApi from "../../../../utils/configApi";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import '../leads.scss';

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%',
    }
}));

const Details = (props: any) => {

    const [lead, setLead] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [text, setText] = React.useState('');
    const handleChange = (event: any) => {
        setText(event.target.value);
    };
    const handleClick = (event: any) => {
        console.log(event.target.name)
    };
    const { id }: any = useParams();
    const getLead = async () => {
        try {
            let url = `?id=${id}`;
            let res = await Axios.get(`${configApi.api}/request/get-lead${url}`);
            if (res.data) {
                console.log(res.data)
                setLead(res.data);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getLead();
    }, [])

    return (
        <div className="details-main">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div className="dashboardMyStreamsSection">
                        <div className="d-flex w-100 flex-wrap">
                            <ul className="breadcrumbs d-flex w-100">
                                <li><Link to="/dashboard">Главная</Link></li>
                                <li><Link to="/dashboard/leads">Лиды</Link></li>
                                <li><Link to={"/dashboard/leads/" + id}>{id}</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-100 second-block px-4 py-0">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="details-lead p-3">
                                    <div className='details-title'>Лид {id}
                                        <Link className="more" to="#">подробности</Link>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-4">
                                            <p>Клиент: {lead.full_name === null || lead.full_name === "" ? <i>(не указано)</i> : lead.full_name}</p>
                                            <p>Тел: {lead.phone === null || lead.phone === "" ? <i>(не указано)</i> : lead.phone}</p>
                                            <p>Город: {lead.region === null || lead.region === "" ? <i>(не указано)</i> : lead.region}</p>
                                            <p>Срочно: {lead.fast === null ? <i>(не указано)</i> : lead.fast === 1 ? 'да' : 'нет'}</p>
                                        </div>
                                        <div className="col-4">
                                            <p>Дата: {lead.created_at}</p>
                                            <p>Тел.доп: {lead.phone_dp === null || lead.phone_dp === "" ? <i>(не указано)</i> : lead.phone_dp}</p>
                                            <p>Адрес: {lead.street === null || lead.street === "" ? <i>(не указано)</i> : lead.street}</p>
                                            <p>Описание проблемы: {lead.comment === null || lead.comment === "" ? <i>(не указано)</i> : lead.comment}</p>
                                        </div>
                                        <div className="col-4">
                                            <p>Источник: {lead.istochnik === null || lead.istochnik === "" ? <i>(не указано)</i> : lead.istochnik}</p>
                                            <p>Время: {lead.comment === null || lead.comment === "" ? <i>(не указано)</i> : lead.comment}</p>
                                            <p>Клиенту не звонить: {lead.call === null ? <i>(не указано)</i> : lead.call === 1 ? 'да' : 'нет'}</p>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="details-lead p-3">
                                        <div className='details-title'>Разговор с диспетчером</div>
                                        <br/>
                                            <div className="d-flex justify-content-start">
                                                <button name="btn1" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Дополнительные данные по заявке</button>
                                                <button name="btn2" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Отмена заявки клиентом</button>
                                                <button name="btn3" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Перенос времены/даты вызова мастера</button>
                                            </div>
                                            <div className="d-flex justify-content-start mt-2">
                                                <button name="btn4" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Не перезвонили</button>
                                                <button name="btn5" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Опоздание мастера</button>
                                                <button name="btn6" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Претензия по цене</button>
                                                <button name="btn7" onClick={handleClick} className="talk ml-1 bg-white rounded p-1">Претензия по качеству</button>
                                            </div>
                                            <div className="w-100 mt-2">
                                                <textarea 
                                                    onChange={handleChange} 
                                                    className="w-100" 
                                                    name="textarea" 
                                                    cols={30}
                                                    rows={3}>
                                                </textarea>
                                            </div>
                                    </div> */}
                            </div>
                            <div className="col-md-3">
                                <div className="details-inform">
                                    <Card className="formSectionCardInfo">
                                        <CardBody>
                                            <div className="infoTitleMain">
                                                <p className="infoTitle">
                                                    <img className="mr-2" src="/assets/svg/inform.svg" alt="" />
                                                        Информация
                                                    </p>
                                            </div>
                                            <div className="infoDescMain">
                                                <p className="infoDesc mb-0">
                                                    Для получения подробной информации по лиду <br />
                                                        нажмите кнопку "Подробности"
                                                        <br />
                                                    <br />
                                                        Чтобы задать вопрос диспетчеру по лиду напищите <br />
                                                        его в поле и нажмите кнопку "Отправить"
                                                    </p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>

    );
}

export default Details;