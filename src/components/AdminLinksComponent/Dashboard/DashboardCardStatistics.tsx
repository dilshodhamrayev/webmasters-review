import React, { Component } from "react";
import "./index.scss";

class DashboardCardStatistics extends Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
  };

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  getPercentage(data) {
    let currentMonth = data.currentMonth ? data.currentMonth : 0,
      previousMonth = data.previousMonth ? data.previousMonth : 1;

    let percentage = (currentMonth * 100) / previousMonth;

    return `${percentage}%`;
  }

  render() {
      const { trafic, leads, request, total_income } = this.props.statics;
      console.log(trafic, leads, request, total_income);
    return (
      <div className='dashboardCardStatistics'>
        <div className='w-100 d-flex justify-content-between flex-wrap'>
          <div className='red-block dash-block'>
            <span className='title'>Трафик</span>
            <img className='float-right' src='/assets/img/trafik.svg' alt='' />
            <br />
            <span className='number'>
              {trafic.currentMonth ? trafic.currentMonth : 0}
            </span>
            <br />
            <br />
            <br />
            <p className='mb-0'>
              <img src='/assets/svg/ArrowDown.svg' alt='' />{" "}
              {this.getPercentage(trafic)}
              прошлого месяца
            </p>
          </div>
          <div className='blue-block dash-block'>
            <span className='title'>Лиды</span>
            <img className='float-right' src='/assets/img/target.svg' alt='' />
            <br />
            <span className='number'>
              {leads.currentMonth ? leads.currentMonth : 0}
            </span>
            <br />
            <br />
            <br />
            <p className='mb-0'>
              <img src='/assets/svg/ArrowUp.svg' alt='' />{" "}
              {this.getPercentage(leads)} С прошлого месяца
            </p>
          </div>
          <div className='green-block dash-block'>
            <span className='title'>Заявки</span>
            <img
              className='float-right'
              src='/assets/img/add-image.svg'
              alt=''
            />
            <br />
            {request.currentMonth ? request.currentMonth : 0}
            <br />
            <br />
            <br />
            <p className='mb-0'>
              <img src='/assets/svg/ArrowUp.svg' alt='' />{" "}
              {this.getPercentage(request)} С прошлого месяца
            </p>
          </div>
          <div className='orange-block dash-block'>
            <span className='title'>Общий доход</span>
            <img className='float-right' src='/assets/img/money.svg' alt='' />
            <br />
            <span className='number'>
              {total_income.currentMonth ? total_income.currentMonth : 0} ₽
            </span>
            <br />
            <br />
            <br />
            <p className='mb-0'>
              <img src='/assets/svg/ArrowUp.svg' alt='' />{" "}
              {this.getPercentage(total_income)} С прошлого месяца
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardCardStatistics;
