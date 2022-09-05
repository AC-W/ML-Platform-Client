import React,{useState}  from 'react';
import './Car_model.css';

function Car_model() {
    const [Image,setImage] = useState()
    const [imageFile,setImageFile] = useState()
    const [models,setModels] = useState([])
    const [probs,setProbs] = useState([])

    const handleChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
    }

    const url_change = (event) => {
        setImage(document.getElementById('url').value)
    }

    const sendImage = () =>{
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        var url = document.getElementById('url').value;
        console.log(url)
        if (url)
        {
            formData.append('url',url);
        }
        else
        {
            formData.append('file',imageFile);
        }
        

        xhr.onload = function () {
            var data = JSON.parse(this.response)
            console.log(data)
            if (xhr.status >= 200 && xhr.status < 400) {
                setModels(data.models)
                setProbs(data.probs)
            } 
            else {
                console.log('error')
            }
        }
        if(url)
        {
            xhr.open('POST', 'https://ml-platform-server.herokuapp.com/predict_car_model_url',true);
        }
        else
        {
            xhr.open('POST', 'https://ml-platform-server.herokuapp.com/predict_car_model',true);
        }
        
        xhr.send(formData);
    }

    const output = () => {
        if (models && models.length !== 0){
            return(
                <div className='output_box'>
                        <div className='name_container'>
                            {models.map(model => <p>{model}</p>)}
                        </div>
                        <div className='prob_container'>
                            {probs.map(prob => <p>{prob}</p>)}
                        </div>
                    </div>
                )
        }
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
                    <input type="text" id="url" placeholder='Enter URL' onChange={url_change}/>
                    <button id="submit" onClick={sendImage}>Upload File</button>
                </div>
            </div>

            {output()}
            
        </div>
        
      </div>
    );
  }

  export default Car_model;