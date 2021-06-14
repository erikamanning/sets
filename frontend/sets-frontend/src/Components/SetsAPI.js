import axios from "axios";
const BASE_URL = "http://localhost:5000";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";


class SetsAPI{

    static setAPIToken(token){
        SetsAPI.token=token;
    }

    static async request(endpoint, method='get',data={}){

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${SetsAPI.token}`}
        const params = (method === "get") ? data : {};

        try{
            return (await axios({url,method,data, params, headers })).data;
        }
        catch(err){
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // individual api routes
    static async authenticate(username,password){
        try{
          await this.request(`auth/token`, {username,password}, 'post');
          return true;
        }
        catch(error){
          return false;
        }
    }

    static async register(username,password){
        try{
          await this.request(`auth/register`, {username,password}, 'post');
          return true;
        }
        catch(error){
          return false;
        }
    }



}
export default SetsAPI;