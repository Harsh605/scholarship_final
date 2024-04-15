const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const DonationDetail = sequelize.define("DonationDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        paymentReferenceId: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        duration: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        donarId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        schemeId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        noOfStudent: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        mode: {
            type: DataTypes.ENUM,
            values: ['auto', 'manual'],
            defaultValue: 'manual'
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    },
        {
            tableName: "donationDetail",
            timestamps: true
        });
    DonationDetail.associate = () => {
       
    }
    return DonationDetail;
}