const bcrypt = require("bcryptjs");

//Create a model for our tasks

//exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var Transactions = sequelize.define("Transactions", {
    //define columns of our table

    description: {
      type: DataTypes.STRING
    },

    type: {
      type: DataTypes.BOOLEAN
    },

    category: {
      type: DataTypes.STRING
    },

    futureBooleans: {
      type: DataTypes.BOOLEAN
    },

    data: {
      type: DataTypes.STRING
    },

    balance: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });

  return Transactions;
};
