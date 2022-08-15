//*
//* This is the main body of the application
//* all setup and config is started here
//*

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Sets up the Express App
const PORT = process.env.PORT || 3001;
const app = express();

// set up all Express built-in middleware methods here
// 'express.urlencoded([options])' is a built-in middleware function in Express
// It parses incoming requests with urlencoded payloads and is based on 'body-parser'
app.use(express.urlencoded({ extended: true }));
// 'express.json([options])' is a built-in middleware function in Express
// It parses incoming requests with JSON payloads and is based on 'body-parser'
app.use(express.json());
// more Express route setup here
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
