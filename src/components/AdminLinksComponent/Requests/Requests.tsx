import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import configApi from "../../../utils/configApi";
import Table from './Table';
import {Link} from "react-router-dom";
import './requests.scss';

const Requests = (props:any) =>  {
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
    const { id }:any = useParams();
    const getRequests = async () => {
        let url:string
            try {
                id ? url = `?stream_id=${id}` : url = "";
                let res = await Axios.get(`${configApi.api}/request/get-requests${url}`); 
                 if (res.data) {
                     setRequests(res.data);
                 }
            } catch (e) {
                    console.log(e);
            } 
        }

    useEffect(() => {
        getRequests();
    }, [])
    
        return (
            <div className="leads-main">
                    <>
                        <div className="dashboardMyStreamsSection">
                                <div className="d-flex w-100 flex-wrap">
                                    <ul className="breadcrumbs d-flex w-100">
                                        <li><Link to="/dashboard">Главная</Link></li>
                                        <li><Link to="/dashboard/requests">Заявки</Link></li>
                                        {id ? <li><Link to="/dashboard/requests">{id}</Link></li> : null}
                                    </ul>
                                </div>
                         </div>
                        <div className="w-100 second-block p-5">
                            
                            <div className="leads-table">
                                <Table data={requests} />
                            </div>
                        </div>
                    </>
                )
               
            </div>
                
        );
    }

export default Requests;