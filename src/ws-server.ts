/*
 * Project: ZilPay-wallet
 * Author: Rinat(hiccaru)
 * -----
 * Modified By: the developer formerly known as Rinat(hiccaru) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2021 ZilPay
 */
import http from 'http';
import { request, server as WebSocketServer } from 'websocket';
import { MessageQueue } from './queue';
import { Message } from './message';
import { MessageTypes } from './config/types';
import { URL } from 'url';
import { protocols } from './config/allowed-protocols';
import { assert } from 'console';

const queue = new MessageQueue();
export const server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

function guard(request: request) {
  const url = new URL(request.origin);

  assert(protocols.indexOf(url.protocol), 'Incorect protocol');
}

function hanlde(request: request) {
  const connection = request.accept('zilpay-connect', request.origin);

  connection.on('message', function(message) {
    if (message.type !== 'utf8') {
      return;
    }

    try {
      const { type, data, uuid } = JSON.parse(message.utf8Data);
      switch (type) {
        case MessageTypes.Share:
          queue.add(new Message(
            type,
            data,
            uuid,
            connection
          ));
          break;
        case MessageTypes.Connect:
          const msg = queue.get(uuid);
          connection.send(msg.serialize);
          queue.remove(uuid);
          connection.close();
          break;
        default:
          throw new Error('Unresolved message');
      }
    } catch (err) {
      console.error(err);
      connection.close();
    }
  });

  connection.on('close', function() {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    queue.filter();
  });
}

wsServer.on('request', function(request) {
  try {
    guard(request)
  } catch (err) {
    console.log(err.message);
    return null;
  }

  try {
    hanlde(request);
  } catch (err) {
    console.log(err);
  }
});
