import React, {useState, useForm, useEffect} from 'react';
import {Form, Input, Button, Row, Col, Divider, Modal, Alert, Select, Option, Popover} from 'antd';
import ProfileVector from './../static/svg/profile.svg';
import 'antd/dist/antd.css';
import './../static/css/navbar.css';
import { AiFillCheckSquare, AiTwotoneDelete, AiOutlineMore} from "react-icons/ai";
import { ConfigProvider } from 'antd';
import axios from 'axios';
import Cookies from 'universal-cookie';
import  Category from './Category';



const Navbar = (props)=>{
    const [categorylist, setCategoryList] = useState();
    const [categoryName, setCategoryName] = useState();
    const [cateForm, setCateForm] = Form.useForm();


    const categoryOnFinish = (data)=>{
        console.log(data)
    }


    const categoryOnFinishFailed = ()=>{
        console.log("faield")
    }





    const addNewCategory = ()=>{
        if(categoryName != null){
            let category_dict = {}
            category_dict.name = categoryName
            let data = JSON.stringify(category_dict)

            axios.post("http://localhost:8000/category/", data, {
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            .then(result=>{
                cateForm.resetFields()
                axios.get("http://localhost:8000/category/")
                .then(result=>{
                    setCategoryList(result.data)
                })

            })
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/category/")
        .then(result=>{
            setCategoryList(result.data)
        })
    }, [])



    return(
        <div className = "todo-navbar">
            <img src = {ProfileVector} className = "profile-vector"/>
            <Divider style = {{width : "90% !important"}} className = "show-username">{props.user}</Divider>


            <div className = "show-categorys">
                <ConfigProvider direction = "rtl">
                    {
                        categorylist && categorylist.map((item, key)=>(
                            <Category key = {key} name = {item.name} />
                        ))
                    }
                </ConfigProvider>
            </div>

            <Form
                name = "add-category-form"
                className = "add-category-form"
                onFinish = {categoryOnFinish}
                onFinishFailed = {categoryOnFinishFailed}
                autoComplete = "off"
                form = {cateForm}
            >

                <Row className = "add-new-category-row">
                    <Col span={20}>
                        <Form.Item
                            name = "category-input"
                            className = "new-category-input"
                        >
                            <Input onChange = {(data)=>setCategoryName(data.target.value)} placeholder = "افزودن دسته بندی جدید" style = {{direction : "rtl", textAlign : "right"}}/>
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <AiFillCheckSquare
                                className = "accept-new-category-icon"
                                onClick = {addNewCategory}
                            />
                    </Col>

                </Row>
            </Form>
        </div>

    )
}

export default Navbar
