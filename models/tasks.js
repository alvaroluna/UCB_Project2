module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
      
      volunteer_id:  DataTypes.INTEGER,
      task:type: {DataTypes.ENUM, values: ['01', '02', '03', '04']},
      date:  DataTypes.DATE,
      senior_id: DataTypes.INTEGER,
      completed: {DataTypes.BOOLEAN,  allowNull: false, defaultValue: false},
      special_instruc: DataTypes.TEXT 
    });
    return Task;
  };
  