const Order = require('../db/orderModel')

exports.storeOrders = async (req, res) => {
    try {
      const params = req.body.params;
      console.log('data from API ', params);
  
      const productIds = params.productId;
  
      const userAddress = params.userAddress;
  
      const timestampHex = params.timestamp.hex;
      const timestampDecimal = parseInt(timestampHex, 16) * 1000;
      const timestamp = new Date(timestampDecimal).toISOString();
  
      console.log('productIds ', productIds);
      console.log('userAddress ', userAddress);
      console.log('timestamp ', timestamp);
  
      const orders = productIds.map((productId) => {
        return new Order({ productId, userAddress, timestamp });
      });
  
      await Order.insertMany(orders);
  
      res.json({ orders, msg: 'Orders saved successfully' });
    } catch (error) {
      res.json({ error: 'Error creating orders' });
    }
  };
  


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.json(orders)
    } catch(err){
        res.json({ error: 'Error sending' });
    }
}

exports.filter = async(req, res) => {
    try {
        const filters = {};
        if (req.query.userAddress) {
          filters.userAddress = req.query.userAddress;
        }
        if (req.query.startTime && req.query.endTime) {
            console.log('asasas',req.query.startTime, req.query.endTime)
          filters.timestamp = { $gte: new Date(req.query.startTime), $lte: new Date(req.query.endTime) };
        }
        if (req.query.productId) {
          filters.productId = req.query.productId;
        }
      
        try {
          const orders = await Order.find(filters);
          res.json(orders);
        } catch (error) {
          res.json({ error: error.message });
        }
    } catch(err){
        res.json({ error: 'Error sending' });
    }
}