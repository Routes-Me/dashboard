﻿
import {setAuthorizationToken} from '../util/request';
import cookie from 'react-cookies';


    export async function setToken(token) {
        //localStorage.setItem('token', token);
        cookie.save('token',token)
        //setAuthorizationToken(token);
    }

    export async function setUser(user) {
        cookie.save('user',user)
    }

    export async function getUser() {
        return cookie.load('user');
    }

    export async function setRole(role) {
        cookie.save('role',role)
    }

    export async function getRole() {
        return cookie.load('role');
    }



    export async function setRefreshToken(token) {
        cookie.save('refreshToken',token)
    }

    export async function getRefreshToken() {
            let refreshToken = await cookie.load('refreshToken');
            return refreshToken;
    }

    export async function clearStorage() {
        cookie.remove('token');
        cookie.remove('refreshToken');
        cookie.remove('role');
        localStorage.removeItem('state');
    }

    export async function getToken(){

        if(cookie.load('token')!==null)
        {
            let token =  cookie.load('token')
            return token;
        }
        else{
            return undefined;
        }
        //   if(localStorage.getItem('token')==null){
        //       return undefined;
        //   }
        //   else{
        //       return localStorage.getItem('token');
        //   }
    }








    export function restoreToken(){
        return new Promise((resolve,reject) => {
            if(cookie.load('token')!==''){
                const token = cookie.load('token')
                resolve(token);
            }
            else{
                reject();
            }
        })
    }

    export async function loadState() {
        try {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    };

    export async function saveState(state) {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        } catch (err) {
            return undefined;
        }
    }



