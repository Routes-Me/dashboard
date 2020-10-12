﻿import axios from 'axios';

export default function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.baseURL= "http://vmtprojectstage.uaenorth.cloudapp.azure.com:5000/api/";
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}