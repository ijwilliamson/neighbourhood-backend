const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Post = sequelize.define(
    "Post",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        post_type: {
            type: DataTypes.INTEGER,
        },
        // user_id not required as this is generated automatically by the association
        // user_id: {
        //     type: DataTypes.INTEGER,
        // },
        post_content: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
        regionId: {
            type: DataTypes.INTEGER,
        },
    },
    { timestamps: false }
);

module.exports = Post;
