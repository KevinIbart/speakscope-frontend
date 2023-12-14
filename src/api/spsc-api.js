import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8000';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';


export const apiUrl='https://apis.speakscope.tech/'

