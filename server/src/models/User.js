const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: [2, 60],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // Note: The 8-16 char validation should ideally happen before bcrypt hashing.
    // If we validate here, it will fail after hashing since bcrypt hashes are 60 chars.
    // However, keeping it to satisfy the specific db schema constraints phase.
    validate: {
      len: [8, 60], // Allowing up to 60 for bcrypt compatibility, but frontend/controller will enforce 8-16
    },
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: true,
    validate: {
      len: [0, 400],
    },
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'USER', 'STORE_OWNER'),
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['email'] },
    { fields: ['role'] }
  ]
});

module.exports = User;
