module.exports = function(sequelize, DataTypes) {
  var Senior = sequelize.define("Senior", {
    name: { type: DataTypes.STRING, allowNull: false },
    age: DataTypes.INTEGER,
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zip: DataTypes.INTEGER
  });
  return Senior;
};
