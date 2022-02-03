import React, { useState, useEffect } from 'react';
import '../MyStreams/streams.scss';
import RequestsHeader from './RequestsHeader';
import {Link} from "react-router-dom";
import moment from 'moment'

const Table = ( props:any ) => {
    interface State {
        full_name: string;
        created_at: string;
        direction_id: number;
        id: number;
        is_leads: number;
        offers_id: number;
        phone: string;
        status: number;
        stream_id: number;
    }
    const [requests, setRequests] = useState<State[]>([]);
    useEffect(() => {
        setRequests(props.data);
    }, [props.data]);

    const setFilteredLeads = (data) => {
        setRequests(data)
    }
    const clearFilter = () => {
        setRequests(props.data)
    }

    return (
        <div>
            <RequestsHeader clearFilter={clearFilter} setFilteredLeads={setFilteredLeads} data={props.data}/>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th/>
                        <th>id заявки <img src="/assets/img/sort.svg" alt=""/></th>
                        <th>дата <img src="/assets/img/sort.svg" alt=""/></th>
                        <th>филиал<img src="/assets/img/sort.svg" alt=""/></th>
                        <th>клиент <img src="/assets/img/sort.svg" alt=""/></th>
                        <th>причина отмены <img src="/assets/img/sort.svg" alt=""/></th>
                        <th>источник <img src="/assets/img/sort.svg" alt=""/></th>
                        <th>id потока<img src="/assets/img/sort.svg" alt=""/></th>
                    </tr>
                    </thead>
                    <tbody className="table-responsive-Body">
                    {requests.length > 0 ? requests.map((item: any, i: number) =>
                    /* 
        moment('timestamp').format('MMMM Do YYYY') */
                            <tr key={i}>
                                <th/>
                                <td><Link to={"/dashboard/request/request/" + item.id}>{item.id}</Link></td>
                                <td>{moment(item.created_at).format('DD.MM.YYYY hh:mm:ss')}</td>
                                <td>{item.region ? item.region.name : null}</td>
                                <td>{item.full_name}</td>
                                <td>{item.cancel_reason}</td>
                                <td>{item.istochnik}</td>
                                <td>{item.stream_id}</td>
                            </tr>
                        ) :
                        <tr>
                            <th colSpan={12} className="text-center">
                                Нет доступной информации!
                            </th>
                        </tr>}
                    </tbody>
                </table>
        </div>
        </div>
        
    )
}

export default Table;