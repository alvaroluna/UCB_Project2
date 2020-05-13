module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    volunteerId: DataTypes.INTEGER,
    task: {
      type: DataTypes.ENUM,
      values: ["Dog Walking", "Grooming", "Vet Visit", "Pet Sitting"],
    },
    date: DataTypes.DATEONLY,
    seniorId: DataTypes.INTEGER,
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    specialInstr: DataTypes.TEXT,
  });
  return Task;
};
