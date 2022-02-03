import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./steps.scss";
import StepsMain from "./StepsMain";
import { useParams } from "react-router-dom";
import axios from "axios";

const Steps = (props: any) => {
  const { id }: any = useParams();
  const [currentStream, setcurrentStream] = useState(null);

  useEffect(() => {
    console.log(id);
    if (id) {
      axios({
        url: `/generate-form/get?id=${id}`,
        method: "GET",
      }).then((res) => {
        setcurrentStream(res.data);
      });
    }
  }, []);

  return (
    <div>
      <section className='dashboardNewApplicationSection mb-5'>
        <div className='d-flex w-100 flex-wrap'>
          <ul style={{ flexWrap: "wrap" }} className='breadcrumbs d-flex w-100'>
            <li>
              <Link to='/dashboard'>Главный</Link>
            </li>
            <li>
              <Link to='/dashboard/instruments'> Инструменты</Link>
            </li>
            <li>
              <Link to='/dashboard/steps'> Конструктор форм</Link>
            </li>
          </ul>
        </div>
        <div className='dashboardMainFormSection mt-3'>
          <StepsMain
            currentStream={currentStream}
            setcurrentStream={setcurrentStream}
          />
        </div>
      </section>
    </div>
  );
};

export default Steps;
