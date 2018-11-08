import React from 'react'

const prevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <i className="icon-arrow-left" />
        </div>
    );
}

export default prevArrow;