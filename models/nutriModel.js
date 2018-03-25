

module.exports = function (sequelize, DataTypes) {
    var nutriModel = sequelize.define("nurtiModel", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_name: {
            type: DataTypes.STRING,
        },

        fav_recipe: {
            type: DataTypes.STRING,
        },
        risk_factor: {
            type: DataTypes.STRING,
        },
        diet_restiction: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    });

    return nutriModel;
};