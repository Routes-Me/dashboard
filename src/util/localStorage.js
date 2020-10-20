﻿
import {setAuthorizationToken} from '../util/request';



    export async function setToken(token) {
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
    }

    export async function clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('state');
    }

    export async function getToken(){
          if(localStorage.getItem('token')==null){
              return undefined;
          }
          else{
              return localStorage.getItem('token');
          }
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


