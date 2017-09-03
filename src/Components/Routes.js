import React from 'react';
import axios from 'axios';
import Nav from "./navigation";

class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {routes: []};

    }

    componentDidMount() {
        this.RouteList();
    }

    RouteList() {
        return axios.get('http://localhost:3001/routes', )
            .then( (response) => {
                console.log(response.data);
                this.setState({routes: response.data});
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

            <div id="layout-content" className="layout-content-wrapper col-md-6 d-block mx-auto mt-5 pt-5">
                <div className="panel-list">{ routes }</div>
            </div>
        </div>
        )
    }
}

export default Routes;