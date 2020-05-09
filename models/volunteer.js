module.exports = function (sequelize, DataTypes) {
  var Volunteer = sequelize.define("Volunteer", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dob: DataTypes.DATEONLY,
    streetAddress: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    dlNum: DataTypes.STRING,
    dlState: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phoneNum: { type: DataTypes.STRING, allowNull: false },
    gender: DataTypes.STRING
  });
  return Volunteer;
};
