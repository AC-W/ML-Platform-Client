import React, {useState} from 'react'
import './navbar.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { NavLink } from "react-router-dom";

function NavBar(){

    const [model,setModel] = useState('None')
    const [status,setStatus] = useState('Server Status: None')

    const changeModel = name =>{
        setModel(name)
        console.log(name)
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var data = JSON.parse(this.response)
            if (xhr.status >= 200 && xhr.status < 400) {
                setStatus(data.msg)
            } 
            else {
            console.log('error')
            }
        }
        xhr.open('GET','http://127.0.0.1:8000/load_car_model');
        xhr.send();
        setStatus('loading model...')
        return
    }
    
    return (
        <div className='nav_bar_container'>
            <div className='nav_bar_items'>
                <DropdownButton id="dropdown-basic-button" title={model}>
                    <Dropdown.Item onClick={ () => changeModel('car_model_recognition')}><NavLink className="nav-link" to="/car_model">Car Recognition Model</NavLink></Dropdown.Item>
                    <Dropdown.Item onClick={ () => changeModel('Model 2')}>Model 2</Dropdown.Item>
                    <Dropdown.Item onClick={ () => changeModel('Model 3')}>Model 3</Dropdown.Item>
                </DropdownButton>
            </div>

            <div className='nav_bar_items'>
                <h4 className='status'>{status}</h4>
            </div>

            <div className='nav_bar_items'>
                <h4 className='title'><NavLink className="nav-link" to="/">Home</NavLink></h4>
            </div>
        </div>
    );
}

export default NavBar;