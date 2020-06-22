import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useCallback } from 'react';

class SignalRController {
    constructor(props) {
        this.rConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:44319/chathub")
            .configureLogging(LogLevel.Information)
            .build();
        this.rConnection.start()
            .catch(err => {
                console.log('connection error');
            });
    }

    registerReceiveEvent = (useCallback) => {
        this.rConnection.on("ReceiveMessage", function (message) {
            console.log(message);
            useCallback(message);
        });
    }

    sendMessage = (message) => {
        return this.rConnection.invoke("SendMessage", message)
            .catch(function (data) {
                alert('cannot connect to the server');
            });
    }



}