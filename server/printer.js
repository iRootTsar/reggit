const express = require('express');
const Ptouch = require('node-ptouch');
var net = require('net');
const fs = require('fs');
const app = express();
const port = 3030; // Listen on port 9100 for print requests

// Create a TCP socket to communicate with the printer
var socket = new net.Socket();

socket.on('close', function() {
  console.log('Connection closed');
});

// Function to send data to the printer
function sendToPrinter(data) {
  socket.connect(9100, '10.101.0.200', function (err) {
    if (err) {
      return console.log(err);
    }
    socket.write(data, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('data sent');
      socket.destroy();
    });
  });
}

app.use(express.json());

app.get('/print', (req, res) => {
  // Extract data from the request body
  const { name, organization } = req.query;
  console.log(name);
  // Create a P-Touch instance
  var ptouch = new Ptouch(2, {copies: 1});
  ptouch.insertData('name', name);
  ptouch.insertData('org', organization)
  var data = ptouch.generate();
  sendToPrinter(data);
  res.send(200);
});

// Start the printer server
app.listen(port, () => {
  console.log(`Printer server is running on port ${port}`);
});
