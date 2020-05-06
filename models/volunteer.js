module.exports = function(sequelize, DataTypes) {
    var Volunteer = sequelize.define("Volunteer", {
        
    name: {DataTypes.STRING,  allowNull: false},
    age:  DataTypes.INTEGER,
    address: {DataTypes.STRING,  allowNull: false},
    city: {DataTypes.STRING,  allowNull: false},
    state: {DataTypes.STRING,  allowNull: false},
    v_dl_num:  DataTypes.STRING, 
    v_dl_state: DataTypes.STRING,   
    v_phone_num: {DataTypes.STRING, allowNull: false},
    v_Gender: DataTypes.STRING
    });
  return Volunteer;
};
