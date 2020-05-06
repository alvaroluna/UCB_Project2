module.exports = function(sequelize, DataTypes) {
    var Senior = sequelize.define("Senior", {
      
      name: {DataTypes.STRING,  allowNull: false},
      age:  DataTypes.INTEGER,
      address: {DataTypes.STRING,  allowNull: false},
      city: {DataTypes.STRING,  allowNull: false},
      state: {DataTypes.STRING,  allowNull: false},
      zip:  DataTypes.INTEGER,
      special_instruc: DataTypes.TEXT 
    });
    return Senior;
  };
  