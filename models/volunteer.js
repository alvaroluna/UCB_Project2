module.exports = function(sequelize, DataTypes) {
  var Volunteer = sequelize.define("Volunteer", {
    name: { type: DataTypes.STRING, allowNull: false },
    age: DataTypes.INTEGER,
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    dlNum: DataTypes.STRING,
    dlState: DataTypes.STRING,
    phoneNum: { type: DataTypes.STRING, allowNull: false },
    gender: DataTypes.STRING
  });
  return Volunteer;
};
