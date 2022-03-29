import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import './viewdetail.scss'
import Pie from './../pie/Pie';
import apiConfig from './../../api/apiConfig';
import mvdbApi from '../../api/mvdpApi'
import './viewdetail.scss'
import Button,{ButtonOutLine} from './../button/Button';

import SwiperCore,{Autoplay,Virtual, Scrollbar,Pagination,Navigation} from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useParams } from 'react-router-dom';
import Card from './../cardSlide/Card';

const funcSymbol=[
    {
        title:'Add to list',
        className:'bx bx-list-ul'
    },
    {
        title:'Mark as favorite',
        className:'bx bxs-heart'
    },
    {
        title:'Add to your watchlist',
        className:'bx bxs-bookmark'
    },
    {
        title:'Rate It!',
        className:'bx bx-star'
    }
]

const FuncSymbol=(props) => {

    return(
            <div className="func__symbol">
                <div className="func__symbol__vote">
                    <Pie className="func__symbol__vote__pie" percent={props.pct}/>
                    <div>User Score</div>
                </div>
                {
                    funcSymbol.map((e,index)=>{
                        return (
                            <div key={index}>
                            <div className="symbol">
                                <i className={e.className}></i>
                            </div>
                            {/* <div>{e.title}</div> */}
                            </div>
                        )
                    })
                }
            </div>
    )
}
const Header= (props)=>{
    let item=props.item;
    return(
        <div 
            style={{backgroundImage:`url(${apiConfig.originalImage(item.backdrop_path)})`}}
            className="view-detail__header">

            <div className="view-detail__header__poster">
                <div   
                    style={{backgroundImage:`url(${apiConfig.w500Image(item.poster_path)})`}}
                    className="view-detail__header__poster__img" ></div>
                <i className='bx bx-expand'></i>
                <div className="view-detail__header__poster__container">
                    {

                    }
                </div>
            </div>

            <div 
                className="view-detail__header__infor"
            >
                <div className="infor__title">
                    <div className="infor__title__header">
                        {item&&item.original_title}
                    </div>
                    <div className="infor__title__generator">
                        <div className="release__date">
                            {
                            new Date(item.release_date).toDateString()}
                        </div>
                        <div className="genres">
                            {
                                item.genres.map((e,index) =>{
                                return <ButtonOutLine 
                                    className="genres__button" 
                                    key={index} 
                                >
                                    {e.name}
                                </ButtonOutLine>
                                })
                            }
                        </div>
                    </div>
                </div>
                <FuncSymbol pct={item.vote_average*10}/>
                <div className="tagline">
                    {item.tagline}
                </div>
                <div className="overview">
                    {item.overview}
                </div>
            </div>
    </div>
    )
}

const TopBillCast=(props) => {
        return (
        <div className="listcast">
            <Swiper
            modules={[Virtual, Pagination, Navigation]}
            slidesPerView={7}
            slidesPerGroup={7}
            speed={2000}
            virtual
            spaceBetween={10}
            grabCursor={true}
            pagination={{
                type: 'bullets',
            }}
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
                    slidesPerView: 4,
                    slidesPerGroup:4,
                },
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup:3,
                },
                1920: {
                    slidesPerView: 5,
                    slidesPerGroup:5,
                },
            }}
        >
            {
                props.item.cast.map((e,index) =>{
                return (
                    <SwiperSlide key={e.name} virtualIndex={index} >
                        <div className="cast__container">
                            <img 
                                src={e.profile_path?apiConfig.w500Image(e.profile_path):"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200"} 
                                className="cast__container__img"
                                alt=""/>
                            <div className="cast__container__infor">
                            <div className="cast__name">{e.name}</div>
                            <div className="cast__origin">{e.original_name}</div>
                            <div className="cast__charac">{e.character}</div>
                            </div>
                        </div>
                        </SwiperSlide>
                    );
                })
            }
            
        </Swiper>
        </div>
        );
}

const Social=(props) => {
        return(
            props.item.results.map((e,index) =>{
            return(
                index<props.view&&
                    <div 
                        key={index} 
                        className="view-detail__social__content">
                    <div className="view-detail__social__content__header">
                        <div className="view-detail__social__content__infor">
                        <img src={"https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt="" />
                        <div className="infor__title">
                            <div className="infor__name">
                                    <div>A review by <span>{e.author_details.name||e.author}</span> </div>
                                </div>
                                <div className="infor__time__create">
                                    <div>Writen by <span>{e.author_details.name||e.author}</span> on <span>{new Date( e.created_at).toUTCString()}</span> </div>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div className="view-detail__social__content__main">
                        {e.content}
                    </div>
                </div>
                )
            })
        )   
}

const Media=({video}) => {
    return(
        <div className="detail-media">
            <Swiper 
                modules={[Autoplay,Virtual, Pagination, Navigation]}
                slidesPerView={2}
                slidesPerGroup={2}
                speed={3000}
                virtual
                spaceBetween={0}
                centeredSlides={true}
                navigation={true}
                grabCursor={true}
                autoplay={{
                delay:5000
                }}

                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        slidesPerGroup:1,
                        speed:1000
                    },
                    600: {
                        slidesPerView: 1,
                        slidesPerGroup:1,
                    },
                    768: {
                        slidesPerView: 1,
                        slidesPerGroup:1,
                    },
                    1024: {
                        slidesPerView: 2,
                        slidesPerGroup:2,
                    },
                }}
            >
                {
                    video.results.map((e,index)=>{

                        return(
                            <SwiperSlide
                            key={index}
                            // virtualIndex={index}
                            >
                            <div className="video-frame">
                                    <iframe title="Trailer" src={apiConfig.embedVideo(e.key)} frameBorder="0"></iframe>
                                </div>
                            </SwiperSlide>  
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

const ViewDetail = props => {
    let {category,key}=useParams();
    const [cast,setcast]=useState();
    const [review,setReview]=useState();
    const [video,setVideo]=useState();
    const [view,setView]=useState(1);
    const [similar,setSimilar]=useState();
    const [recomend,setRecomend]=useState();
    const url=(keysearch)=>`${apiConfig.baseURL}${category}/${key}/${keysearch}?api_key=${apiConfig.apiKey}`

    const getReview = () => {
        mvdbApi.getDetail(url('reviews')).then(res=>{
            setReview(res);
        })
    };
    const getDetail = () => {
        mvdbApi.getDetail(url('credits')).then(res=>{
        setcast(res);
        })
    };
    
    const getVideos = () => {
        mvdbApi.getDetail(url('videos')).then(res=>{
            setVideo(res);
        })
    }
    const getSimilar = () => {
        mvdbApi.getDetail(url('similar')).then(res=>{
            setSimilar(res);
        })
    }
    const getRecomend = () => {
        mvdbApi.getDetail(url('recommendations')).then(res=>{
            setRecomend(res);
        })
    }


    useEffect(() => {
        getDetail();
        getReview();
        getVideos();
        getSimilar();
getRecomend();

},[props.item.id])

    const onView=() => {
        setView(prev=>prev<review.results.length? prev+1:1)
    }


        return (
        <div className="view-detail">
            <Header item={props.item} />
            {similar&&recomend&&cast && review&& video&& (
            <>
                <div className="view-detail__left">
                <div className="view-detail__left__cast">
                    <h1>
                    Actors in <span>{props.item.original_title}</span>{" "}
                    </h1>
                    <TopBillCast item={cast} />
                </div>
                </div>
                <div className="view-detail__social">
                    <div                                   
                        className="view-detail__social__header">
                        <h2 className="Social">Social Reviews</h2>
                    </div>
                    <Social view={view} item={review}/>
                    <Button 
                    className="btn-review-more"
                    onClick={onView}
                    >{view<review.results.length?"View More":"Conslapse"}</Button>
                </div>
                <div className="view-detail__media">
                    <div className="view-detail__media__header" >
                        <h2>Trailer Media</h2>
                    </div>
                    <div className="view-detail__media__content">
                        <Media video={video}/>
                    </div>
                </div>
                <div className="view-detail__media">
                    <div className="view-detail__media__header" >
                        <h2>Similar Media</h2>
                    </div>
                    <div className="view-detail__media__content">
                        <Card items={similar.results} />
                    </div>
                </div>
                <div className="view-detail__media">
                    <div className="view-detail__media__header" >
                        <h2>Recomendations Media</h2>
                    </div>
                    <div className="view-detail__media__content">
                        <Card items={recomend.results} />
                    </div>
                </div>
                
            </>
            )}
        </div>
        );
}
ViewDetail.propTypes = {}

export default ViewDetail