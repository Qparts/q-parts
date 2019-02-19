import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import Swiper from 'react-id-swiper';

export class ManualForm extends Component {
	componentDidMount = () => {
		//nav slider
		const next = document.getElementsByClassName("swiper-button-next")[0];
		const prev = document.getElementsByClassName("swiper-button-prev")[0];
		document.getElementsByClassName("slider-nav-container")[0].appendChild(next);
		document.getElementsByClassName("slider-nav-container")[0].appendChild(prev);
	}
	render() {
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
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		}

		return (
			<section className="main-slider">
				<Swiper {...params}>
					<div>
						<div>
							<Link to="/listing?query=&page=1&category=9">
								<img src="/img/slide-1.jpg" />
							</Link>
						</div>
					</div>
					<div>
						<div>
						<Link to="/listing?query=&page=1&category=10">
								<img src="/img/slide-2.jpg" />
							</Link>
						</div>
					</div>
					<div>
						<div>
							<Link to="/listing?query=&page=1&category=9">
								<img src="/img/slide-3.jpg" />
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
