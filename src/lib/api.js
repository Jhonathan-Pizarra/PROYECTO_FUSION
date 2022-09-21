import axios from "axios";
import {Auth} from "aws-amplify";


const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,

});


//Mantener la sesión activa
axios_instance.interceptors.request.use(async function (config) {    // Do something before request is sent
    const {signInUserSession} = await Auth.currentAuthenticatedUser()
    const jwt = signInUserSession?.accessToken?.jwtToken
    if (jwt) {
        config.headers['Authorization'] = jwt
    }
    
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axios_instance;