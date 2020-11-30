const { Sequelize } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
// Book Module
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  SequelizeSlugify.slugifyModel(Book, {
    source: ["name"],
  });
  return Book;
};
