
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import configApi from '../../../utils/configApi';
import CustomizedSelect from './CustomizedSelect';
import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import './requests.scss';

const useStyles = makeStyles((theme:any) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: "m-0",
  },
  root: {
    background: '#2196F3',
    borderRadius: 20,
    border: 0,
    height: 40,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  root2: {
      background: 'red',
      color: '#ffffff',
      borderRadius: 20,
      paddingRight: "5px",
      paddingTop: "10px",
      paddingBottom: "10px",
  },
  root3: {
      background: '#2196F3',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderRadius: 20,
  },
}));

export default function RequestsHeader(props) {
  const classes = useStyles();
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const { id }:any = useParams();
  
  const refresh = () => {
    setFrom('');
    setTo('');
    props.clearFilter();
  };

  function handleFilter(){
            let url:any;
            url = `${configApi.api}/request/get-requests?stream_id=${id}`
            if(id && from && to){
                url += `&from=${from}&to=${to}`;
            } else if(from) {
                url += `&from=${from}`;
            } else if(to) {
                url += `&to=${to}`;
            }

            Axios.post(url).then(res => {
              console.log(res);
              props.setFilteredLeads(res.data);
        });
    }
    function setFromInput(e:any) {
        setFrom(e.target.value)
        console.log(from);
    }

    function setToInput(e:any) {
        setTo(e.target.value)
        console.log(to);
    }

  return (
  <>
    <div className='leads-title mt-3 ml-3'>Заявки</div>
    <div className="row">
      <div className="col-md-12">
        <div className="row d-flex align-items-center">
          <div className="col-12 col-sm-12 col-md-5 d-flex justify-content-center">
            <div className="d-flex justify-content-around">
              <div className="row">
                <div className="col-12 col-sm-6 d-flex justify-content-center mt-1">
                  <input 
                    className="finance-date cursor-pointer"
                    type="date" value={from} 
                    onChange={setFromInput}
                  />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center mt-1">
                  <input 
                    className="finance-date cursor-pointer" 
                    type="date" value={to} 
                    onChange={setToInput}
                  />
                </div>
              </div>
									        	  
                              
                        </div>
              {/* <RangePicker 
                defaultValue={{startDate: date, endDate: date}}
                onDateSelected={changeDate}
              /> */}
          </div>
          <div className="col-12 col-sm-6 col-md-3 mt-1">
            <CustomizedSelect data={props.data}/>
          </div>
          <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                <Button variant="contained" 
                  color="primary" 
                  classes={{ root: classes.root }}
                  size="small" 
                  className={classes.margin}
                  onClick={handleFilter}
                >
                   Применить
                </Button>
                <Button
                  classes={{ root: classes.root2 }}
                  variant="contained"
                  className={classes.margin}
                  startIcon={<SyncIcon />}
                  onClick={refresh}
                />
          </div>

        </div>
      </div>

      {/* <div className="col-12 col-sm-2 col-md-4 d-flex align-items-center justify-content-md-end justify-content-center">
            <Button
              classes={{ root: classes.root3 }}
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              endIcon={<ArrowDropDownIcon />}
            />
      </div> */}
    </div>
  </>    
  );
}