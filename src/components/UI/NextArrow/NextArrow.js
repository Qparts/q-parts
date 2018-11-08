import React from 'react'

const nextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <i className="icon-arrow-right" />
        </div>
    );
}

export default nextArrow;