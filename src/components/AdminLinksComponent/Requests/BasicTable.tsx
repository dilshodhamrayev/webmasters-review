import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    border: "1px solid red"
  },
});

export default function BasicTable(props:any) {
  const classes = useStyles();
  console.log(props.data);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">id лида</TableCell>
            <TableCell align="right">дата</TableCell>
            <TableCell align="right">филиал</TableCell>
            <TableCell align="right">клиент</TableCell>
            <TableCell align="right">причина отмены</TableCell>
            <TableCell align="right">источник</TableCell>
            <TableCell align="right">id заявки</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.data.map((item:any, index:number) => (
              <TableRow key={index}>
              <TableCell align="right">{item.id}</TableCell>
              <TableCell align="right">{item.created_at}</TableCell>
              <TableCell align="right">
                {item.region ? item.region.name : null}</TableCell>
              <TableCell align="right">{item.full_name}</TableCell>
              <TableCell align="right">{item.cancel_reason}</TableCell>
              <TableCell align="right">{item.istochnik}</TableCell>
              <TableCell align="right">{item.status}</TableCell>
              <TableCell align="right">{item.stream_id}</TableCell>
            </TableRow>
            ))
          }
            
        </TableBody>
      </Table>
    </TableContainer>
  );
}
