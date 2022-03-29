import React, { useEffect } from 'react';

import $ from 'jquery'

import './more.scss';
import { PropTypes } from 'prop-types';

const listMore=[
    {
        title:"Add to list",
        class:"bx bx-list-plus"
    },
    {
        title:"Favorite",
        class:"bx bxs-heart"
    },
    {
        title:"Watchlist",
        class:"bx bxs-bookmark-star"
    },
    {
        title:"Your Rating",
        class:"bx bxs-star"
    }
];

const More = ({className,isActive}) => {

  return (
    <div className={`more ${className}` }>
        <div className={`more__content `}>
            <ul className='more__content__list'>
                {
                    listMore.map((e,index)=>{
                        return(
                            <li key={index}>
                            <i className={e.class}></i>
                            <div>{e.title}</div>
                            </li>
                        )
                    })
                }
            </ul>
    </div>
    </div>
    
  )
}
More.propTypes = {
    onClick:PropTypes.func,
}

export default More