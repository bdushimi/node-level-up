/* eslint-disable no-console */
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h3>Page Not Found</h3>');
});

const server = http.createServer(app);
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

server.listen(port, host, () => console.log('Server has started.....'));
