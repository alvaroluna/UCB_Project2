module.exports = function(sequelize, DataTypes) {
  var Volunteer = sequelize.define("Volunteer", {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zip_code: { type: DataTypes.INTEGER, allowNull: false },
    driver_license: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    transport: { type: DataTypes.STRING, allowNull: false },
  });

  Volunteer.associate = function(models) {
    Volunteer.hasMany(models.Task, {
      
    })
  }
  return Volunteer;
};
