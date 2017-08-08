const path = require("path");
const compression = require('compression');
const express = require('express');
const app = require("./app/app");
app.use(compression({level: 9}));

// serve the static files
app.use('/', express.static(path.join(__dirname, '../ui/build/')));

// start listening
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});