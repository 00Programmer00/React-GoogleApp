import React from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import {userSignupRequest} from '../actions/signupAction';

class SignupPage extends React.Component{
    render(){
        const {userSignupRequest} = this.props;

        return(
            <div className="row">
                <div className="col-md-4 d-block mx-auto mt-5 pt-3">
                    <SignupForm userSignupRequest={userSignupRequest}/>
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
};

export default connect((state) => {return {}}, {userSignupRequest})(SignupPage);