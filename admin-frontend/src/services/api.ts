import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'http://162.241.93.179:3333',
});