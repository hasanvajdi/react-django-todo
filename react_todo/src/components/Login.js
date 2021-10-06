import React from 'react';
import './../static/css/Login.css';
import Vector from './../static/svg/login.svg';
import { AiOutlineWhatsApp, AiOutlineSend, AiOutlineInstagram,
        AiFillLock, AiFillGithub, AiOutlineGoogle} from "react-icons/ai";
import {Form, Input, Button, Row, Col, Divider, Modal} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Link, Redirect,} from 'react-router-dom'
import Cookies from 'universal-cookie';



const Login = (props)=>{
    const cookies = new Cookies();

    const error = ()=>{
        Modal.error({
            title : "نام کاربری یا رمز عبور اشتباه می باشد!",
            okText : "متوجه شدم",
            okType : 'danger'
        })
    }

    const onFinish = (data)=>{
        axios.post("http://localhost:8000/dj_rest/login/", data)
        .then(result=>{
            cookies.set("access", `${result.data.access_token}`, { path: '/' })
            cookies.set("refresh", `${result.data.refresh_token}`, { path: '/' })
            window.location.replace("/profile");

        })
        .catch(err=>{
            if (err.message === "Request failed with status code 400"){
                error()
            }
        })



    }

    const onFinishFailed = ()=>{
        console.log("failed")
    }


    return(
        <React.Fragment>

                <div className = "login_container" >
                    <div className = "vector_container">
                        <img src = {Vector} className = "login-vector"/>
                    </div>

                    <div className = "form_container">
                        <span className = "login-icon">ورود</span>

                        <Form
                            name = "login-form"
                            onFinish = {onFinish}
                            onFinishFailed = {onFinishFailed}
                            autoComplete = "off"
                            className = "login-form"
                            labelCol={{
                                    span: 8,
                                }}
                            layout = "vertical"
                        >

                            <Form.Item
                                label = "نام کاربری"
                                name = "username"
                                rules = {[{required : true, message : "نام کاربری الزامی است!"}]}
                                className = "form-label"
                                wrapperCol = {{
                                    span : 24
                                }}
                                style = {{color : "white !important"}}

                            >
                                <Input
                                    placeholder = "شامل حروف انگلیسی و زیر خط"
                                    className = "form-input"
                                />
                            </Form.Item>

                            <Form.Item
                                label = "رمز عبور"
                                name = "password"
                                rules = {[{required : true, message : "رمز عبور الزامی است!"}]}
                                span = "20"
                                className = "form-label"
                                wrapperCol = {{
                                    span : 24
                                }}

                            >
                                <Input.Password
                                    placeholder = "شامل حروف - اعداد  نشانه ها و ..."
                                    className = "form-input"

                                    />
                            </Form.Item>

                            <Button
                                htmlType = "submit"
                                block
                                className = "form-submit"

                            >
                                    ورود
                            </Button>

                        </Form>

                        <Row gutter = {24} className = "login-tools" style = {{backgroundColor : ""}} block>
                            <Col span = {10} className = "forgot-password">
                            <AiFillLock />
                            <span style = {{marginRight : "2px"}}> بازیابی رمزعبور</span>
                           </Col>
                            <Col span = {14} className = "new-account"><span style = {{borderBottom : "1px dotted lightgray"}}><Link to = "/signup" style={{color : "white"}}>ساخت حساب جدید</Link></span></Col>
                        </Row>


                        <div style = {{marginTop : "20px", width : "60%"}}>
                            <Divider className = "divider">یا ورود با</Divider>
                        </div>

                        <div className = "login-with-container" >
                            <AiOutlineGoogle className = "login-with-icon login-with-icon-first"/>
                            <AiFillGithub className = "login-with-icon login-with-icon-last"/>
                        </div>


                    </div>
                    <div className = "social_container">
                        <AiOutlineWhatsApp className = "social_icon"/>
                        <AiOutlineSend className = "social_icon"/>
                        <AiOutlineInstagram className = "social_icon"/>
                    </div>

                </div>

        </React.Fragment>
    )
}

export default Login;
