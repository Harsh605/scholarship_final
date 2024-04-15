const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const AddressDetail = sequelize.define("AddressDetail", {
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
        street: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        pinCode: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        city: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        state: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "addressDetail",
            timestamps: true
        });
    AddressDetail.associate = () => {
        
    }
    return AddressDetail;
}