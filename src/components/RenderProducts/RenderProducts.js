import React, { Component, Fragment } from 'react';
import Slider from "react-slick";
import Stars from 'react-stars';
import * as constant from '../../constants';
import { getLength } from '../../utils/array';
import {
  Card, CardTitle, ListGroupItem, ListGroup, CardImg
} from 'reactstrap';
import Title from '../UI/Title';

export default class RenderProducts extends Component {

  extras = (product) => {
    return true ? (
      <Fragment>
        <span className="seperator" />
        <span className="product-extras">Size(215/60 R17)</span>
      </Fragment>
    ) : null;
  }

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
      <section className={this.props.className}>
        {
          this.props.isListView ? (
            <Fragment>
              <Card className={this.props.cardClass}>
                <CardTitle>
                  <Title header={this.props.header} />
                </CardTitle>
                <ListGroup>
                  {
                    this.props.products.map((product, idx) => (
                      <ListGroupItem key={idx}>
                        <div className={this.props.imageClass}>
                          <CardImg src="/img/product-2.jpg" alt="car image" />
                        </div>
                        <div>
                          <h5 className="product-title">{product.desc}</h5>
                          <div>
                            <span className="product-manufacturer">{product.brand.name}</span>
                            {this.extras(product)}
                          </div>
                          <div className="product-review_list">
                            <Stars values={product.averageRating} {...constant.starsRating} />
                            <span className="product-review">{getLength(product.reviews)} review</span>
                          </div>
                          <span className="product-price">{product.salesPrice.toFixed(2)}</span>
                          <span className="product-currency">SR</span>
                        </div>
                      </ListGroupItem>
                    ))
                  }
                </ListGroup>
              </Card>
            </Fragment>
          ) :
            <Fragment>
              <h4>{this.props.header}</h4>
              <Slider {...constant.sliderSetting}>
                {
                  this.props.products.map((product, idx) => (
                    <Card body key={idx} className="border">
                      <CardImg top src="/img/product-2.jpg" alt="car image" />
                      <CardTitle className="product-title">{product.desc}</CardTitle>
                      <div>
                        <span className="product-manufacturer">{product.brand.name}</span>
                        {this.extras(product)}
                      </div>
                      <div className="product-review_slide">
                        <Stars values={product.averageRating} {...constant.starsRating} />
                        <span className="product-review">{getLength(product.reviews)} review</span>
                      </div>
                      <span className="product-price">{product.salesPrice.toFixed(2)}</span>
                      <span className="product-currency">SR</span>
                    </Card>
                  ))
                }
              </Slider>
            </Fragment>
        }
      </section>
    )
  }
}

//       <section className={this.props.className}>
//         {
//           this.props.isListView ? (
//             <Fragment>
//               <Card className={this.props.cardClass}>
//                 <CardTitle>
//                   <Title header={this.props.header} />
//                 </CardTitle>
//                 <ListGroup>
//                   {
//                     this.props.products.map((product, idx) => (
//                       <ListGroupItem key={idx}>
//                         <div className={this.props.imageClass}>
//                           <CardImg src="/img/product-2.jpg" alt="car image" />
//                         </div>
//                         <div>
//                           <h5 className="product-title">{product.desc}</h5>
//                           <div>
//                             <span className="product-manufacturer">{product.manufacturer.name}</span>
//                             {this.extras(product)}
//                           </div>
//                           <div className="product-review_list">
//                             <Stars values={product.averageRating} {...constant.starsRating} />
//                             <span className="product-review">{getLength(product.reviews)} review</span>
//                           </div>
//                           <span className="product-price">{product.salesPrice.toFixed(2)}</span>
//                           <span className="product-currency">SR</span>
//                         </div>
//                       </ListGroupItem>
//                     ))
//                   }
//                 </ListGroup>
//               </Card>
//             </Fragment>
//           ) :
//             <Fragment>
//               <h4>{this.props.header}</h4>
//               <Slider {...constant.sliderSetting}>
//                 {
//                   this.props.products.map((product, idx) => (
//                     <Card body key={idx} className="border">
//                       <CardImg top src="/img/product-2.jpg" alt="car image" />
//                       <CardTitle className="product-title">{product.desc}</CardTitle>
//                       <div>
//                         <span className="product-manufacturer">{product.manufacturer.name}</span>
//                         {this.extras(product)}
//                       </div>
//                       <div className="product-review_slide">
//                         <Stars values={product.averageRating} {...constant.starsRating} />
//                         <span className="product-review">{getLength(product.reviews)} review</span>
//                       </div>
//                       <span className="product-price">{product.salesPrice.toFixed(2)}</span>
//                       <span className="product-currency">SR</span>
//                     </Card>
//                   ))
//                 }
//               </Slider>
//             </Fragment>
//         }

//       </section>