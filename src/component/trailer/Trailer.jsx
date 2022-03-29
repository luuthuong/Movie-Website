import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import 'boxicons'

import './trailer.scss'


    const Trailer = (props) => {
    return (
        <div id={props.id} className={`trailer`}>
        {props.children}
        </div>
    );
    };

Trailer.propTypes = {
    id:PropTypes.string
}

    export const TrailerContent = (props) => {

    return (
        <div className="trailer__content">
        {props.children}
        <div  className="trailer__content__close" onClick={props.onClose}>
            <i className="bx bx-x"></i>
        </div>
        </div>
    );
    };
    TrailerContent.propTypes = {
        onClose: PropTypes.func,
    };


export default Trailer