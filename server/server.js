const express = require('express');
const hbs = require('handlebars');
const path = require('path');

const publicPath = path.join(__dirname + '/../public');
var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {

    console.log("Server is up on PORT 3000");
});

