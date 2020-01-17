import React, { Component } from 'react';
import "./MemeCompoStyle.css"
export default class Meme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            tags: this.props.tags,
            caption: this.props.caption
        }
    }
    render() {
        return (
            <div>
                <div className="MemeStylingDiv">
                    <img className="image" src={`data:image/png;base64,${this.state.image}`} />
                    <p className="caption">{this.state.caption}</p>
                    <p className="tags">{this.state.tags}</p>
                </div>
                <br></br>
            </div>
        )
    }
}