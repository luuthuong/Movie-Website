import React ,{useEffect,useRef,useState} from 'react'

import SwiperCore,{Autoplay, Scrollbar,Pagination,Navigation} from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import './slide.scss'

import $ from 'jquery'

import { useLocation ,useNavigate} from 'react-router-dom';
import Button from '../button/Button'

import mvdbApi from '../../api/mvdpApi';
import apiConfig from './../../api/apiConfig';
import { ButtonOutLine } from './../button/Button';
import Trailer ,{TrailerContent} from '../trailer/Trailer'
import Selector from './../selector/Selector';
import { category } from './../../api/mvdpApi';
import Card from '../cardSlide/Card';

const Slide = (props) => {

	let nav=useNavigate();
	const iframeRef=useRef();
	const [cateType,setCateType]=useState(category.movie);
	const [APIMovie, setAPIMovie] = useState([]);
	const [APITrending,setAPITrending] = useState([]);
	const [APITopRate,setAPITopRate] = useState([]);
	// Set Type of Category
	const SetTypePopular=(type,className1,className2)=>{
		$(className1).toggleClass('active')
		$(className2).removeClass('active')
		setCateType(type);
	}
	useEffect(() => {
	// Get API Movies
		mvdbApi.movie.getPopular(cateType).then((res) => {
		setAPIMovie(res.results);
		});
	// Get Trending Video
		mvdbApi.trending.getTrending(cateType).then((res) => {
		setAPITrending(res.results);
		});
	// Get TopRate Video
		mvdbApi.toprate.getTopRated(cateType).then((res) => {
		setAPITopRate(res.results);
		});
	}, [cateType]);

const SlideItem= (props) => {

	const item=props.items;
	const backgroundItem=apiConfig.originalImage(item.backdrop_path?item.backdrop_path:item.poster_path);
	const poster=apiConfig.w500Image(item.poster_path?item.poster_path:item.backdrop_path);
	
	const setPreviewTrailer=async() => {
		$('.slide__item__content').toggleClass('blur');
		$('.trailer').toggleClass('active');
		const videoInfor = await mvdbApi.movie.getVideos(cateType,item.id)
		if(videoInfor.results.length>0){
			const urlEmbedVideo=apiConfig.embedVideo(videoInfor.results[0].key);
			$('.trailer > .trailer__content > iframe').attr('src',urlEmbedVideo);
		}
		else{
			$('.Trailer').text('Video Trailer not found')
		}
		
	}
	return (
		<div
			className={`slide__item ${props.className}`}
			style={{
				backgroundImage: `url(${backgroundItem})`,
			}}
			>
			<div className="slide__item__content container">
				<div className="slide__item__content__infor">
					<h2 className="title">{item.title}</h2>
					<div className="overview">{item.overview}</div>
					<div className="btnGroup">
						<Button className="btn-watchnow" onClick={() => nav(`movie/${item.id}`)}>Watch Now</Button>
						<ButtonOutLine className="btn-preview" onClick={setPreviewTrailer} >Preview Trailer</ButtonOutLine>
					</div>
				</div>
				<div className="slide__item__content__poster">
					<img src={poster} alt="" />
				</div>
			</div>
		</div>
  );
}
const CloseIframe=()=>{
	$('.slide__item__content').removeClass('blur');
	$('.trailer__content').parent().removeClass('active')
	$('.trailer__content').children('iframe').attr('src','');
}
return (

	<>
		<div className="slide">
		<Selector>
			<button className="type__movie active" onClick={() =>SetTypePopular(category.movie,".type__movie",".type__tv")}>Movies</button>
			<button className="type__tv" onClick={() =>SetTypePopular(category.tv,".type__tv",".type__movie")}>TV</button>			
		</Selector>
		<Swiper
				spaceBetween={0}
				slidesPerView={1}
				grabCursor={true}
				modules={[Autoplay,Pagination,Navigation]}
				keyboard={
					{
						enabled: true,
						pageUpDown:true,
						onlyInViewport:false,
					}
				}
				speed={1000}
				loop={true}
				loopFillGroupWithBlank={true}
				pagination={{ 
					clickable:true
				}}
				navigation={true}
				className={"slide__overview"}
		>
		{
			APIMovie.map((item,index)=>{
					return(
						<SwiperSlide key={index} >			
						{({ isActive }) => (
								<SlideItem items={item} className={isActive?'active':''}/>
						)}
						</SwiperSlide>
					)
				}
			)
		}
		
		</Swiper>
		<Trailer id="video__trailer">

			<TrailerContent
				onClose={CloseIframe}
				>
			<iframe 
			ref={iframeRef}
			className="frameTrailer"
					src="" 
					frameBorder={0} 
					title="Trailer"
					/>
			</TrailerContent>
		</Trailer>
	</div>
	<Card 
			title={`${cateType.toUpperCase()} Trending`} 
			items={APITrending}
			classNameHover="trending"
			cate={cateType}
			/>
	<Card 
			title={`${cateType.toUpperCase()} Top Rated`} 
			items={APITopRate}  
			classNameHover="topRated"
			cate={cateType}
			/>
	</>

);
};

export default Slide