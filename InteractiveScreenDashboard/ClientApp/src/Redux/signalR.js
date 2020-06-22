
import { HubConnection } from '@aspnet/signalr-client';

const connection = new HubConnection('https://localhost:5001/');

export function startConnection() {
    
    connection.start()
        .then((onConnected) => console.log('SignalR is Started'))
        .catch((err) => console.log('Connection Error' + err));
 
}

connection.on('ReceiveMessage', renderMessage);

connection.onclose(function () {
    onDisconnected();
    console.log('Reconnecting in 5 seconds...');
    setTimeout(startConnection, 5000);
});



