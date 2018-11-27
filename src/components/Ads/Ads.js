import React, { PureComponent } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export class Ads extends PureComponent {
    render() {
        return (
            <OwlCarousel
                className="owl-theme"
                loop
                nav
                items={1}
            >
                <div className="item"><img style={{ height: '288px'}} src="/img/hero-lg.jpg" alt="ad"/></div>
            </OwlCarousel>
        )
    }
}

export default Ads;
