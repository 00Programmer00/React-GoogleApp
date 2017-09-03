import React from 'react';
import axios from 'axios';
import Nav from './navigation';

export default class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            favorites: '',
            favArray: []
        };

    }

    componentDidMount() {
        this.Favorites();
    }

    Favorites() {
        return  axios.get('http://localhost:3001/favorites?userId='+localStorage.id).then((response) => {
            this.setState({favorites: response.data});
            console.log(this.state);
        });

    }

    render(){

        const favorites = this.state.favArray.map((fav, i) => {



            const path = "/id/" + fav.id;

            return <div key={i} className="container">
                <ul className="list-group" id="posts">

                    <a href={path} className="link">
                        <li className="list-group-item center"><h1>{fav.name}</h1>
                            <hr/>
                            {fav.description}
                        </li>
                    </a>

                </ul>
            </div>
        });

        return(
            <div>
                <Nav />
                <div id="layout-content" className="layout-content-wrapper col-md-6 d-block mx-auto mt-5 pt-5">
                    <div className="panel-list">{ favorites }</div>
                </div>
            </div>
        )
    }
}