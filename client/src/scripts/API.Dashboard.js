import axios from 'axios';
import serverConfig from '../server.json';

class ApiDashboard {
    constructor(baseURL) {
        this.baseURL = baseURL || import.meta.env.VITE_REACT_APP_BACKWEB;
        this.endpoints = serverConfig.Project;
        // Create an axios instance with the base URL
        this.api = axios.create({
            baseURL: this.baseURL,
        });
    }

    // TODO: add these to server.json
    async FindUserByEmail(email) {
        try {
            const response = await axios.get(`${this.baseURL}/api/user/${email}`)
            if(response.status==200) return response.data;
            else{
                return null;
            }
        } catch (error) {
            console.error(`Failed to find user by email ${email}:`, error);
            throw error;
        }
    }
    async FindUserByID(ID) {
        try {
            // const response = await axios.get(`${this.baseURL}${endpoint}`);
            console.log(`${this.baseURL}/user/${ID}`);
            const response = await axios.get(`${this.baseURL}/api/user/ID/${ID}`)
            if(response.status==200) return response.data;
            else{
                return null;
            }
        } catch (error) {
            console.error(`Failed to find user by email ${ID}:`, error);
            throw error;
        }
    }
  
}

export default ApiDashboard;
