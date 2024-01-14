const dbConfig = require("../db-config");
const Sequelize = require("sequelize");

// Connect to mysql db
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);
// Get the models
const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./users")(sequelize, Sequelize.DataTypes);
db.models.SecondayId = require("./secondaryids")(
  sequelize,
  Sequelize.DataTypes
);
// One to Many association.
db.models.User.hasMany(db.models.SecondayId, {
  foreignKey: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
  },
});

db.models.SecondayId.belongsTo(db.models.User);
module.exports = db;
