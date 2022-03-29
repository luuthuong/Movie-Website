import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const Button = ({ className, onClick ,children}) => {
    return (
        <button
        className={`btn ${className}`}
        onClick={onClick}
        >
        {children}
        </button>
    );
    };
export const ButtonOutLine = ({ className, onClick ,children}) => {
    return (
        <Button
        className={`btn-outline ${className}`}
        onClick={onClick}
        >
        {children}
        </Button>
    );
    };
ButtonOutLine.propTypes ={
    onClick:PropTypes.func
}
Button.propTypes = {
    onClick: PropTypes.func
}

export const ButtonMore=({onClick,className}) => {
    return(
        <div className={className}>
        <button onClick={onClick} className="more__button">
        <i className='bx bx-dots-horizontal-rounded bx-cover'></i>
        </button>
        </div>

    )
}
ButtonMore.propTypes={
    onClick: PropTypes.func,
}
export default Button