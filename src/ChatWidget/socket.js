import { WebSocketServer } from 'ws';

let wss;

export default function handler(req, res) {
  if (!wss) {
    // Create a WebSocket server
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(message);
          }
        });
      });

      ws.on('close', () => console.log('Client disconnected'));
    });

    console.log('WebSocket server created');
  }

  // Upgrade the connection to WebSocket
  res.socket.server.on('upgrade', (req, socket, head) => {
    if (req.url === '/api/socket') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  });

  res.end();
}
