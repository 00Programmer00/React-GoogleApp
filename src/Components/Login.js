import React from 'react';
import LoginForm from "./LoginForm";
import {connect} from 'react-redux';
import {userLogin} from '../actions/Login';


class LoginPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 d-block mx-auto mt-5 pt-3">
                    <LoginForm userLogin={userLogin}/>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    userLogin: React.PropTypes.func.isRequired
};

export default connect((state) => {return {}}, {userLogin})(LoginPage);
