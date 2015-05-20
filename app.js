var express = require('express');

var app = express();

app.use(express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// export app for testing and flexibility
module.exports = app;
