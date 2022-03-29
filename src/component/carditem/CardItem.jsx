import React ,{useState,useEffect}from 'react'
import Button from './../button/Button';
import apiConfig from './../../api/apiConfig';
import './carditem.scss'
import { Link, useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
const CardItem = (props) => {

    return (
        <Link to="">
            <div className="card-container">
                <div
                className="card-item"
                style={{
                    backgroundImage: `url(${apiConfig.w500Image(props.pathImage)})`,
                }}
                >
                <div className="card-item__button">
                    <Button onClick={props.onDetail} className="button">
                    <i className="bx bxl-youtube"></i>
                    </Button>
                </div>
                </div>
                <div className="infor-item">
                    <h4>{props.title}</h4>
                </div>
            </div>
        </Link>
    );
}

CardItem.propTypes={
onDetail: PropTypes.func
}

export default CardItem