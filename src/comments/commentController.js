const Comment = require("./commentModel");
const { sequelize } = require("../db/connection");

exports.createComment = async (req, res) => {
    try {
        const newComment = await Comment.create({
            PostId: req.body.PostId,
            userId: req.userId,
            content: req.body.content,
        });
        if (!newComment) {
            res.status(500).json({
                message:
                    "Comment could not be created",
            });
            return;
        }

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getComments = async (req, res) => {
    try {
        const sql = `SELECT Comments.Id, Comments.PostId, Comments.userId, Comments.content, 
                         Users.user_name FROM Comments
                         INNER JOIN Users On Comments.userId = Users.id
                         WHERE PostId = ${req.params.PostId}`;

        const comments = await sequelize.query(
            sql
        );

        if (!comments) {
            res.status(201).json([]);
        }

        res.status(201).json(comments[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(
            req.params.id
        );
        if (comment) {
            await comment.destroy();
            res.status(200).json({
                message: "Comment deleted",
            });
        } else {
            res.status(404).json({
                message: "Comment not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
