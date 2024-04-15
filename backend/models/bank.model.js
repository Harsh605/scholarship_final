const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const BankDetail = sequelize.define("BankDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        bankName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        accountHolderName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        accountNo: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        ifsc: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "bankDetail",
            timestamps: true
        });
    BankDetail.associate = () => {
       
    }
    return BankDetail;
}