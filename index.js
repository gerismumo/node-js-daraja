const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const router = require('./routes/routes');

dotenv.config({path: '.env'});

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/', router);



const port = process.env.PORT;
app.listen( port,() => {
    console.log(`listening on ${port}`);
})