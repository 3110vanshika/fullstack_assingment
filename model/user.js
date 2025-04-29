const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const user = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    failedLoginAttempts: {
        type: DataTypes.INTEGER,
        default: 0
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    blockedAt: {
        type: DataTypes.DATE,
        default: null
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    previousPasswords: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        defaultValue: [],
    },
},{
    timestamps: true,
    freezeTableName: true,
});

module.exports = user;