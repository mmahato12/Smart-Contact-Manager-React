import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `http://localhost:8082/api/user/contacts`;

class UserService {
  getContacts(pageSize, page, sortBy, sortDir, query) {
    return axios.get(API_URL + `?pageSize=${pageSize}&pageNo=${page}&sortBy=${sortBy}&sortDir=${sortDir}&query=${query}`,
    { headers: authHeader() } );
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    console.log(authHeader());
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
