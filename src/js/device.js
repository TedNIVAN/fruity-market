import { serial } from './serial'

var port;

export function deviceComponent() {
  'use strict';

  document.addEventListener('DOMContentLoaded', event => {
    let connectButton = document.querySelector('#connect');

    function connect() {
      console.log('Connecting to ' + port.device_.productName + '...');
      port.connect().then(() => {
        console.log(port);
        console.log('Connected.');
        connectButton.textContent = 'Disconnect Device';
        port.onReceive = data => {
          let textDecoder = new TextDecoder();
          t.io.print(textDecoder.decode(data));
        }
        port.onReceiveError = error => {
          console.log('Receive error: ' + error);
        };
      }, error => {
        console.log('Connection error: ' + error);
      });
    };

    connectButton.addEventListener('click', function () {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect Device';
        port = null;
      } else {
        serial.requestPort().then(selectedPort => {
          port = selectedPort;
          connect();
        }).catch(error => {
          console.log('Connection error: ' + error);
        });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length == 0) {
        console.log('No devices found.');
      } else {
        port = ports[0];
        connect();
      }
    });
  });
}

export function withdrawFruit(str) {
  if (port !== undefined) {
    let textEncoder = new TextEncoder();
    port.send(textEncoder.encode(str)).catch(error => {
      console.log('Send error: ' + error);
    });
  }
}