import React from 'react';
import Nav from "./navigation";
import category from '../data/categories';
import map from 'lodash/map'

import GoogleMapsLoader from 'google-maps';

const style = {
    width: '800px',
    height: '500px',
    margin: '70px 0 0 40px',
    float: 'left'

};

class AddRouteForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            category: '',
            description: '',
            markers: [],
            userId: localStorage.id,
            polyLine: [],
            length: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.props.addRoute(this.state);
        e.target.value = '';
    }

    componentDidMount(){
        GoogleMapsLoader.KEY = 'AIzaSyDCrDrJz3xHuWwZ86WssYdlILvvKL9JARc';
        GoogleMapsLoader.LIBRARIES = ['geometry'];
        GoogleMapsLoader.load(function(google) {
            const that = this;
            const myLatLng = {lat: -25.363, lng: 131.044};
            const map = new google.maps.Map(document.getElementById('Map'), {
                zoom: 4,
                center: myLatLng
            });

            map.addListener('click', function(event) {
                addMarker(event.latLng);
                line();

            }.bind(this));

            function addMarker(location) {
                let marker = new google.maps.Marker({
                    position: location,
                    map: map
                });

                marker.addListener('rightclick',function (event) {
                    marker.setMap(null);
                    that.state.markers.splice(that.state.markers.indexOf(marker),1);
                }.bind(this));
                that.state.markers.push({lat: marker.position.lat(),lng: marker.position.lng()});
                that.state.polyLine.push({lat: marker.position.lat(),lng: marker.position.lng()});

                let path = [];
                let polylineLength = 0;
                for (let i = 0; i < that.state.markers.length; i++) {
                    let lat = that.state.markers[i].lat;
                    let lng = that.state.markers[i].lng;
                    let pointPath = new google.maps.LatLng(lat,lng);
                    path.push(pointPath);
                    if (i > 0) polylineLength += google.maps.geometry.spherical.computeDistanceBetween(path[i], path[i-1]);

                }
                that.setState({length: Math.round(polylineLength)});
            }


            function line(){
                let path = new google.maps.Polyline({
                    path: that.state.polyLine,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                path.setMap(map);
            }






        }.bind(this));
    }

    render(){
        const options = map( category, (val,key)=>
            <option key={val} value={val}>{key}</option>
        );

        return(
            <div>
                <Nav />
                <div id="Map" style={style}>

                </div>

                <div className="col-md-5 float-right mt-5 pt-5">
                </div>
                <form onSubmit={this.onSubmit} className="col-md-5 mt-4 pt-4 ml-4 pl-4 float-right">
                    <h1>Add new Route</h1>

                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <input
                            value={this.state.name}
                            onChange={this.onChange}
                            type="text"
                            name="name"
                            className="form-control"
                        />
                    </div>
                    <div className="mt-2">
                        Distance of route: {this.state.length} m
                    </div>
                    <div className="form-group mt-3">
                        <label className="control-label">Type</label>
                        <select
                            onChange={this.onChange}
                            value={this.state.category}
                            className="form-control"
                            name="category"
                        >
                            <option value="" disabled>Choose type of walking</option>
                            {options}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Description</label>
                        <textarea
                            value={this.state.description}
                            onChange={this.onChange}
                            type="text"
                            name="description"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">
                            Add Route
                        </button>
                    </div>

                </form>
            </div>

        )
    }
}

AddRouteForm.propTypes = {
    addRoute: React.PropTypes.func.isRequired
};

export default AddRouteForm;

