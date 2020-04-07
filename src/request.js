import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_PREFIX,
  timeout: 5000,
  headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
});

export default instance