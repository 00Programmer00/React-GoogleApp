import React from 'react';
import Nav from "./navigation";
import category from '../data/categories';
import map from 'lodash/map'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    width: '50%',
    height: '70%',
    margin: '80px 0 0 50px'

};

class AddRouteForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            category: '',
            description: '',
            markers: [],
            userId: localStorage.id
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.mapClicked = this.mapClicked.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onChange(e){

        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.props.addRoute(this.state);
        e.target.value = '';

    }

    mapClicked(mapProps, map, clickEvent){
        const {markers} = this.state;
        markers.push({lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()});
        this.setState({markers});
    }

    onMarkerClick(props, marker, e){
        console.log(marker);
    }

    render(){
        const options = map( category, (val,key)=>
            <option key={val} value={val}>{key}</option>
        );

        return(
            <div className="container-fluid">
                <Nav />
                <div className="mt-5 pt-5">
                    <Map clickableIcons={true} className="float-left" google={this.props.google} initialCenter={{lat: 32.885353,lng: 13.180161}} zoom={4} style={style} onClick={this.mapClicked}>
                        {this.state.markers.map((position, idx) =>
                            <Marker onClick={this.onMarkerClick} key={`marker-${idx}`} position={position}>

                            </Marker>
                        )}

                    </Map>
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

                    <div className="form-group">
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDCrDrJz3xHuWwZ86WssYdlILvvKL9JARc'
})(AddRouteForm);

