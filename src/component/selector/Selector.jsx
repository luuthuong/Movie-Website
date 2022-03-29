import React ,{useEffect,useState} from 'react'
import './selector.scss';
import $ from 'jquery'


    const Selector = (props) => {
        setInterval(() =>{
            window.scrollY>100? $('.selector').children('h2').css('display', 'none'):$('.selector').children('h2').css('display', 'block')
        },500)
    return (
        <div className="selector">
            <h2>What's Popular</h2>
            <div className="selector__wrap__content">
                {props.children}
            </div>
        </div>
    );
    };

export default Selector