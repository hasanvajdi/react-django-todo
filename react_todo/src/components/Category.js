
import React, {useState} from 'react';
import {Row, Col, Divider, Popover} from 'antd';
import 'antd/dist/antd.css';
import './../static/css/category.css';
import {AiOutlineMore} from "react-icons/ai";
import { BiPencil, BiTrash, BiPin } from "react-icons/bi";

const Category = (props)=>{
    const [popOver, setPopOver] = useState(false);


    const handleVisibleChange = (visible)=>{
        setPopOver(visible)
    }


    const mouseEnter = (e)=>{
        console.log(e.target)
    }

    return(
        <React.Fragment>
            <Row className = "category-item-row">

                <Col span = {22} className = "category-item">
                    <span className = "category-item-name">{props.name}</span>
                </Col>

                <Col span = {2} className = "category-delete-icon">
                    <Popover
                        content = {
                            <React.Fragment>
                                <BsPencil />
                                <BsTrash />
                                <BsPinAngle />
                            </React.Fragment>
                        }
                        trigger = "hover"
                        visible = {popOver}
                        onVisibleChange={handleVisibleChange}
                        placement = "left"
                    >

                        <AiOutlineMore className = "delete-icon"  onMouseEnter = {mouseEnter}/>
                    </Popover>
                </Col>
            </Row>
            <Divider />
        </React.Fragment>
    )
}

export default Category;
