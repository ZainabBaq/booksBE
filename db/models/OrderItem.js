module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  });

  return OrderItem;
};
