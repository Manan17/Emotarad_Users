module.exports = (sequelize, DataTypes) => {
  const SecondaryIds = sequelize.define(
    "secondaryids",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      secondaryID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return SecondaryIds;
};
