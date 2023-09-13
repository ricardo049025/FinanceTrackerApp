const User = require('../models/User');
const Transaction = require('../models/Transaction');

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });