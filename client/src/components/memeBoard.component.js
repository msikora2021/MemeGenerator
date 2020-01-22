import React, { Component } from 'react';
import Meme from "./memecomponent";
import "./MemeBoardStyle.css"

export default class MemeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memeArray: [],
            searchTags: {
                searchArray: []
            }
        }
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    };
    handleSearchBarChange(event) {
        console.log("handleSearchChangedReached");
        let searchTags = this.state.searchTags;
        searchTags.searchArray = event.target.value.split(" ");
        this.setState({searchTags: searchTags});
        let senddata = this.state.searchTags;
        console.log(senddata);
        fetch( 'http://localhost:8000/search', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(senddata)
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({memeArray: data})
            console.log(this.state.memeArray);
        });
    };
    componentDidMount() {
        //console.log("component did mount me yeah");
        fetch( 'http://localhost:8000/memeboard', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'cache-control': 'no-cache'
            },
            async: true

        }).then(res => res.json()).then(data => {
            this.setState({memeArray: data});
            //console.log(data);
            //console.log(data.length);
            //console.log(this.state.memeArray);
            //console.log(this.state.memeArray[0].img.data.toString());
        });
    }


    render() {
        let list = this.state.memeArray.map((meme, index) => {
            return <Meme image={this.state.memeArray[index].imagestring} tags={this.state.memeArray[index].tags} caption={this.state.memeArray[index].caption}/>;
        });
        return (
            <div>
                <div className="topnav">
                    <form>
                    <input type="text" className="searchBar" placeholder="Search.." onChange={this.handleSearchBarChange}></input>
                    </form>
                </div>
                <br></br>
                <div>{list}</div>
            </div>
        )
    }
}
