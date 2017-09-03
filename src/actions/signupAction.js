import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        axios.get('http://localhost:3001/users?email='+userData.email).then(function (response) {
            if(response.data.length > 0){
                alert("This email, already in our data base, please log in");
            }else{
                alert("Ok, you are sign up, Welcome to our services");
                return axios.post('http://localhost:3001/users', userData);
            }
        })
    }
}