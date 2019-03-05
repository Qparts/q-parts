import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import Swiper from 'react-id-swiper';
import { ltr } from '../../constants';

export class ManualForm extends Component {
	componentDidMount = () => {
		//nav slider
		const next = document.getElementsByClassName("swiper-button-next")[0];
		const prev = document.getElementsByClassName("swiper-button-prev")[0];
		document.getElementsByClassName("slider-nav-container")[0].appendChild(next);
		document.getElementsByClassName("slider-nav-container")[0].appendChild(prev);
	}
	render() {
		const { direction } = this.props
		const params = {
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 0,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: direction === ltr ? '.swiper-button-next' : '.swiper-button-prev',
				prevEl: direction === ltr ? '.swiper-button-prev' : '.swiper-button-next'
			},
			rebuildOnUpdate: true,
		}

		return (
			<section className="main-slider">
				<Swiper {...params}>
					<div>
						<div>
							<Link to="/listing?query=&page=1&category=9">
								<img src="https://s3.eu-central-1.amazonaws.com/q-parts-home-slider/slide-1.jpg" />
							</Link>
						</div>
					</div>
					<div>
						<div>
							<Link to="/listing?query=&page=1&category=10">
								<img src="https://s3.eu-central-1.amazonaws.com/q-parts-home-slider/slide-2.jpg" />
							</Link>
						</div>
					</div>

					<div>
						<div>
							<Link to="/quotation-order">
								<img src="https://s3.eu-central-1.amazonaws.com/q-parts-home-slider/slide-4.jpg" />
							</Link>
						</div>
					</div>
					<div>
						<div>
							<Link to="/listing?query=&page=1&category=1">
								<img src="https://s3.eu-central-1.amazonaws.com/q-parts-home-slider/slide-5.jpg" />
							</Link>
						</div>
					</div>
					<div>
						<div>
							<Link to="/listing?query=&page=1&category=9">
								<img src="https://s3.eu-central-1.amazonaws.com/q-parts-home-slider/slide-3.jpg" />
							</Link>
						</div>
					</div>
				</Swiper>
				<div className="slider-nav-container container-fluid"></div>

			</section>
		);
	}
}
export default ManualForm;
