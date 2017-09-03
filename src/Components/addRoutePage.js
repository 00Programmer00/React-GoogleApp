import React from 'react';
import AddRouteForm from './addRouteForm';
import {connect} from 'react-redux';
import {addRoute} from '../actions/addNewRoute';


class addRoutePage extends React.Component{
    render(){
        const {addRoute} = this.props;

        return(
            <div className="row">
                <div className="container-fluid">
                    <AddRouteForm addRoute={addRoute}/>
                </div>
            </div>
        )
    }
}

addRoutePage.propTypes = {
    addRoute: React.PropTypes.func.isRequired
};

export default connect((state) => {return {}}, {addRoute})(addRoutePage);