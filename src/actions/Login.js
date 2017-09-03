import axios from 'axios';

export function userLogin(userData) {
        axios.get('http://localhost:3001/users?email='+userData.email+'&password='+userData.password).then(function (response) {
            if(response.data.length > 0){

                alert ("hei, you are log in with email: " + userData.email);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('password', userData.password);
                localStorage.setItem('id', response.data[0].id);


            }else{
               alert("Uncorrect email or password. Please try again!");
            }
        })
}

