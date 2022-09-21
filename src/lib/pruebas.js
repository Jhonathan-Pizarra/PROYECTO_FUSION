import axios from "axios";

async function getAll(){
    return await axios.get('https://ir0biesqb6.execute-api.us-east-1.amazonaws.com/dev/soy-endpoint-autorizado');
}

export const Test = {
    getAll
}