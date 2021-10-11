
import React, {useState} from 'react';
import {Row, Col, Divider, Popover, Modal, Button, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import './../static/css/category.css';
import {AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlinePushpin} from "react-icons/ai";
import {WarningTwoTone,} from "@ant-design/icons";
import axios from 'axios'
export const contextCategoryList = React.createContext();


const Category = (props)=>{
    const [popOver, setPopOver] = useState(false);
    const [modal, setModal] = useState(false)
    const [textEdit, setTextEdit] = useState();
    const [editModal, setEditModal] = useState(false);

    let uuid  = props.item.uuid


    const handleVisibleChange = (visible)=>{
        setPopOver(visible)
    }


    const editHandler = ()=>{
        axios.get(`http://localhost:8000/category/${uuid}/`)
        .then(result=>{
            setTextEdit(result.data.name)
            setPopOver(false)
            setEditModal(true)
        })
    }


    const deleteHandler = ()=>{
        setPopOver(false)
        setModal(true)
    }



    const pinHandler = ()=>{
        console.log("yes")
        axios.get(`http://localhost:8000/category/${uuid}/`)
        .then(result=>{
            axios.put(`http://localhost:8000/category/${uuid}/`,
                {"pinned" : `${!result.data.pinned}`, "name" : `${result.data.name}`},
                {headers : {"Content-Type" : "application/json"}}
            )

            .then(res=>{
                axios.get("http://localhost:8000/category/")
                .then(result=>{
                    props.func(result.data)
                })
                .then(res=>{
                    setPopOver(false)
                })
            })
        })
    }



    const deleteCategory = ()=>{
        axios.delete(`http://localhost:8000/category/${uuid}/`)
        .then(result=>{
            setModal(false)
            axios.get("http://localhost:8000/category/")
            .then(result=>{
                props.func(result.data)
            })
        })


    }


    const submitEdit = (e)=>{
        let text = {"name" : `${e.edittext}`}
        axios.put(`http://localhost:8000/category/${uuid}/`, text, {
            headers : {"Content-Type" : "application/json"}
        })
        .then(result=>{
            setEditModal(false)
            axios.get("http://localhost:8000/category/")
            .then(result=>{
                props.func(result.data)
            })
        })
    }


    return(
            <React.Fragment>
                <Modal
                    visible = {editModal}
                    footer = {null}
                    onCancel = {()=>{setEditModal(false)}}
                >
                    <Form
                        name = "edit-category"
                        autoComplete="off"
                        onFinish = {submitEdit}
                        initialValues = {{
                            "edittext" : textEdit,
                        }}
                        wrapperCol = {{span : 23}}
                    >
                        <Form.Item name = "edittext" style = {{marginTop : "30px"}}>
                            <Input />
                        </Form.Item>

                        <Button htmlType = "submit" className = "submit-edit-category">تایید ویرایش</Button>
                    </Form>

                </Modal>


                <Modal
                    visible = {modal}
                    footer = {null}
                    onCancel = {()=>setModal(false)}
                >
                    <div style = {{display : "flex", flexDirection : "column"}}>
                        <div>
                            <WarningTwoTone style = {{fontSize : "25px"}} twoToneColor = "orange"/>
                            <span style = {{fontWeight : "1000", fontFamily : "yekan",  fontSize : "18px", marginRight : "10px"}}>آیا مطمین از حذف این دسته بندی هستید؟</span>
                        </div>
                        <div style = {{marginTop : "50px"}}>
                            <Button type = "danger" onClick = {deleteCategory}>حذف</Button>
                            <Button type = "default " style = {{marginRight : "8px"}}>لغو کردن</Button>
                        </div>
                    </div>
                </Modal>


                <Row className = "category-item-row">

                    <Col span = {22} className = "category-item">
                        <span className = "category-item-name">{props.item.name}</span>
                    </Col>

                    <Col span = {2} className = "category-delete-icon">
                        <Popover
                            content = {
                                <div>

                                    <div className = "category-text-icon" onClick = {editHandler}>
                                        <AiOutlineEdit className = "category-pop-icon"/>
                                        <span className = "category-pop-text">ویرایش</span>
                                    </div>
                                    <Divider />


                                    <div className = "category-text-icon" onClick = {deleteHandler}>
                                        <AiOutlineDelete className = "category-pop-icon" />
                                        <span className = "category-pop-text">حذف</span>
                                    </div>
                                    <Divider />

                                    <div className = "category-text-icon" onClick = {pinHandler}>
                                        <AiOutlinePushpin className = "category-pop-icon" style = {{color : `${props.pincolor}`}}/>
                                        <span className = "category-pop-text">سنجاق</span>
                                    </div>

                                </div>
                            }
                            trigger = "click"
                            visible = {popOver}
                            onVisibleChange={handleVisibleChange}
                            placement = "left"
                        >

                            <AiOutlineMore className = "delete-icon"/>
                        </Popover>
                    </Col>
                </Row>
                <Divider />
            </React.Fragment>

    )
}

export default Category;
