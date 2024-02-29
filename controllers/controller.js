const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
const axios = require('axios');


const payment = async(req, res) => {
  try {
    const amount = parseInt(req.body.amount);
    const phoneNumber = parseInt(req.body.phone);

    console.log(amount, phoneNumber);

    if (amount === undefined || phoneNumber === undefined || amount === '' || phoneNumber === '') {
            return res.json({ success: false, message: 'Please fill all the fields' });
        }

    // generate token
    const key = process.env.CONSUMER_KEY;
    const secret = process.env.CONSUMER_SECRET;
    const basicAuth = `${key}:${secret}`;
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    let encodedBasicAuth = Base64.encode(basicAuth);
    console.log(encodedBasicAuth);

    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${encodedBasicAuth}`
        }
    })

    const token = response.data.access_token;
    const  expiresIn = response.data.expires_in;
    console.log(token);
    console.log(expiresIn);

    //stk push 

    //password


    //timestamp

    const date = new Date();
    const year = date.getFullYear();
    const currentMonth = date.getMonth()+ 1;
; 
    const  month = currentMonth < 10 ? '0'+currentMonth : currentMonth;
    const todayDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    

    const Timestamp = `${year}${month}${todayDate}${hour}${minutes}${seconds}`

   console.log(Timestamp);

   const password = Base64.encode(process.env.SHORT_CODE + process.env.PASS_KEY + Timestamp);
   console.log('password',password);


    //request body object
    const stkRequestBody = {
        "BusinessShortCode": process.env.SHORT_CODE,
        "Password": password,
        "Timestamp": Timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": process.env.SHORT_CODE,
        "PhoneNumber": phoneNumber,
        "CallBackURL": "https://geraldmumo.vercel.app/",
        "AccountReference": "price payment",
        "TransactionDesc": "price payment " 
    }

    const stkResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',stkRequestBody,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    console.log(stkResponse.data);

    return res.json({ success: true, message: 'Posted successfully' });
  }catch(err) {
    console.log(err);
    res.json({success: false, message: err.message});
  }
 
}

const controller ={
    payment
}

module.exports = controller;