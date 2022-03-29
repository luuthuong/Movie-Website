import {useRef,useEffect,useState} from 'react';
import { useLocation,Link } from 'react-router-dom';
import $ from 'jquery'
import './header.scss';
import logo from '../../Image/logo.png'


const headerNav = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "Movies",
        path: "/movie",
    },
    {
        display: "TV Shows",
        path: "/tv",
    },
    ];

const Header = () => {
const { pathname } = useLocation();
const headerRef = useRef(null);
const active = headerNav.findIndex((e, i) =>{
   return e.path === pathname
});


return (

    <div ref={headerRef} className="header">
    <div className="header__wrap container">
        <div className="logo">
        <Link className="header__title" to="/">
        <img
            src={logo}
            alt="Movies"
        />
        </Link>
        </div>
        <div className="header__nav">
        <ul>
            {headerNav.map((item, index) => {
            return (
                <li
                key={index}
                className={active === index ? "active" : ""}
                >
                <Link to={item.path}>
                    <span>{item.display}</span>
                </Link>
                </li>
            );
            })}
        </ul>
        </div>
    </div>
    </div>
);
};

export default Header