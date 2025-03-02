const callBack = (req, res) => {
  const { Body } = req.body;
  if (!Body) {
    return res.json({ success: false, message: "Invalid request" });
  }

  const { stkCallback } = Body;
  const {
    ResultCode,
    ResultDesc,
    CallbackMetadata,
    MerchantRequestID,
    CheckoutRequestID,
  } = stkCallback;

  if (ResultCode !== 0) {
    console.log("fail", stkCallback )
    return res.json({ success: false, message: ResultDesc });
  }

  let transactionDetails = {};
  if (CallbackMetadata && CallbackMetadata.Item) {
    CallbackMetadata.Item.forEach((item) => {
      transactionDetails[item.Name] = item.Value;
    });
  }

  const data = {
    MerchantRequestID,
    CheckoutRequestID,
    ResultCode,
    transactionDetails,
  };

  console.log("data", data);

  console.log("callback", CallbackMetadata);
  return res.json({ success: true, message: ResultDesc });

};

module.exports = callBack;
