import axios from 'axios';
import authHeader from './auth-header';
import { config } from '../config.js';

const API_URL = 'http://' + config.serverAddress + '/api/test/';

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

    addBlacklist(url) {
        return axios.post(API_URL + 'addBlacklist', { url: url }, { headers: authHeader() });
    }

    editBlacklist(id, url) {
        return axios.post(API_URL + 'editBlacklist', { id: id, url: url }, { headers: authHeader() });
    }

    addUserProxy(userid, port, days) {
        return axios.post(API_URL + 'addUserProxy', { userid: userid, port: port, days: days }, { headers: authHeader() });
    }

    editUserProxy(id, port, days) {
        return axios.post(API_URL + 'editUserProxy', { id: id, port: port, days: days }, { headers: authHeader() });
    }

    addUser(username, password) {
        return axios.post(API_URL + 'addUser', { username: username, password: password }, { headers: authHeader() });
    }

    addIp(id, startIp, count, subnet) {
        return axios.post(API_URL + 'addIp', { id: id, startIp: startIp, count: count, subnet: subnet }, { headers: authHeader() });
    }

    setMaxIp(count) {
        return axios.post(API_URL + 'setMaxIp', { count: count }, { headers: authHeader() });
    }

    deleteIp(startIp, count, subnet) {
        return axios.post(API_URL + 'deleteIp', { startIp: startIp, count: count, subnet: subnet }, { headers: authHeader() });
    }

    deleteBlacklist(url) {
        return axios.post(API_URL + 'deleteBlacklist', { url: url }, { headers: authHeader() });
    }

    deleteUser(userid) {
        return axios.post(API_URL + 'deleteUser', { userid: userid }, { headers: authHeader() });
    }

    deleteUserProxy(id) {
        return axios.post(API_URL + 'deleteUserProxy', { id: id }, { headers: authHeader() });
    }
}

export default new UserService();