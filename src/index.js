const dotenv = require('dotenv');

dotenv.config();

const app = require('./config/express');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

// listen to requests
app.listen(port, () => {
    console.log(`server started on port ${port} (${env})`);
});

module.exports = app;
