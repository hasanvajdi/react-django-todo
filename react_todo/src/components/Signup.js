import React from 'react';
import './../static/css/Login.css';
import './../static/css/Signup.css';
import Vector from './../static/svg/login.svg';
import {AiOutlineWhatsApp, AiOutlineSend, AiOutlineInstagram,
        AiFillLock, AiFillGithub, AiOutlineGoogle} from "react-icons/ai";

import {Form, Input, Button, Row, Col, Divider, Modal} from 'antd';
import 'antd/dist/antd.css';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';




const Login = ()=>{
    const onFinishFailed = ()=>{
        console.log("failed")

    }

    const error = ()=>{
        Modal.error({
            title : "این نام کاربری قبلا ثبت شده است!",
            okText : "متوجه شدم",
            okType : "danger"
        })
    }

    const warning = ()=>{
        Modal.warning({
            title : "تکرار رمز عبور یکسان نیست",
            okText : "متوجه شدم",
            okType : "warning"
        })
    }

    const onFinish = (data)=>{
        if (data.password1 === data.password2){
            axios.post("http://localhost:8000/dj_rest/registration/", data)
            .then(result=>{
                window.location.replace("/profile");
            })

            .catch(err=>{
                error()
            })
        }
        else{
            warning()
        }
    }

    return(
        <React.Fragment>
                <div className = "login_container" >
                    <div className = "vector_container">
                        <img src = {Vector} className = "login-vector"/>
                    </div>

                    <div className = "form_container">
                        <span className = "login-icon">ثبت نام</span>

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
                                className = "form-label form-label-signup"
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
                                name = "password1"
                                rules = {[{required : true, message : "رمز عبور الزامی است!"}]}
                                span = "20"
                                className = "form-label form-label-signup"
                                wrapperCol = {{
                                    span : 24
                                }}

                            >
                                <Input.Password
                                    placeholder = "شامل حروف - اعداد  نشانه ها و ..."
                                    className = "form-input"

                                    />
                            </Form.Item>


                            <Form.Item
                                label = "تکرار رمز عبور"
                                name = "password2"
                                rules = {[{required : true, message : "رمز عبور الزامی است!"}]}
                                span = "20"
                                className = "form-label form-label-signup"
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
                                className = "form-submit form-submit-signup"

                            >
                                    ایجاد
                            </Button>

                        </Form>

                        <Row gutter = {24} className = "login-tools login-tools-signup" style = {{backgroundColor : ""}} block>
                            <Col span = {10} className = "forgot-password">
                            <AiFillLock />
                            <span style = {{marginRight : "2px"}}> بازیابی رمزعبور</span>
                           </Col>
                            <Col span = {14} className = "new-account"><span style = {{borderBottom : "1px dotted lightgray"}}><Link to = "/login" style={{color : "white"}}>ورود به حساب</Link></span></Col>
                        </Row>


                        <div style = {{marginTop : "5px", width : "60%"}}>
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
