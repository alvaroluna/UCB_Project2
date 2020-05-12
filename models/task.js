module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    volunteerId: DataTypes.INTEGER,
    task: { type: DataTypes.ENUM, values: ["01", "02", "03", "04"] },
    date: DataTypes.DATEONLY,
    seniorId: DataTypes.INTEGER,
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    specialInstr: DataTypes.TEXT
  });
  return Task;
};
