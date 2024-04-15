const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ClassDetail = sequelize.define("ClassDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        },
    },
        {
            tableName: "ClassDetail",
            timestamps: true
        });
    ClassDetail.associate = () => {

    }
    return ClassDetail;
}