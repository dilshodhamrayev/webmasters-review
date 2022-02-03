import React, { Component } from "react";
import "./index.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "axios";
import configApi from "../../../utils/configApi";
import {NavLink} from "reactstrap";

class DashboardMainCarousel extends Component<any, any> {
  private _isUnmounted: boolean = false;

  public state: any = {
    isLoading: false,
    carousel:[],
    selected_id: null
  }


  componentWillUnmount() {
    this._isUnmounted = true;
  }

  constructor(e: any = null) {
    super(e);
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    }, () => {
      Axios.post(`${configApi.api}/universal/carousel-list`).then(res => {
        if (!this._isUnmounted) {
          this.setState({
            carousel: res.data,
            isLoading: false
          });
        }
      });
    });
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
      ],
    };

    return (
      <div className="dashboardMainCarousel">
        <Slider {...settings} className="first-carousel">
          {this.state.carousel && this.state.carousel.length > 0 && this.state.carousel.map((elem:any, i:number) => {
            return (
                <div className="fistCarousel" key={i}>
                  <img
                      src={elem.path}
                      className="fistCarouselImg img-fluid"
                      alt=""
                  />
                  <div className="fistCarouselBack" />
                  <div className="carouselInfo">
                    <p className="carouselTitle mb-0">{elem.title}</p>
                    <NavLink to={`dashboard/carousel/${elem.id}`} className="carouselBtn">
                      Подробно
                    </NavLink>
                  </div>
                </div>
            )
          })}



        </Slider>
      </div>
    );
  }
}

export default DashboardMainCarousel;
