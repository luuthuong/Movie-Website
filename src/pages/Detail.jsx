import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ButtonOutLine } from '../component/button/Button';
import CardItem from './../component/carditem/CardItem';
import ViewDetail from './../component/viewDetail/ViewDetail';
import apiConfig from './../api/apiConfig';
import mvdbApi from './../api/mvdpApi';

const Detail = () => {
  let {category,key}=useParams();
  const [detail,setDetail]=useState();
  const url=  `${apiConfig.baseURL}${category}/${key}?api_key=${apiConfig.apiKey}`

  useEffect(() => {
    const getDetail = () => {
      mvdbApi.getDetail(url).then(res=>{
        setDetail(res);
      })
    };
    getDetail();
  }, [category, key]);

  return (
    <div>
      {
      detail&&   <ViewDetail item={detail}/>
      }
    </div>
  )
}

export default Detail