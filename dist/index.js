const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const port = 500;
app.listen( port,() => {
    console.log(`listening on ${port}`);
})