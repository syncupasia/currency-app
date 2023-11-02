import axios from "axios";

const api = axios.create({
    baseURL: "http://cw.com/api"
});

export default api;