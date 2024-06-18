const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
const axios = require('axios');

const payment = async (req, res) => {
  try {
    const amount = parseInt(req.body.amount, 10);
    const phoneNumber = parseInt(req.body.phone, 10);

    if (isNaN(amount) || isNaN(phoneNumber)) {
      return res.json({ success: false, message: 'Please fill all the fields' });
    }

    //validate mpesa number
    function validateMpesaNumber(inputNumber) {
        let cleanedNumber = String(inputNumber).replace(/\D/g, '');
  
        if (cleanedNumber.startsWith('0')) {
          cleanedNumber = '254' + cleanedNumber.slice(1);
        } else if (cleanedNumber.startsWith('+254')) {
          cleanedNumber = '254' + cleanedNumber.slice(4);
        } else if (cleanedNumber.startsWith('254')) {
          //already correctly 
        } else {
          throw new Error('Invalid M-Pesa number. The number should start with 0 or 254 or +254.');
        }
  
        if (cleanedNumber.length !== 12) {
          throw new Error('Invalid M-Pesa number. The number should be exactly 12 digits.');
        }
  
        return cleanedNumber;
      }
  
      let validatedPhoneNumber;

      try {
        validatedPhoneNumber = validateMpesaNumber(phoneNumber);
      } catch (error) {
        return res.json({ success: false, message: error.message });
      }

    // generate token
    const key = process.env.CONSUMER_KEY;
    const secret = process.env.CONSUMER_SECRET;
    const basicAuth = `${key}:${secret}`;
    const encodedBasicAuth = Buffer.from(basicAuth).toString('base64');

    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${encodedBasicAuth}`
      }
    });

    const token = response.data.access_token;
    // console.log(token);

    // STK Push preparation
    const date = new Date();
    const year = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const month = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    const todayDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    const Timestamp = `${year}${month}${todayDate}${hour}${minutes}${seconds}`;

    const password = Buffer.from(process.env.SHORT_CODE + process.env.PASS_KEY + Timestamp).toString('base64');
   

    const stkRequestBody = {
      "BusinessShortCode": process.env.SHORT_CODE,
      "Password": password,
      "Timestamp": Timestamp,
      "TransactionType": "CustomerPayBillOnline",
      "Amount": amount,
      "PartyA": validatedPhoneNumber,
      "PartyB": process.env.SHORT_CODE,
      "PhoneNumber": validatedPhoneNumber,
      "CallBackURL": "https://geraldmumo.vercel.app/",
      "AccountReference": "price payment",
      "TransactionDesc": "price payment"
    };

    const stkResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkRequestBody, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    //save transaction
    const transaction = {
      phoneNumber,
      amount,
      transactionTime: Timestamp,
      merchantRequestID: stkResponse.data.MerchantRequestID,
      transactionId: stkResponse.data.CheckoutRequestID,
      responseCode: stkResponse.data.ResponseCode,
      responseDescription: stkResponse.data.ResponseDescription
    };

  
    // console.log('expressss',stkResponse.data)
   
    if(stkResponse.data.ResponseCode === 0) {
        return res.json({ success: true, message: stkResponse.data.ResponseDescription});
    }else {
        return res.json({ success: false, message: stkResponse.data.ResponseDescription});
    }
  } catch (err) {
    if (err.response) {
        res.json({ success: false, message: err.response.data.errorMessage});
        return;
      } else {
        res.json({ success: false, message: err.message});
        return;
      }
  }
};

const controller = {
  payment
};

module.exports = controller;
