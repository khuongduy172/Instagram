import { useEffect, useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const useSignalR = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const connectionRef = useRef<HubConnection | null>();

  useEffect(() => {
    // Create the SignalR connection
    const createConnection = async () => {
      const hubConnection = new HubConnectionBuilder()
        .withUrl('http://192.168.55.32/corehub')
        .build();

      try {
        await hubConnection.start();
        setConnection(hubConnection);
        connectionRef.current = hubConnection;
      } catch (error) {
        console.log('Error connecting to SignalR hub:', error);
      }
    };

    createConnection().catch(error => console.log(error));

    // Clean up the connection when the component unmounts
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(error => console.log(error));
        setConnection(null);
      }
    };
  }, []);

  return connection;
};

export default useSignalR;
