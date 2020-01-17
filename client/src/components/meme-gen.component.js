import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Canvascompo from "./canvascomponent"
import "./verticalborder.css"
import "./centering.css"
//background-image: url('/client/my-app/src/components/pexels-photo-1831234.jpg');
/*background-color: red;
    padding-top: 0px;
    padding-right: 900px;
    padding-bottom: 500px;
    padding-left: 800px;
    border-radius: 2px;
    margin: 0px;
    height: 100%; */




export default class MemeGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
                facesArray: [],
                imagefile: "",
                showdiv: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.stateChangeCallback = this.stateChangeCallback.bind(this);

    }
    stateChangeCallback() {
        return null;
    }

    handleChange(event) {
        this.setState({showdiv: false});
        var url1 = URL.createObjectURL(event.target.files[0]);
        this.setState({imagefile: url1});
        const that = this;
        var makeblob = function (dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);
                return new Blob([raw], {type: contentType});
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], {type: contentType});
        };
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var contents = reader.result;
            fetch("https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01"
                , {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Ocp-Apim-Subscription-Key': '423e191b8ded4bd4957ce9ccb12763b0'
                    },
                    body: makeblob(contents)
                }).then((response) => response.json()).then(success => {
                that.setState({facesArray: success});
                console.log(that.state.facesArray);
                console.log(success);
            }).catch(error =>
                console.log(error))
        };

        reader.onerror = function (event) {
            console.error("File could not be read! Code " + reader.error.code);
        };

        reader.readAsDataURL(file);

    }





    render() {

        var newlist = this.state.facesArray.map((face, i) => {
            return <Canvascompo faces={face} originalimage={this.state.imagefile} ivalue={i} key={i}/>

        });

        return (
            <div class="WrappingDiv">
            <div>{ this.state.showdiv 
                ?  <div class="centered">
                <p id="peekachu" class="Upper-caption">Upload a saucy pic below to create a meme</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p class="Upload-file">Upload file:</p>
                        <input type="file"  class="Upload-image" name="pic" id="fileinput" accept="image/*" onChange={this.handleChange}/>
                    </label>
                    <br/>

                </form>
            </div>
                : null
            }</div>
            <div>{newlist}</div>
        </div>



        );
    }
}