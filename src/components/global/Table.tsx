import React from "react";
import { Table } from "reactstrap";
import styles from "../../styles/global/Table.module.css";
import Status from "../AdminLinksComponent/MyDomains/Status";

const GTable: React.FC<any> = ({
  titles,
  data,
  props,
  primary = false,
  actions = [],
}) => {
  const getColumnData = (row, title) => {
    switch (title.prop) {
      case "domain_status":
        return (
          <td>
            <Status active={row.status_invalid} text="A-запись неверная" />
            <Status active={row.status_parked} text="Домен не припаркован" />
            <Status
              active={row.status_ssl}
              text="SSL-сертификат (https) не подключен"
            />
          </td>
        );
      default:
        return <td>{row[title.prop]}</td>;
    }
  };

  return (
    <>
      {console.log(data)}
      <Table bordered className="mt-2">
        <thead className={primary ? styles.primaryHeaderText : ""}>
          <tr>
            {titles.map((t) => (
              <th>{t.title}</th>
            ))}
            {actions.length && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                {titles.map((t) => getColumnData(row, t))}
                <td>
                  {actions.map((a) => (
                    <span>{a.icon}</span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default GTable;
