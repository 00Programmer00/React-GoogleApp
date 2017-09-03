import axios from 'axios';

export function addRoute(userData) {
    alert("Successful add Route!");
    return dispatch => {
        console.log(userData);
        return axios.post('http://localhost:3001/routes', userData);
    }
}