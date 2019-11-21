const bcrypt = require("bcryptjs");

//Create a model for our tasks

//exporting this model to our index
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("Tasks", {
    //define columns of our table
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fullName: {
      type: DataTypes.STRING
    },

    dob: {
      type: DataTypes.STRING
    },

    phoneNumber: {
      type: DataTypes.STRING
    },

    employed: {
      type: DataTypes.STRING
    },

    country: {
      type: DataTypes.STRING
    },

    trade: {
      type: DataTypes.BOOLEAN
    },

  });

  //create custom methods for our user model

  //comparing password to hash password
  User.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // hooks happen on specific scenarios

  //encrypting user passwords
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
