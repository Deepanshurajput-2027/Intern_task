const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    { fields: ['name'] },
    { fields: ['ownerId'] }
  ]
});

module.exports = Store;
