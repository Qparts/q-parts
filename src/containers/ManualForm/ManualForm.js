import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import Swiper from 'react-id-swiper';
export class ManualForm extends Component {
	render() {
		const params = {
					slidesPerView: 'auto',
					centeredSlides: true,
					spaceBetween: 0,
					loop: true,
					//autoplay: {
						//delay: 20000,
						//disableOnInteraction: false,
					//},
	          navigation: {
	            nextEl: '.swiper-button-next',
	            prevEl: '.swiper-button-prev'
	          }
	        }
 
		return (
			<section className="main-slider">
			<Swiper {...params}>
	      <div>
					<div>
						<a href="#">
							<img src="/img/slide-1.jpg"/>
						</a>
					</div>
				</div>
	      <div>
					<div>
						<a href="#">
							<img src="/img/hero-lg.jpg"/>
						</a>
					</div>
				</div>
	      <div>
					<div>
						<a href="#">
							<img src="/img/tyers-lg.jpg"/>
						</a>
					</div>
				</div>
    	</Swiper>
			<div className="slider-nav-container"></div>

			</section>
		);
	}
}
export default ManualForm;
