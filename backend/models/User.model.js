const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['student', 'donar'],
            defaultValue: 'student'
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
        image: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        mobile: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        otp: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        isVerified: {
            type: DataTypes.ENUM,
            values: ['Yes', 'No'],
            defaultValue: 'No'
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        },
        scholarshipRecieve: {
            type: DataTypes.ENUM,
            values: ['yes', 'no'],
            defaultValue: 'no'
        },
        scholarshipStatus: {
            type: DataTypes.ENUM,
            values: ['verified', 'unverified', 'pending', 'block'],
            defaultValue: 'unverified'
        }
    },
        {
            tableName: "users",
            timestamps: true
        });
    User.associate = (models) => {
        // User.belongsTo(models.UserType,{foreignKey:"user_type_id",targetKey:"id",as:"userTypeInfo"});
        // User.hasMany(models.Buyproduct,{foreignKey:"user_id",targetKey:"id",as:"buyProductInfo"});
        // User.hasMany(models.EdiiMessage,{foreignKey:"user_id",targetKey:"id",as:"ediiMessageInfo"});
    }
    return User;
}