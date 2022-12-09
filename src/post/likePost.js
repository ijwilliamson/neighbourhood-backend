const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");
const User = require("../user/userModel");
const Post = require("./postModel");

// The many to many table used for the favorites
const LikePost = sequelize.define(
    "Likes",
    {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
        PostId: {
            type: DataTypes.INTEGER,
            references: {
                model: Post,
                key: "id",
            },
        },
    },
    { timestamps: false }
);

module.exports = LikePost;
