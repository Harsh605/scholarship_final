const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const KYCDetail = sequelize.define("KYCDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        adminId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        panNo: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        panImage: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        tanNo: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        tanImage: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        aadharNo: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        aadharFront: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        aadharBack: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "kycDetail",
            timestamps: true
        });
    KYCDetail.associate = (models) => {
       
    }
    return KYCDetail;
}