import React,{useState, useEffect}  from 'react';
import './Car_model.css';

import socketio from "socket.io-client";
const socket = socketio.connect("https://ml-platform-server.herokuapp.com");

function Car_model() {
    const [Image,setImage] = useState()
    const [imageFile,setImageFile] = useState()
    const [models,setModels] = useState([])
    const [probs,setProbs] = useState([])

    useEffect(() => {
        console.log('set up car model')
        socket.on('car model result',(data) =>{
            setModels(data.model)
            setProbs(data.prob)
        })
    },[])

    const handleChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
    }

    const sendImage = () =>{
        socket.emit('car_predict',{img:imageFile})
    }

    return (
      <div className="Car_model">

        <div className='title'>
            <h1>Car Model Recognition</h1>
        </div>

        <div className='main_content_container'>

            <div className='input_box'>
                <img className='image' src={Image}/>
                <div className='input_field'>
                    <input type="file" id="files" accept="image/jpeg, image/png" onChange={handleChange}/>
                    <button id="submit" onClick={sendImage}>Upload File</button>
                </div>
            </div>
            
            <div className='output_box'>
                <div className='name_container'>
                    {models.map(model => <p>{model}</p>)}
                </div>
                <div className='prob_container'>
                    {probs.map(prob => <p>{prob}</p>)}
                </div>
            </div>
            
        </div>
        
      </div>
    );
  }

  export default Car_model;