import axios from 'axios';

const baseAxios = axios.create({
    baseURL:'http://localhost:3000/'
})

baseAxios.defaults.withCredentials = true;

export default baseAxios;