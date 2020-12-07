const { Sequelize } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
// Book Module
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("Author", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  SequelizeSlugify.slugifyModel(Author, {
    source: ["name"],
  });
  return Author;
};
