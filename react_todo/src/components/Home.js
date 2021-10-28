import React, {useState} from 'react';
import './../static/css/Home.css';
import HomeSvg from './../static/svg/home3.svg'
import {BrowserRouter as Router, Link} from 'react-router-dom';



const Home = (props)=>{
    const [activeElement, setActiveElement] = useState();




    const mouseEnter = (e)=>{
        setActiveElement(e.target.getAttribute("name"))
    }

    const mouseLeave = ()=>{
        setActiveElement('')
    }


    return(
        <React.Fragment>
            <div className = "navbar_container">
                <img src = {HomeSvg} className = "HomeSvg"/>
                <div className = "right-side-container">
                    <div className = "navs">
                        <nav name = "home" onMouseEnter = {mouseEnter} onMouseLeave = {mouseLeave} className = {`${activeElement == 'home' ? 'active' : ''} nav`}>خانه</nav>
                        <nav name = "profile" onMouseEnter = {mouseEnter} onMouseLeave = {mouseLeave} className = {`${activeElement == 'profile' ? 'active' : ''} nav`}>پروفایل</nav>
                        <nav name = "login" onMouseEnter = {mouseEnter} onMouseLeave = {mouseLeave} className = {`${activeElement == 'login' ? 'active' : ''} nav`}>ورود/عضویت</nav>
                        <nav name = "contact-dev" onMouseEnter = {mouseEnter} onMouseLeave = {mouseLeave} className = {`${activeElement == 'contact-dev' ? 'active' : ''} nav`}>ارتباط با برنامه نویس سایت</nav>
                    </div>
                    <div className = "task-system">
                        <p>
                            سیستم مدیریت وظیفه ها یکی از بهترین سیستم های نظم بخشیدن به امور روزمره بدون فراموشی و جا انداختن کار ها
                        </p>
                    </div>
                    <div className = "manage-text">
                        <p>
                            با سایت مدیریت وظیفه به راحتی میتونین کارهای روزمره خودتون رو با دسته بندی مدیریت بکنین
                        </p>
                        <Link  to = "/login" className = "manage-start">شروع</Link>
                    </div>
                </div>
            </div>


        </React.Fragment>
    )
}


export default Home;
