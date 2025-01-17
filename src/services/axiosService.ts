import axios from "axios";
import {baseURL} from "../constans/urls";

const axiosInstance = axios.create({baseURL,withCredentials:true, headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});
export {axiosInstance}