'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOD_URI);


let server;
const app = express();

app.get('api/hello/' , (req, res, next) => {
  res.send('hello world');
});

app.use(reuire('../route/note-router.js'));

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () =>  {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      reslove();
    });
  });
};