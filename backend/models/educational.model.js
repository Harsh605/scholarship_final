const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const EducationDetail = sequelize.define("EducationDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        pursuingClass: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        year: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "educationDetail",
            timestamps: true
        });
    EducationDetail.associate = () => {
       
    }
    return EducationDetail;
}