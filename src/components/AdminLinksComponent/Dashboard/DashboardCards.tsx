import Axios from 'axios';
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import configApi from '../../../utils/configApi';

class DashboardCards extends Component {

    private _isUnmounted: boolean = false;

    public state: any = {
        isLoading: false,
        offers: [],
    }

    constructor(e: any = null) {
        super(e);
    }

    componentWillUnmount() {
        this._isUnmounted = true;
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(`${configApi.api}/universal/get-offers?limit=8`).then(res => {
                if (!this._isUnmounted) {
                    this.setState({
                        offers: res.data,
                        isLoading: false
                    });
                }
            });
        });
    }

    render() {

        return (
            <div>

                <div className="dashboardGridCards">
                    {this.state.offers && this.state.offers.length > 0 && this.state.offers.map((items:any, i:number) =>
                        <div className="dashboardGridCardItems h-100" key={i}>
                            <div className="m-0 gridCardItemsRow h-100">
                                <div className="gridCardItemsCol1 p-0">
                                    <img src={items.path} className="gridCardItemsImg img-fluid" alt=""/>
                                </div>

                                <div className="gridCardItemsCol2 p-0 h-100">
                                    <div className="gridCardItemsFlexInfos">
                                        <div className="">
                                            <p className="title mb-0">
                                                {items.name}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="date mb-0">
                                                {items.date}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p className="description mb-0">
                                                {items.sub_description}
                                            </p>
                                        </div>
                                        <div className="mt-auto">
                                            {/* <button className="site-button mt-2"></button> */}
                                            <NavLink to="dashboard/offers" className="site-button mt-4 p-2">Подробно</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default DashboardCards;