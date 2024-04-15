const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const ProfessionalDetail = sequelize.define("ProfessionalDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        fatherName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        occupation: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        designation: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        annualIncome: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "professionalDetail",
            timestamps: true
        });
    ProfessionalDetail.associate = (models) => {
        
    }
    return ProfessionalDetail;
}