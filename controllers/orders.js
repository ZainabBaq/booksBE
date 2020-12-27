const { Order, OrderItem } = require("../db/models");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const orderItems = req.body.map((item) => {
      return { ...item, orderId: newOrder.id };
    });
    const newItems = await OrderItem.bulkCreate(orderItems);
    res.status(201).json(newItems);
  } catch (error) {
    next(error);
  }
};
