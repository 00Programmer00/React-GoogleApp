import React from 'react';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        this.props.userLogin(this.state);
        e.target.value = '';

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

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
                        Login
                    </button>
                    <Link to="/signUp">
                        <button className="btn btn-primary btn-lg ml-4">
                            Sign up
                        </button>
                    </Link>

                </div>

            </form>
        );
    }
}

LoginForm.propTypes = {
    userLogin: React.PropTypes.func.isRequired
};

export default LoginForm;