import React,{useState} from "react";
import './footer.scss';
// import 'boxicons'

const listSocial=[
    {
        link:"/",
        className:'bx bxl-facebook-circle'
    },
    {
        link:"/",
        className:'bx bxl-instagram'
    },
    {
        link:"/",
        className:'bx bxl-skype'
    },
    {
        link:"/",
        className:'bx bxl-youtube'
    },
]

const footerContent = [
    {
        title:"the basics",
        content:["Audio and Subtitles","Media Center","Privacy","Contact Us"]
    },
    {
        title:"get involved",
        content:["Audio description","Investor relations","Legal Notices"]
    },
    {
        title:"comunity",
        content:["Audio and Subtitles","Media Center","Privacy","Contact Us"]
    },
    {
        title:"legal",
        content:["Gift Cards","Tearm of Use","Comporate Information"]
    }
]
const Footer = () => {

    return (
        <footer>
            <div className="footer">
                <div className="footer__social">
                    {listSocial.map((e, index) => {
                    return (
                        <a className="footer__social__link" key={index} href={e.link}>
                        <i className={e.className}></i>
                        </a>
                    );
                    })}
                </div>
                <div className="footer__content">
                    {footerContent.map((e, index) => {
                    return (
                        <div key={index}>
                        <div className="title">
                            <h3>{e.title.toUpperCase()}</h3>
                        </div>
                        <div className="content">
                            {e.content.map((item, id) => (
                            <a href="/" key={id}>
                                {item}
                            </a>
                            ))}
                        </div>
                        </div>
                    );
                    })}
                </div>
                <div className="footer__copyright">
                    <a href="/">
                        <i className="bx bx-copyright"></i>
                        <span>luuthuong20022000@gmail.com</span>
                    </a>
                </div>
            </div>
        </footer>
        );
};

export default Footer;