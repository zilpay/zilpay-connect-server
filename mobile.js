var WebSocketClient = require('websocket').client;
var { v4 } = require('uuid');

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  const uuid = 'e89bcbae-f43d-482a-8967-e730b9027930';
  console.log('WebSocket Client Connected');
  connection.on('error', function(error) {
      console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function() {
      console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function(message) {
    try {
      const { data } = JSON.parse(message.utf8Data);

      console.log(data);
    } catch {
      connection.close();
    }
  });

  function send() {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({
          type: 'Connect',
          data: '',
          uuid
      }));
    }
  }
  send();
});

client.connect('ws://localhost:8080/', 'zilpay-connects');

