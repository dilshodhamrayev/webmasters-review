import React, { useState, useEffect } from "react";
// COMPONENTS
import SideInfoCard from "../../global/SideInfoCard";
import GModal from "../../global/Modal";
import GTable from "../../global/Table";
import Grid from "@material-ui/core/Grid";
import AddDomainForm from "./AddDomainForm";
// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// ASSETS
import { ReactComponent as Basket } from "../../../assets/img/basket.svg";
import styles from "../../../styles/Domains/Domains.module.css";
// MODULES
import { domainUrls } from "../../../constants/apiRoutes";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { postRequest, getRequest } from "../../../redux/rootThunk";

const titles = [
  { title: "Домен", prop: "name" },
  { title: "Дата добавления", prop: "create_at" },
  { title: "Поток", prop: "stream" },
  { title: "Статус", prop: "domain_status" },
];

const actions = [
  {
    icon: <Basket className={styles.cursor_pointer} />,
    handleDelete: () => {},
  },
];

const info = (
  <div>
    В личном кабинете вы можете подключить собственное доменное имя к любому
    потоку с лендингом.
    <br />
    <br />
    Поддерживаются домены любого уровня на любом языке, например: site.com,
    promo.site.com, сайт.рф и т.п.
    <br />
    <br />
    Вы можете приобрести домен у любого регистратора или реселлера.
  </div>
);

const Domains: React.FC = () => {
  const [open, setopen] = useState(false);
  const domains = useSelector((state: any) => state.domainReducer.domains);
  // FORM VALS
  const [domainName, setdomainName] = useState(".com");
  const [stream_id, setStream_id] = useState(null);
  const [domain, setDomain] = useState("");

  const dispatch = useDispatch();

  const openModal = () => {
    setopen(true);
  };

  useEffect(() => {
    dispatch(getRequest({ value: "domains", url: domainUrls.getDomains }));
  }, []);

  const handleAddDomain = () => {
    dispatch(postRequest({ value: "streams", url: domainUrls.createDomain }));
  };

  return (
    <div className="dashboard_content_wrapper">
      <Grid container spacing={2}>
        <Grid item xs>
          <Card>
            <CardContent>
              <header className={styles.header}>
                <div className={styles.header_content_one}>
                  <h3>Мои домены</h3>
                  <div className="blue_circle">{domains.length}</div>
                </div>
                <button className="site-button" onClick={openModal}>
                  ДОБАВИТЬ ДОМЕН
                </button>
              </header>
              <GTable
                primary={true}
                data={domains}
                titles={titles}
                actions={actions}
              />
            </CardContent>
          </Card>
        </Grid>
        <GModal
          open={open}
          setopen={setopen}
          footer={true}
          title="Создать креатив"
          handleFirstBtn={handleAddDomain}
        >
          <AddDomainForm
            setVals={{
              setdomainName,
              domainName,
              setStream_id,
              stream_id,
              setDomain,
              domain,
            }}
          />
        </GModal>
        <Grid item xs={12} md={4}>
          <SideInfoCard content={info} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Domains;
