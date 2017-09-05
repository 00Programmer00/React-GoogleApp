import React from 'react';
import axios from 'axios';
import Nav from "./navigation";
import rating from '../data/rating';
import map from 'lodash/map'

import GoogleMapsLoader from 'google-maps';

const style = {
    width: '800px',
    height: '500px',
    margin: '70px 0 0 40px',
    float: 'left'

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
            rating: '',
            userId: '',
            polyLine: [],
            distance: 0,
            sameRoutes: []
        };
        this.CommentList = this.CommentList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);

    }

    componentDidMount(){
        this.RouteList();

        GoogleMapsLoader.KEY = 'AIzaSyDCrDrJz3xHuWwZ86WssYdlILvvKL9JARc';
        GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
        GoogleMapsLoader.load(function(google) {
            const that = this;
            const myLatLng = this.state.routes[0];
            const map = new google.maps.Map(document.getElementById('Map'), {
                zoom: 15,
                center: myLatLng
            });

            for (let i = 0; i < this.state.routes.length; i++) {
               let marker = new google.maps.Marker({
                    position: this.state.routes[i],
                    map: map,
                    title: 'Hello World!'
                });
                marker.setMap(map);
            }

                let path = new google.maps.Polyline({
                    path: that.state.polyLine,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                path.setMap(map);



        }.bind(this));

    }

    componentWillMount(){
        this.CommentList();
    }

    RouteList() {
        const slugter = this.props.match.params.slug;
        return axios.get('http://localhost:3001/routes?id='+slugter, )
            .then( (response) => {
                this.setState({id: response.data[0].id,routes: response.data[0].markers,
                    name: response.data[0].name,
                    description: response.data[0].description,
                    type: response.data[0].category,
                    userId: response.data[0].userId,
                    polyLine: response.data[0].polyLine,
                    distance: response.data[0].length
                });
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
        e.preventDefault();
        axios.post('http://localhost:3001/comments', {description: this.state.addComment,
            rating: this.state.rating,
            userId: localStorage.id,
            routeId: this.state.id});
        e.target.value = '';

        this.state.comments.push({description: this.state.addComment, rating: this.state.rating});
    }

    removeFavorite(){
        axios.get('http://localhost:3001/favorites?routeId='+ this.state.id, )
            .then( (response) => {
                axios.delete('http://localhost:3001/favorites/'+ response.data[0].id);
            });
    }



    render(){
        const that = this;
        function addToFavorites() {
            axios.post('http://localhost:3001/favorites', {userId: localStorage.id, routeId: that.state.id});
        }


        axios.get('http://localhost:3001/routes?userId='+ this.state.userId, )
            .then( (response) => {
                this.setState({sameRoutes: response.data});
        });

        const sameRoutes = this.state.sameRoutes.map((route, i) => {
            if(route.name === this.state.name){

            }else{
                const path = "/id/" + route.id;

                return <div key={i} className="container">
                    <ul className="list-group" id="posts">
                        <a href={path} className="link">
                            <li className="list-group-item center"><h1>{route.name}</h1>
                                <hr/>
                                {route.description}
                            </li>
                        </a>

                    </ul>
                </div>
            }

        });

        sameRoutes.splice();

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

                                    </p>
                                    <div className="mt-3">
                                        Ratting: {item.rating}
                                    </div>
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
                <div id="Map" style={style}>

                </div>
                <div className="col-md-5 float-right mt-5 pt-5">
                    <button className="btn btn-primary btn-lg float-right" onClick={addToFavorites}>
                        Add route ro favorites
                    </button>
                    <button className="btn btn-primary btn-lg float-right mr-3" onClick={this.removeFavorite}>
                        Remove from favorites
                    </button>

                    <h1 className="mt-5">{this.state.name}</h1>


                    <br/>
                    <div>

                        <h2 >Type: {this.state.type} |  Distance: {this.state.distance} m</h2>
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

                <div style={style}>
                    <h1>See also routes from this user:</h1>
                    <hr/>
                    {sameRoutes}
                </div>


            </div>
        )
    }

}
export default routeTemplate;

