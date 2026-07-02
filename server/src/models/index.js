const { sequelize } = require('../config/db');
const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

// Relationships Setup

// 1. User hasMany Ratings, Rating belongsTo User
// Cascade Rule: RESTRICT. We do not want to lose rating history if a user is deleted.
User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings', onDelete: 'RESTRICT' });
Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 2. Store hasMany Ratings, Rating belongsTo Store
// Cascade Rule: RESTRICT. Deleting a store should not be allowed if it has ratings, preserving history.
Store.hasMany(Rating, { foreignKey: 'storeId', as: 'ratings', onDelete: 'RESTRICT' });
Rating.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// 3. User (Owner) hasMany Stores, Store belongsTo User
// Cascade Rule: RESTRICT. A store owner cannot be deleted if they still own stores.
User.hasMany(Store, { foreignKey: 'ownerId', as: 'ownedStores', onDelete: 'RESTRICT' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = {
  sequelize,
  User,
  Store,
  Rating
};
