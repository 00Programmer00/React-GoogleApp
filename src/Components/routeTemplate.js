import React from 'react';
import axios from 'axios';
import Nav from "./navigation";
import rating from '../data/rating';
import map from 'lodash/map'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const style = {
    width: '50%',
    height: '70%',
    margin: '80px 0 0 50px'

};


class routeTemplate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            routes: [],
            type: '',
            comments: [],
            addComment: '',
            rating: ''
        };
        this.CommentList = this.CommentList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        this.RouteList();

    }

    componentWillMount(){
        this.CommentList();
    }

    RouteList() {
        const slugter = this.props.match.params.slug;
        return axios.get('http://localhost:3001/routes?id='+slugter, )
            .then( (response) => {
                this.setState({id: response.data[0].id,routes: response.data[0].markers, name: response.data[0].name, description: response.data[0].description, type: response.data[0].category});
            });
    }

    CommentList(){
        setTimeout(function () {
            const route = 'http://localhost:3001/comments?routeId='+this.state.id;
            return axios.get(route , )
                .then( (response) => {
                    this.setState({comments: response.data});
                });
        }.bind(this),1000);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        alert("Your comment was successfully added");
        axios.post('http://localhost:3001/comments', {description: this.state.addComment, rating: this.state.rating, userId: localStorage.id, routeId: this.state.id});
        e.target.value = '';
    }

    render(){
        const that = this;
        function addToFavorites() {
            axios.post('http://localhost:3001/favorites', {userId: localStorage.id, routeId: that.state.id});

        }


        const markers = this.state.routes.map((item, i) => {
            return <Marker key={i}
                           position={{lat: item.lat, lng: item.lng}} />
        });

        const comments = this.state.comments.map((item, i) => {
            return <div key = {i} className="container">
                <div className="row border">
                    <div className="comments col-md-9" id="comments">
                        <div className="comment mb-2 row">
                            <div className="comment-content col-md-11 col-sm-10">
                                <div className="comment-body">
                                    <p>
                                        {item.description}
                                        <br />
                                        Ratting: {item.rating}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        });

        const options = map ( rating, (val,key)=>
            <option key={val} value={val}>{key}</option>
        );



        return(
            <div>
                <Nav />
                <div>
                    <Map setClickableIcons ={true} className="float-left" google={this.props.google} initialCenter={{lat: 32.885353,lng: 13.180161}} zoom={2} style={style}>
                        {markers}
                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                <h1>w</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                <div className="col-md-5 mt-5 pt-5 ml-4 pl-4 float-right">
                    <h1>{this.state.name}</h1>
                    <button className="btn btn-primary btn-lg float-right" onClick={addToFavorites}>
                        Add route ro favorites
                    </button>

                    <br/>
                    <div>

                        <h2>Type: {this.state.type}</h2>
                        <hr/>
                        <h2>Description</h2>
                        <br/>
                        {this.state.description}
                        <hr/>
                        <h3 className="mb-2">Comments</h3>
                        {comments}
                        <br/>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="control-label">Add your own comment</label>
                                <textarea
                                    value={this.state.addComment}
                                    onChange={this.onChange}
                                    type="text"
                                    name="addComment"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg">
                                    Add comment
                                </button>
                                <div className="form-group">
                                    <label className="control-label">Rate:</label>

                                    <select
                                        onChange={this.onChange}
                                        value={this.state.rating}
                                        className="form-control"
                                        name="rating"

                                    >
                                        <option value="" disabled>Rate it!</option>
                                        {options}
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                    <br/>

                </div>

            </div>
        )
    }

}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDCrDrJz3xHuWwZ86WssYdlILvvKL9JARc'
})(routeTemplate);

