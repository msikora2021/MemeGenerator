import React, { Component } from 'react';
//import request from 'superagent';
import "./verticalborder.css"
import "./canvascompostyling.css"



export default class Canvascompo extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.pref = React.createRef();
        this.secondmyRef = React.createRef();
        this.updateCanvas = this.updateCanvas.bind(this);
        this.updateCanvas2 = this.updateCanvas2.bind(this);
        this.leftsidehandlesubmit = this.leftsidehandlesubmit.bind(this);
        this.rightsidehandlesubmit = this.rightsidehandlesubmit.bind(this);
        this.convertfirstcanvastoimage = this.convertfirstcanvastoimage.bind(this);
        this.convertsecondcanvastoimage = this.convertsecondcanvastoimage.bind(this);
        this.leftsidehandlechange = this.leftsidehandlechange.bind(this);
        this.rightsideCAPhandlechange = this.rightsideCAPhandlechange.bind(this);
        this.rightsideTAGhandlechange = this.rightsideTAGhandlechange.bind(this);
        this.state = {
            leftsidestate: {
                imgstring: '',
                leftsidetags: [],
                leftsidecaption: ''
            },
            rightsidestate: {
                imgstring: '',
                rightsidetags: [],
                rightsidecaption: ''
            }
        }
    }
    componentDidMount() {
        const anger = ["When someone asks you whats wrong but nothings wrong, this is just how you’re face looks", "That face you make when you drop your plate", "When they say you’ll get candy and they give you a mint", "My face when I have the same teacher from last year", "My face when I accidentally run over my mother when backing out of the driveway"];
        const surprised = ["That moment you realize it wasn’t a fart", "When your coffee slips out of your hands and bounces all the way down the stairs", "When you’re at the store and you see someone paying for movies", "When my cat tells me he lost 2 pounds", "When i found out my parents weren’t just “wrestling” in the bedroom "];
        const disgust = ["When someone shows me a beehive", "When he first sees you without your makeup","When you get facebook recommended to be friend’s with you girl’s ex", "When you see someone leave bathroom without washing hands"];
        const sadness = ["When you put too much salt on", "When your kids grow up to be ugly", "When your daughter hates you cause your gay"];
        const happiness = ["When you get that “extra credit” from your professor", "When you find out the real reason the lady bugs come in your bed", "When your mom gives you birthday money","When the edible hits and i feel like beyonce"];
        const fear = ["When you find out that epstein didn’t kill himself", "When you see your dad on pornhub", "When you talk to your daughter and she says she has bugs down there"];
        const neutral = ["When you let out a wet fart and you’re trying to have a neutral face", "That was so funny I laughed", "That moment when you make eye contact with another co-worker when walking down the hall", 'When someone sends you a funny text and you reply “lol” but really you just look like this','When customers start to piss you off but you gotta keep it together'];
        if(this.props.faces.faceAttributes.emotion.neutral >= .5) {
            this.pref.current.innerHTML = neutral[Math.floor(Math.random()*neutral.length)]
        }
        if(this.props.faces.faceAttributes.emotion.anger >= .5) {
            this.pref.current.innerHTML = anger[Math.floor(Math.random()*anger.length)]
        }
        if(this.props.faces.faceAttributes.emotion.surprise >= .5) {
            this.pref.current.innerHTML = surprised[Math.floor(Math.random()*surprised.length)]
        }
        if(this.props.faces.faceAttributes.emotion.disgust >= .5) {
            this.pref.current.innerHTML = disgust[Math.floor(Math.random()*disgust.length)]
        }
        if(this.props.faces.faceAttributes.emotion.sadness >= .5) {
            this.pref.current.innerHTML = sadness[Math.floor(Math.random()*sadness.length)]
        }
        if(this.props.faces.faceAttributes.emotion.happiness >= .5) {
            this.pref.current.innerHTML = happiness[Math.floor(Math.random()*happiness.length)]
        }
        if(this.props.faces.faceAttributes.emotion.fear >= .5) {
            this.pref.current.innerHTML = fear[Math.floor(Math.random()*fear.length)]
        }
        this.updateCanvas();
        this.updateCanvas2();
    }
    updateCanvas() {
        const x = this.myRef.current.getContext('2d');
        let imageObj1 = new Image();
        imageObj1.src = this.props.originalimage;
        const that = this;
        imageObj1.onload = function() {
            x.drawImage(imageObj1, that.props.faces.faceRectangle.left, that.props.faces.faceRectangle.top,
                that.props.faces.faceRectangle.width, that.props.faces.faceRectangle.height,0,0,that.props.faces.faceRectangle.width,
                that.props.faces.faceRectangle.height);
        }
    }
    updateCanvas2() {
        const x = this.secondmyRef.current.getContext('2d');
        let imageObj1 = new Image();
        imageObj1.src = this.props.originalimage;
        const that = this;
        imageObj1.onload = function() {
            x.drawImage(imageObj1, that.props.faces.faceRectangle.left, that.props.faces.faceRectangle.top,
                that.props.faces.faceRectangle.width, that.props.faces.faceRectangle.height,0,0,that.props.faces.faceRectangle.width,
                that.props.faces.faceRectangle.height);
        }

    }
    convertfirstcanvastoimage() {
        const canvas  = this.myRef.current;
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }

    convertsecondcanvastoimage() {
        const canvas = this.secondmyRef.current;
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }
    leftsidehandlesubmit() {
        const canvas = this.myRef.current;
        const imgUrl = canvas.toDataURL();
        const trimmedURl = imgUrl.split(",")[1];
        const leftcaption = this.pref.current.innerHTML;
        //console.log(leftcaption);
        //console.log(trimmedURl);
        let leftsidestate = this.state.leftsidestate;
        leftsidestate.imgstring = trimmedURl;
        leftsidestate.leftsidecaption = leftcaption;
        this.setState({ leftsidestate: leftsidestate
        });
        const data = this.state.leftsidestate;
        console.log(data);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const serverUrl = 'http://localhost:8000/board';
        fetch( 'http://localhost:8000/board', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
         /* request.post(proxyurl + serverUrl).send(data).set('Accept', 'application/json').end((err, res) => {
            if (err || !res.ok) {
                console.log('Oh no! error');
            } else {
                console.log('Success');
            }
        }); */
    }
    leftsidehandlechange(event) {
        let enteredTagString = event.target.value;
        let tagArray = enteredTagString.split(" ");
        let leftsidestate = this.state.leftsidestate;
        leftsidestate.leftsidetags = tagArray;
        this.setState({leftsidetags: leftsidestate});
    }
    rightsideTAGhandlechange(event) {
        let enteredTagString = event.target.value;
        let tagArray = enteredTagString.split(" ");
        let rightsidestate = this.state.rightsidestate;
        rightsidestate.rightsidetags = tagArray;
        this.setState({rightsidetags: rightsidestate});
    }
    rightsideCAPhandlechange(event) {
        var caption = event.target.value;
        var rightsidestate = this.state.rightsidestate;
        rightsidestate.rightsidecaption = caption;
        this.setState({rightsidestate: rightsidestate});
    }
    rightsidehandlesubmit() {
        const canvas = this.secondmyRef.current;
        const imgUrl = canvas.toDataURL();
        const trimmedURl = imgUrl.split(",")[1];
        var rightsidestate = this.state.rightsidestate;
        rightsidestate.imgstring = trimmedURl;

        this.setState({ rightsidestate: rightsidestate

        });
        console.log(rightsidestate);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const serverUrl = 'http://localhost:8000/board2';
        fetch( 'http://localhost:8000/board2', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(rightsidestate)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
    }
    render() {
        return (
            <div className="canvasWrappingDiv">
                <div className="canvasWrappingDivLeft">
                    <canvas  className="LeftSideCanvas" id="canvasid" id="canvas1" ref={this.myRef}>...</canvas>
                    <p ref={this.pref} className="leftsidep">No Caption here</p>
                    <form className="tagform" onSubmit={this.leftsidehandlesubmit}>
                        Add tags:
                        <input type="text" name="leftsidetagbox" onChange={this.leftsidehandlechange}></input>
                        <br></br>
                        <br></br>
                        <input type="submit" name="leftsidetags" className="leftsidesubmit" value="Post to MemeBoard"></input>
                    </form>
                </div>
                <div className="vertical"></div>
                    <div className="RightSideDiv">
                    <canvas className="canvaspics" id="canvas2" ref={this.secondmyRef}></canvas>
                    <form className="canvasform"  onSubmit={this.rightsidehandlesubmit}>
                        Create your own caption: <br></br>
                        <input type="text" name="createdcaptionbox" onChange={this.rightsideCAPhandlechange}></input>
                        <br></br>
                        Add tags:
                        <br></br>
                        <input type="text" name="rightsidetagbox" onChange={this.rightsideTAGhandlechange}></input>
                        <br></br>
                        <br></br>
                        <input type="submit" className="submitButton" name="postbutton" value="Post to MemeBoard"></input>
                    </form>
                    </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
}
