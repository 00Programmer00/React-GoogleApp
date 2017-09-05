import React from 'react';
import axios from 'axios';
import Nav from "./navigation";

class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {routes: []};

        this.favorites = this.favorites.bind(this);
        this.RouteList = this.RouteList.bind(this);
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
            <div className="col-md-4 d-block mx-auto mt-5 pt-3 ">
                <button className="btn btn-primary btn-lg ml-4 mt-5" onClick={this.favorites}>
                    Favorites
                </button>
                <button className="btn btn-primary btn-lg ml-4 mt-5" onClick={this.RouteList}>
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