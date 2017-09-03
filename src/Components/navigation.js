import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    clearStorage(){
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">GoogleAPP</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link to="/routes" className="nav-link">Routes</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/addRoute" className="nav-link">Add Route</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favorites" className="nav-link">Favorites</Link>
                        </li>

                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li ><Link to="/" className="btn btn-danger log" onClick={this.clearStorage}>Log out</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;