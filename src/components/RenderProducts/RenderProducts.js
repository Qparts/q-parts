import React, { Component } from 'react';
import Slider from "react-slick";
import Stars from 'react-stars';
import * as constant from '../../constants';
import { getLength } from '../../utils/array';

export default class RenderProducts extends Component {

  render() {
    // TODO: delete this later
    const data = [
      {
        id: 13019,
        imageThumbnail: "/img/product-1.jpg",
        desc: "Bracket Fender LH FR",
        salesPrice: 403.20000000000005,
        productNumber: "53878-0C040",
        manufacturer: {
          id: 3,
          name: "Toyota",
          nameAr: "تويوتا",
          categoryId: 1,
          groupId: 1,
          genuine: true,
          imageMain: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-main.png",
          imageThumbnail: "/img/product-1.jpg",
        },
      },
      {
        id: 13019,
        imageThumbnail: "/img/product-1.jpg",
        desc: "Bracket Fender LH FR",
        salesPrice: 403.20000000000005,
        productNumber: "53878-0C040",
        manufacturer: {
          id: 3,
          name: "Toyota",
          nameAr: "تويوتا",
          categoryId: 1,
          groupId: 1,
          genuine: true,
          imageMain: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-main.png",
          imageThumbnail: "/img/product-1.jpg",
        },
      },
      {
        id: 13019,
        imageThumbnail: "/img/product-1.jpg",
        desc: "Bracket Fender LH FR",
        salesPrice: 403.20000000000005,
        productNumber: "53878-0C040",
        makeId: 2,
        manufacturer: {
          id: 3,
          name: "Toyota",
          nameAr: "تويوتا",
          categoryId: 1,
          groupId: 1,
          genuine: true,
          imageMain: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-main.png",
          imageThumbnail: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-thumbnail.png",
        },
        group: null,
        imageMain: "http://qtest.fareed9.com:8081/image-provider/product/0/1/3/13019/13019-main.png",
        tags: null,
        reviews: null,
        averageRating: null,
        specs: null,
      },
      {
        id: 13019,
        imageThumbnail: "/img/product-1.jpg",
        desc: "Bracket Fender LH FR",
        salesPrice: 403.20000000000005,
        productNumber: "53878-0C040",
        makeId: 2,
        manufacturer: {
          id: 3,
          name: "Toyota",
          nameAr: "تويوتا",
          categoryId: 1,
          groupId: 1,
          genuine: true,
          imageMain: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-main.png",
          imageThumbnail: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-thumbnail.png",
        },
        group: null,
        imageMain: "http://qtest.fareed9.com:8081/image-provider/product/0/1/3/13019/13019-main.png",
        tags: null,
        reviews: null,
        averageRating: null,
        specs: null,
      },
      {
        id: 13019,
        imageThumbnail: "/img/product-1.jpg",
        desc: "Bracket Fender LH FR",
        salesPrice: 403.20000000000005,
        productNumber: "53878-0C040",
        makeId: 2,
        manufacturer: {
          id: 3,
          name: "Toyota",
          nameAr: "تويوتا",
          categoryId: 1,
          groupId: 1,
          genuine: true,
          imageMain: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-main.png",
          imageThumbnail: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-thumbnail.png",
        },
        group: null,
        imageMain: "http://qtest.fareed9.com:8081/image-provider/product/0/1/3/13019/13019-main.png",
        tags: null,
        reviews: null,
        averageRating: null,
        specs: null,
      },
      {
        id: 13019,
        imageThumbnail: "/img/product-1.jpg",
        desc: "Bracket Fender LH FR",
        salesPrice: 403.20000000000005,
        productNumber: "53878-0C040",
        makeId: 2,
        manufacturer: {
          id: 3,
          name: "Toyota",
          nameAr: "تويوتا",
          categoryId: 1,
          groupId: 1,
          genuine: true,
          imageMain: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-main.png",
          imageThumbnail: "http://qtest.fareed9.com:8081/image-provider/manufacturer/1/1/3/3-thumbnail.png",
        },
        group: null,
        imageMain: "http://qtest.fareed9.com:8081/image-provider/product/0/1/3/13019/13019-main.png",
        tags: null,
        reviews: null,
        averageRating: null,
        specs: null,
      },
    ]
    return (
      <section className={this.props.className} id="render-products">
        <h1>{this.props.header}</h1>
        <Slider {...constant.sliderSetting}>
          {
            data.map((product, idx) => (
              <a href="" key={idx} className="card">
                <img className="card-img-top" src={product.imageThumbnail} alt="product" />
                <div className="card-body">
                  <h5 className="card-title">{product.desc}</h5>
                  <p className="product-brand">{product.manufacturer.name}</p>
                  <div className="product-review">
                    <Stars values={product.averageRating} {...constant.starsRating} />
                    <span className="total-review">{getLength(product.reviews)} review</span>
                  </div>
                  <p className="price">
                    {product.salesPrice.toFixed(2)} <span className="currency">SR</span>
                  </p>
                </div>
              </a>
            ))
          }
        </Slider>
      </section>
    )
  }
}
