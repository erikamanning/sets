import axios from "axios";
const BASE_URL = "http://localhost:5000";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";


class SetsAPI{

    static setAPIToken(token){
        SetsAPI.token=token;
    }

    static async request(endpoint, data = {}, method = "get"){
      console.debug("API Call:", endpoint, data, method);
      // console.log('Data: ', data);
      //there are multiple ways to pass an authorization token, this is how you pass it in the header.
      //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${SetsAPI.token}` };
      const params = (method === "get")
          ? data
          : {};
  
      try {
        return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
    // individual api routes
    static async authenticate(username,password){
        try{
          let res = await this.request(`auth/token`, {username,password}, 'post');
          // console.log('000000000000000000000000000');
          return res;
        }
        catch(error){
          console.log('error in authenticate sets API!: ', error[0]);
          return error[0];
        }
    }

    static async register(username,password){
        try{
          // console.log('****************************');
          // console.log('in FE sets register function');
          await this.request(`auth/register`, {username,password}, 'post');
          return true;
        }
        catch(error){
          return false;
        }
    }

    static async getLeaderboardData(){
      try{
        let data = await this.request(`game/all`, {}, 'get');
        return data;
      }
      catch(error){
        return false;
      }
  }



}
export default SetsAPI;