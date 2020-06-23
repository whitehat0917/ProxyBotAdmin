import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/test/';

class UserService {
    getDashboardData() {
        return axios.get(API_URL + 'getDashboardData', { headers: authHeader() });
    }

    getAvailableIpList() {
        return axios.get(API_URL + 'getAvailableIpList', { headers: authHeader() });
    }

    getProxyHistory() {
        return axios.get(API_URL + 'getProxyHistory', { headers: authHeader() });
    }

    getUsedProxy() {
        return axios.get(API_URL + 'getUsedProxy', { headers: authHeader() });
    }

    getUsers() {
        return axios.get(API_URL + 'getUsers', { headers: authHeader() });
    }

    getUserProxy(userid) {
        return axios.post(API_URL + 'getUserProxy', { userid: userid }, { headers: authHeader() });
    }

    getBlacklist() {
        return axios.get(API_URL + 'getBlacklist', { headers: authHeader() });
    }
}

export default new UserService();