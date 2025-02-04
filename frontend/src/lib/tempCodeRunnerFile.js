import axios from "axios";


const apiRequest=axios.create(
    {   
        // baseURL:`${process.env.SERVER_URL}`,
        baseURL:"http://localhost:8800/api",
        withCredentials:true
    }
)

export default apiRequest;