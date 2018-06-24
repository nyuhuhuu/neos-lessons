const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes.js')(app);

app.listen(3000, () => {
    console.log('Book API service listening on port 3000!');
});
