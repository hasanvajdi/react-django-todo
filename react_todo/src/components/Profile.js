import React, {useState, useForm, useEffect, useRef} from 'react';
import {Form, Input, Button, Row, Col, Divider, Modal, Alert, Select, Popover} from 'antd';

import 'antd/dist/antd.css';
import './../static/css/profile.css';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import Cookies from  'universal-cookie';
import Navbar from './Navbar'
import TodoBack from './../static/svg/todo_background.svg'
import {AiOutlineDelete, AiOutlinePushpin, AiOutlineCheckCircle, AiTwotoneCalendar} from "react-icons/ai";
import {WarningTwoTone} from "@ant-design/icons";
import Checksound from './../static/audio/check_sound.mp3'

export const CategoryContext = React.createContext();

const Profile = ()=>{
    const cookies = new Cookies();
    const [modal, setModal] = useState(false);
    const [form] = Form.useForm();
    const [alert, setAlert] = useState("none");
    const [user, setUser] = useState();
    const [modalCategory, setModalCategory] = useState();
    const [todoItems, setTodoItems] = useState();
    const [categoryTitle, setCategoryTitle] = useState();
    const [uuid, setUuid] = useState();
    const [delModal, setDelModal] = useState(false);
    const [category, setCategory] = useState(null);



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

            console.log("in first  catch")
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
                    cookies.set("user", `${res.data.pk}`)

                })
            })

            .catch(err=>{
                console.log("in 2  catch")
                window.location.replace("/login")

            })

        })

    }, [])


    const handleClose = ()=>{
        setModal(false)
    }


    const onFinish = (data)=>{
        let newtodo_category = data.category
        let access_token = cookies.get("access")
        data.user = cookies.get("user")
        data = JSON.stringify(data)
        axios.post("http://localhost:8000/todo/", data, {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + access_token,

            }
        })
        .then(result=>{
            setAlert("flex")
            form.resetFields()

            axios.get(`http://localhost:8000/category/${newtodo_category}/`, {
                headers: {
                    "Authorization": 'Bearer ' + access_token,
                }
            })
            .then(res=>{
                if (res.data.name == categoryTitle){
                    axios.get(`http://localhost:8000/listitem/${newtodo_category}/`, {
                        headers: {
                                "Authorization": 'Bearer ' + access_token,
                        }
                    })
                    .then(resultnewdata=>{
                        setTodoItems(resultnewdata.data)
                    })
                }
            })
        })
    }


    const onFinishFailed = (data)=>{
        console.log("sfsdfsdsd")
    }


    const handleModal = ()=>{
        setModal(true)
        setAlert('none')
        form.resetFields()
        let access_token = cookies.get("access")
        //get list of category
        axios.get("http://localhost:8000/category/", {
            headers: {
                "Authorization": 'Bearer ' + access_token,
            }
        })
        .then(result=>{
            setModalCategory(result.data)
        })

        console.log( "aa" + todoItems)

    }


    const categoryOnFinish = (data)=>{
        console.log(data)
    }


    const categoryOnFinishFailed = ()=>{
        console.log("faield")
    }


    const deleteTodo = (event)=>{
        setUuid(event.target.getAttribute("uuid"))
        setCategory(event.target.getAttribute("category"))
        setDelModal(true)
    }


    const handelDeletTodo = ()=>{
        let access_token = cookies.get("access")
        axios.delete(`http://localhost:8000/todo/${uuid}/`, {
            headers: {
                    "Authorization": 'Bearer ' + access_token,
                }
        })
        .then(resdel=>{
            axios.get(`http://localhost:8000/listitem/${category}/`,{
                headers: {
                        "Authorization": 'Bearer ' + access_token,
                    }
            })
            .then(res=>{
                setTodoItems(res.data)
            })
            setDelModal(false)

        })
    }

    const checkTodo = (event)=>{
        let access_token = cookies.get("access")
        let uuid = event.target.getAttribute("uuid")
        axios.delete(`http://localhost:8000/todo/${uuid}/`, {
            headers: {
                    "Authorization": 'Bearer ' + access_token,
                }
        })
        .then(res=>{
            axios.get("http://localhost:8000/todo/", {
                headers: {
                    "Authorization": 'Bearer ' + access_token,
                }
            })
            .then(todores=>{
                setTodoItems(todores.data)
            })
        })

    }




    return(
        <CategoryContext.Provider value = {{setTodoItems, setCategoryTitle}}>
            <React.Fragment>
                <ConfigProvider direction = "rtl">

                    <Modal
                        visible = {delModal}
                        footer = {null}
                        onCancel = {()=>setDelModal(false)}
                    >
                        <div style = {{display : "flex", flexDirection : "column"}}>
                            <div>
                                <WarningTwoTone style = {{fontSize : "25px"}} twoToneColor = "orange"/>
                                <span style = {{fontWeight : "1000", fontFamily : "yekan",  fontSize : "18px", marginRight : "10px"}}>آیا مطمین از حذف این وظیفه هستید؟!</span>
                            </div>
                            <div style = {{marginTop : "50px"}}>
                                <Button type = "danger" onClick = {handelDeletTodo}>حذف</Button>
                                <Button type = "default " onClick = {()=>setDelModal(false)} style = {{marginRight : "8px"}}>لغو کردن</Button>
                            </div>
                        </div>
                    </Modal>


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
                            name = "add-task-form"
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
                                <Select listItemHeight = {5} listHeight = {180}>
                                    {
                                        modalCategory && modalCategory.map((item, key)=>{
                                            return <Select.Option  key = {key} value = {item.uuid}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
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
                                    <Col span={15} className = "category-name-col"><span className = "category-name">{categoryTitle}</span></Col>

                                    <Col span={9}><Button onClick = {handleModal} className = "add-todo-button">افزودن</Button></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className = "todo-main">
                            <Col className = "todo-main-col">
                                <img src = {TodoBack} className = "todo-background-image"/>
                                <div className = "todo-container-div">
                                    {
                                        todoItems && todoItems.map((item, key)=>(
                                            <Row className = "todo-self">
                                                <Col style = {{width : "99%",}}>
                                                    <Row style = {{overflow : "hidden"}}  className = "todo-title-row">
                                                        <Col xs={22} sm={22} md={22} lg={22} xl={22}><h3 className = "todo-title">{item.title}</h3></Col>
                                                        <Col xs={2} sm={2} md={2} lg={2} xl={2}><AiOutlineDelete category = {item.category} uuid = {item.uuid} onClick = {deleteTodo} className = "todo-options"/></Col>
                                                    </Row>

                                                    <Row style = {{overflow : "hidden"}} className = "todo-description-row">
                                                        <Col xs={22} sm={22} md={22} lg={22} xl={22} className = "width-100"><p>{item.description}</p></Col>
                                                        <Col xs={2} sm={2} md={2} lg={2} xl={2}><AiOutlineCheckCircle onClick = {checkTodo} category = {item.category} uuid = {item.uuid} className = "todo-options"/></Col>
                                                    </Row>
                                                    <Row style = {{color : "gray", marginTop : "10px"}}>
                                                        <Col xs={22} sm={22} md={22} lg={22} xl={22} style = {{textAlign : "left"}}>{item.date}</Col>
                                                        <AiTwotoneCalendar style = {{fontSize : "17px", marginRight : "3px"}}/>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </div>


                            </Col>
                        </Row>
                    </div>

                    <Navbar user = {user}/>




                </div>
            </React.Fragment>
        </CategoryContext.Provider>

    )
}


export default Profile;
