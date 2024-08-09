'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        foreignKey: `UserId`
      });
    }
  }
  Bookmark.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `User ID is Required`
        },
        notEmpty: {
          msg: `User ID is Required`
        }
      }
    },
    ArticleId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Article ID is Required`
        },
        notEmpty: {
          msg: `Article ID is Required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};