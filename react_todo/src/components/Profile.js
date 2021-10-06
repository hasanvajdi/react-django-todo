import React, {useState, useForm, useEffect} from 'react';
import {Form, Input, Button, Row, Col, Divider, Modal, Alert, Select, Option, Popover} from 'antd';

import 'antd/dist/antd.css';
import './../static/css/profile.css';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import Cookies from  'universal-cookie';
import Navbar from './Navbar'


const Profile = ()=>{
    const cookies = new Cookies();
    const [modal, setModal] = useState(false);
    const [form] = Form.useForm();
    const [alert, setAlert] = useState("none");
    const [categoryName, setCategoryName] = useState();
    const [user, setUser] = useState();





    useEffect(()=>{
        let access_token = cookies.get("access")
        axios.get("http://localhost:8000/dj_rest/user/",{
            headers: {
                    "Authorization": 'Bearer ' + access_token,
                }
        })

        .then(res=>{
            setUser(res.data.username)
            cookies.set("user", `${res.data.pk}`)
        })

        .catch(error=>{
            let refresh_token = {}
            refresh_token.refresh = cookies.get("refresh")
            refresh_token = JSON.stringify(refresh_token)

            axios.post("http://localhost:8000/dj_rest/token/refresh/", refresh_token,{
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            .then(res=>{
                cookies.set("access", `${res.data.access}`)
                axios.get("http://localhost:8000/dj_rest/user/",{
                    headers: {
                            "Authorization": 'Bearer ' + res.data.access,
                        }
                })

                .then(res=>{
                    setUser(res.data.username)
                    console.log(res.data.usernamex  )
                    cookies.set("user", `${res.data.pk}`)

                })
            })

            .catch(err=>{
                window.location.replace("/login")
            })

        })

    }, [])


    const handleClose = ()=>{
        setModal(false)
    }

    const onFinish = (data)=>{
        data.user = cookies.get("user")
        data = JSON.stringify(data)

        axios.post("http://localhost:8000/todo/", data, {
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(result=>{
            setAlert("flex")
            form.resetFields()
        })
    }


    const onFinishFailed = (data)=>{
        console.log("sfsdfsdsd")
    }

    const handleModal = ()=>{
        setModal(true)
        setAlert('none')
        form.resetFields()

    }


    const categoryOnFinish = (data)=>{
        console.log(data)
    }


    const categoryOnFinishFailed = ()=>{
        console.log("faield")
    }




    return(
        <React.Fragment>
            <ConfigProvider direction = "rtl">
                <Modal visible = {modal}
                    title = "افزودن وظیفه"
                    onCancel = {handleClose}
                    className = "add-task-modal"
                    footer={[
                            <ConfigProvider direction="rtl">
                                <Alert style={{display : `${alert}`, textAlign : "right"}} message = "وظیفه جدید اضافه شد!" type = "success" showIcon/>
                            </ConfigProvider>
                        ]}
                    >

                    <Form
                        name = "addTast-from"
                        onFinish = {onFinish}
                        onFinishFailed = {onFinishFailed}
                        autoComplete = "off"
                        className = "addTast-form"
                        layout = "vertical"
                        form={form}
                    >

                        <Form.Item
                            label = "عنوان"
                            name = "title"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label = "توضیحات"
                            name = "description"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label = "دسته بندی"
                            name = "category"
                        >
                            <Input />
                        </Form.Item>

                        <Button htmlType = "submit" className = "submit-task-form">ثبت</Button>

                    </Form>

                </Modal>
            </ConfigProvider>


            <div className = "profile-container">

                <div className = "todo-background">
                    <Row span = {20} className = "todo-row">
                        <Col span = {22} className = "todo-col">
                            <Row className = "background-top-row">
                                <Col span={20}><span>hesdfsdfsdsdfllo</span></Col>

                                <Col span={4} ><Button onClick = {handleModal} className = "add-todo-button">افزودن</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className = "todo-main">
                        <Col>
                            mmmmmmmmm
                        </Col>
                    </Row>
                </div>

                <Navbar user = {user}/>




            </div>
        </React.Fragment>
    )
}

export default Profile
