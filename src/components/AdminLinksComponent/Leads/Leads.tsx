import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import configApi from "../../../utils/configApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "./Table";
import { Link } from "react-router-dom";
import "./leads.scss";

const Leads = (props: any) => {
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
  const [leads, setLeads] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id }: any = useParams();
  const getLead = async () => {
    let url: string;
    try {
      id ? (url = `?stream_id=${id}`) : (url = "");
      let res = await Axios.get(`${configApi.api}/request/get-leads${url}`);
      if (res.data) {
        setLeads(res.data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(id);
    getLead();
  }, []);

  return (
    <div className='leads-main'>
      <>
        <div className='dashboardMyStreamsSection'>
          <div className='d-flex w-100 flex-wrap'>
            <ul className='breadcrumbs d-flex w-100'>
              <li>
                <Link to='/dashboard'>Главная</Link>
              </li>
              <li>
                <Link to='/dashboard/leads'>Лиды</Link>
              </li>
              {id ? (
                <li>
                  <Link to='/dashboard/leads'>{id}</Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className='w-100 second-block p-5'>
          <div className='leads-table'>
            <Table data={leads} />
          </div>
        </div>
      </>
      )
    </div>
  );
};

export default Leads;
