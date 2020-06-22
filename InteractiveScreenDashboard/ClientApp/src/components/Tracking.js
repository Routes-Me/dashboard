import React, { Component } from 'react';
//import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class Tracking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            latitude: '',
            longitude: '',
            message: '',
            user: '',
            hubConnection: null
        };

    }



    //componentDidMount=() => {

    //    const connection = new HubConnection('/chatHub');

    //    this.setState({ connection }, () => {
    //        this.state.connection.start()
    //            .then(() => console.log('connection started!!'))
    //            .catch((err) => console.log('Connection error :' + err));
    //    });

    //    this.state.connection.on('booking', (Latitude, Longitude) => {
    //        const latitude = Latitude;
    //        const longitude = Longitude;
    //        this.setState({ latitude, longitude });
    //    });

    //}


    componentDidMount() {

        //let hubConnection = new HubConnectionBuilder()
        //    .withUrl("https://localhost:44319/chathub")
        //    .build();

        //const hubConnection = new HubConnection("https://localhost:44319/chathub");

        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44319/chathub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('ReceiveMessage', (user, message) => {
                this.setState({ user, message });
            });
        });

        //this.setState({ hubConnection }, () => {
        //    this.state.hubConnection.start()
        //        .then(() => console.log('Signalr: started '))
        //        .catch(() => console.log('Error while establishing connection :'));

        //    this.state.hubConnection.on('ReceiveMessage', (user, message) => {
        //        const Message = message;
        //        this.setState({ user, Message });
        //    });

        //});



    }

        //startReceiveMessages();

    

//   startReceiveMessages(bookingHubConnection) {

//    this.setState({ bookingHubConnection }, () => {
//        this.state.bookingHubConnection.start()
//            .then(() => console.log('Signalr: started '))
//            .catch((err) => console.log('Signalr : Error in connecting signalr - ' + err));


//        this.state.bookingHubConnection.on('ReceiveMessage', (user, message) => {
//            const Message = message;
//            this.setState({ user });
//            this.setState({ Message });
//        });

//    });
//}

   



    render() {
        return (
            <div className="col-md-12">
                <br /><br />
                <h2>The Possition Updates</h2>
                <br />
                <h4>
                    Latitude : {this.state.user} <br />
                    Longitude : {this.state.Message}
                </h4>
            </div>
            );
    }

    
}
 