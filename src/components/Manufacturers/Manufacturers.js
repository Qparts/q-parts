import React, { Component } from 'react'
import Card from '../UI/Card/Card';
import CardMedia from '../UI/Card/CardMedia/CardMedia';

export class Manufacturers extends Component {

    render() {
        return (
            <div className="row">
                {
                    this.props.products.map((product, idx) => (

                        <div key={idx} className="col-md-2 col-4 brand-container">
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={"/img/bridgestone.png"}
                                    title="Contemplative Reptile"
                                />
                            </Card>
                        </div>

                    ))
                }
            </div>
        )
    }
}

export default Manufacturers
