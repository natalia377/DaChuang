import axios from 'axios'

const request = axios.create({
    baseURL: "http://localhost:80/",
    timeout:2000
})

export default request;
