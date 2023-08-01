import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
registerServiceWorker();

axios.interceptors.request.use(request => {
  console.log(request);
  //edit the request like adding auth header
  return request;
},error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  return response;
},error =>{
  console.log(error);
  return Promise.reject(error);
});

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'Auth Token';
axios.defaults.headers.post['Content-Type'] = 'application/json';
