const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['admin', 'subAdmin'],
            defaultValue: 'admin'
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: null,
            unique: {
                args: true,
                msg: "Email address already in use!"
            },
            validate: {
                notEmpty: {
                    args: false,
                    msg: "Email field required."
                },
                isEmail: {
                    msg: "Please enter valid email."
                }
            }
        },
        mobile: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        otp: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        permission: {
            type: DataTypes.STRING,
            defaultValue: '[]'
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    },
        {
            tableName: "admins",
            timestamps: true
        });
    Admin.associate = (models) => {
       
    }
    return Admin;
}