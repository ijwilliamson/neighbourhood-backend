const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Comment = sequelize.define(
    "Comment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            require: true,
        },
    },
    { timestamps: false }
);

module.exports = Comment;
