import React ,{useState,useEffect} from 'react'

import mvdbApi,{category} from '../../api/mvdpApi'

import Button,{ ButtonOutLine } from './../button/Button';
import apiConfig from './../../api/apiConfig';
import CardItem from '../carditem/CardItem';

import $ from 'jquery'
// CSS
import './movie.scss';
import { useParams, useNavigate } from 'react-router-dom';

const Movie = ({cate}) => {
    const [item,setItem]=useState([]);
    const [page,setPage]=useState(1);
    let navigate=useNavigate();
    let {keyword}=useParams();
    useEffect(()=>{
        window.scrollTo({top:0,behavor: 'smooth'});
        const getList=() => {
            if(keyword===undefined){
                switch (cate){
                    case 'movie':
                        mvdbApi.movie.getPopular(cate,1).then((res)=>{
                            setItem(res.results);
                        })
                        break;
                    default:
                        mvdbApi.tv.getAiringToday(cate,1).then((res)=>{
                            setItem(res.results);
                        })
                }
            }
            else{
                mvdbApi.search(cate,keyword,page).then((res)=>{
                    setItem(res.results);
                })
            }
            
        }
        getList();
    },[cate,keyword])

const onLoadMovie=() => {
    setPage(page+1);

    const getList=() => {
        if(keyword===undefined){
            switch (cate){
                case 'movie':
                    mvdbApi.movie.getPopular(cate,page).then((res)=>{
                        setItem([...item,...res.results]);
                    })
                    break;
                default:
                    mvdbApi.tv.getAiringToday(cate,page).then((res)=>{
                        setItem([...item,...res.results]);
                    })
            }
        }
        else{
            mvdbApi.search(cate,keyword,page).then((res)=>{
                setItem([...item,...res.results]);
            })
        }
    }
    getList();
}

  return (
    <div className="overview">
        <div className="overview__item">
            {
                item.map((e,index)=>{
                    return(
                        <CardItem 
                        onDetail={(event)=>{
                            event.preventDefault()
                            navigate(`/${cate}/detail=${e.id}`)
                        }}
                        key={index}
                        pathImage={e.poster_path}
                        title={e.title||e.original_name}
                        />
                    )
                })
            }
        </div>
        <div className="overview__button">
        <ButtonOutLine className="overview__button__more" onClick={onLoadMovie}>Load  More</ButtonOutLine>
        </div>
    </div>
  )
}

export default Movie