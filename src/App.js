import React, { Component } from 'react';
import Nav from './Components/navigation';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignupPage from './Components/SignupPage';
import Login from "./Components/Login";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import { Redirect, Switch } from 'react-router';
import Routes from './Components/Routes';
import addRoute from './Components/addRoutePage';
import RouteTemplate from './Components/routeTemplate';
import Favorites from './Components/Favorites';


const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

if(localStorage.length > 0){
    this.state = {
        email: localStorage.email,
        password: localStorage.password
    };
}
console.log(this.state);
class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                        <Route exact={true} path="/" render={() => (
                            localStorage.length > 0 ? (
                                <Redirect to="/nav"/>
                            ) : (
                                <Login />
                            )
                        )}/>

                        <Route exact={true} path="/nav" component={Nav}/>
                        <Route exact={true} path="/routes" component={Routes}/>
                        <Route exact={true} path="/addRoute" component={addRoute}/>
                        <Route exact={true} path="/id/:slug" component={RouteTemplate} />
                        <Route exact={true} path="/signUp" component={SignupPage}/>
                        <Route exact={true} path="/favorites" component={Favorites}/>
                </div>
            </Router>
        </Provider>
    );
  }
}
export default App;
