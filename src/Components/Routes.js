import React from 'react';
import axios from 'axios';
import Nav from "./navigation";

class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {routes: [], name: '', description: '', length: ''};

        this.favorites = this.favorites.bind(this);
        this.RouteList = this.RouteList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Search = this.Search.bind(this);
    }

    componentDidMount() {
        this.RouteList();
    }

    RouteList() {
        return axios.get('http://localhost:3001/routes', )
            .then( (response) => {
                this.setState({routes: response.data});
            });
    }

    favorites(){
        axios.get('http://localhost:3001/favorites?userId='+localStorage.id).then((response) => {
            let favorites = response.data;
            favorites = favorites.map(fav => fav.routeId);
            let filtered = this.state.routes.filter(route => favorites.indexOf(route.id) >= 0);
            this.setState({routes: filtered});
        });
    }

    Search(e){
        e.preventDefault();
        axios.get('http://localhost:3001/routes?q='+ this.state.description + this.state.name + this.state.length).then((response) => {
            let routes = response.data;
            routes = routes.map(route => route.id);
            let filtered = this.state.routes.filter(route => routes.indexOf(route.id) >= 0);
            this.setState({routes: filtered});
        });
    }

    onChange(e){
        this.setState({[e.target.placeholder]: e.target.value});
    }

    render() {
        const routes = this.state.routes.map((route, i) => {
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
        });


        return(
        <div>
            <Nav />

            <form >
                <div className="row mx-auto mt-5 pt-5">
                    <div className="col-md-2">
                            <input
                                onChange={this.onChange}
                                type="text"
                                className="form-control"
                                placeholder="name"
                            />

                    </div>

                    <div className="col ">
                        <input
                            onChange={this.onChange}
                            type="text"
                            className="form-control"
                            placeholder="description"
                        />

                    </div>

                    <div className="col-md-1">
                        <input
                            onChange={this.onChange}
                            type="text"
                            className="form-control"
                            placeholder="length"
                        />

                    </div>

                    <div className="col">
                        <button className="btn btn-primary btn-lg" onClick={this.Search}>
                            Search
                        </button>
                    </div>
                </div>
            </form>

            <div className="float-right">
                <button className="btn btn-primary btn-lg" onClick={this.favorites}>
                    Favorites
                </button>
                <button className="btn btn-primary btn-lg ml-2" onClick={this.RouteList}>
                    Delete Filters
                </button>
            </div>


            <div id="layout-content" className="layout-content-wrapper col-md-6 d-block mx-auto mt-5 pt-5">
                <div className="panel-list">{ routes }</div>
            </div>
        </div>
        )
    }
}

export default Routes;