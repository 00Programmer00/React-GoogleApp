import React from 'react';
import {Link} from 'react-router-dom';


class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.props.userSignupRequest(this.state);
        e.target.value = '';

    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <h1>Registration</h1>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                </div>


                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        SignUp
                    </button>
                    <Link to="/">
                        <button className="btn btn-primary btn-lg ml-4">
                            Login
                        </button>
                    </Link>
                </div>

            </form>
        )
    }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;