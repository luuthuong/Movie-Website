import React ,{useRef}from 'react'
import { ButtonMore, ButtonOutLine } from '../button/Button';
import { Link } from 'react-router-dom';
import './card.scss';
import $ from 'jquery'


import {Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import apiConfig from '../../api/apiConfig';
import Pie from '../pie/Pie';
import More from '../more/More';

const Card = (props) => {
    const item=props.items;
    let imgRef=useRef();
    let moreRef=useRef();

    const getSrcImgElement=(src,ele) => {
        // $('.section__content').css('background-image', `url(${src})`)
        $(`.${props.classNameHover}`).css('background-image', `url(${src})`)
    }
    const getDate=(inDate) => {
        const date = new Date(inDate);
        return date.toDateString()
    }

  return (
        <div className="section">
        <div className="section__title">
            <h2>{props.title}</h2>
            <Link to={`/${props.cate}`}>
            <ButtonOutLine className="btn__trending">View All</ButtonOutLine>
            </Link>
        </div>
        <div className={`section__content ${props.classNameHover}`}>
            <Swiper 
                    modules={[Virtual,Pagination,Navigation]} 
                    slidesPerView={5}
                    slidesPerGroup={5}
                    speed={1000}
                    virtual
                    breakpoints={{
                        300: {
                            slidesPerView: 1,
                            slidesPerGroup:1,
                            speed:1000
                        },
                        600: {
                            slidesPerView: 2,
                            slidesPerGroup:2,
                        },
                        768: {
                            slidesPerView: 3,
                            slidesPerGroup:3,
                        },
                        1024: {
                            slidesPerView: 4,
                            slidesPerGroup:4,
                        },
                    }}
            >
            {item.map((e,index,c) => {
                return(
                    <SwiperSlide key={index}>
                        {({isVisible})=>{
                            return(
                                <div className="trending__view">
                                <div className="trending__view__card">
                                <img
                                    onMouseOver ={()=>getSrcImgElement(apiConfig.originalImage(e.backdrop_path))}  
                                    ref={imgRef}
                                    alt="Video Trending"
                                    className="trending__view__card__img"  
                                    src={apiConfig.w500Image(e.poster_path)} 
                                />
                                <div className="trending__view__card__more">
                                    <ButtonMore 
                                        className="trending__view__card__more__button"
                                        onClick={()=>{
                                            moreRef.current=index;
                                            // &&$('.more__container').toggleClass('active')
                                        }}
                                    />
                                    <More className={`more__container ${c[index].id!==e.id?'active':''}`} ></More>
                                </div>
                                
                                </div>
                                
                                <div className="trending__view__content">
                                    <div className="trending__view__content__percent">
                                    <Pie className="circle__percent" percent={e.vote_average*10}/>
                                    </div>
                                    <div className="trending__view__content__title">
                                    {e.title}
                                    </div>
                                    <span className="trending__view__content__date">{getDate(e.release_date||e.first_air_date)}</span>
                                </div>
                            </div>
                            )
                        }}
                        
                    </SwiperSlide>
                )
            })}
            </Swiper>
        </div>
        </div>
);
}

export default Card