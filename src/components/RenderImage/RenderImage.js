import React, { Component } from 'react';

class RenderImage extends Component {

    render() {
        
        return (
            <div className="RenderImage">
                <img
                    style={{ height: '165px' }}
                    src={this.props.input.value}
                    alt="no vehicle found" />
            </div>
        );
    }
}

export default RenderImage;