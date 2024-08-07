'use strict';
const { comparePassword, hashPassword } = require(`../helpers/bcrypt`);
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Bookmark, {
        foreignKey: `UserId`
      });

      User.hasMany(models.Comment, {
        foreignKey: `UserId`
      });
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is Required`
        },
        notEmpty: {
          msg: `Name is Required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `The Email is Already in Use`
      },
      validate: {
        notNull: {
          msg: `Email is Required`
        },
        notEmpty: {
          msg: `Email is Required`
        },
        isEmail: {
          msg: `Invalid Email Format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        },
        notEmpty: {
          msg: `Password is Required`
        },
        len: {
          args: [4],
          msg: `Minimum Password Length is 4`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  })
  return User;
};