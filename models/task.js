module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        vet_visit: { type: DataTypes.BOOLEAN, allowNull: false },
        walk_pet: { type: DataTypes.BOOLEAN, allowNull: false },
        get_supplies: { type: DataTypes.BOOLEAN, allowNull: false },
    });
    
    Task.associate = function(models) {
        Task.belongsTo(models.Volunteer, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};