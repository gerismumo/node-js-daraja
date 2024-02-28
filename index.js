const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/text-form', (req, res) => {
  
  const amount = req.body.amount;
  const phoneNumber = req.body.phone;

  console.log(amount, phoneNumber);
  try {
    if(amount !== '' && phoneNumber !== '') {
      return res.json({success: true, message: 'posted successfully'})
    }else {
      return res.json({success: false, message: 'please fill all the fields'})
    }
  }catch(err) {
    res.json({success: false, message: err.message});
  }
 
});



const port = 5000;
app.listen( port,() => {
    console.log(`listening on ${port}`);
})