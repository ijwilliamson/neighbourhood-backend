const Post = require("./postModel");
const User = require("../user/userModel");
const FavoritePost = require("./userPostModel");
const { Op } = require("sequelize");

exports.createPost = async (req, res) => {
    try {
        if (!req.body.user_id) {
            res.status(500).json({
                message: "No user provided",
            });
            return;
        }

        const user = await User.findByPk(
            req.body.user_id
        );
        if (!user) {
            res.status(500).json({
                message: "User not found",
            });
            return;
        }

        const newPost = await Post.create({
            post_type: req.body.post_type,
            post_content: req.body.post_content,
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON(),
        });

        if (!newPost) {
            res.status(500).json({
                message: "Post not created",
            });
            return;
        }

        user.addPost(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.favoritePost = async (req, res) => {
    try {
        const result = await FavoritePost.destroy(
            {
                where: {
                    UserId: req.body.user_id,
                    PostId: req.body.post_id,
                },
            }
        );

        if (result) {
            res.status(201).json({
                message: "favorite removed",
            });
            return;
        }

        const post = await Post.findByPk(
            req.body.post_id
        );

        if (!post) {
            res.status(500).json({
                message: "post not found",
            });
            return;
        }

        post.addUser(req.body.user_id);
        res.status(201).json({
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readTypePost = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                post_type: req.params.post_type,
            },
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.searchPost = async (req, res) => {
    try {
        if (!req.params.search) {
            res.status(500).json({
                message:
                    "No search term supplied",
            });
            return;
        }

        const posts = await Post.findAll({
            where: {
                post_content: {
                    [Op.like]: `%${req.params.search}%`,
                },
            },
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readUserPost = async (req, res) => {
    try {
        if (!req.params.user_id) {
            res.status(500).json({
                message: "No user_id provided",
            });
            return;
        }

        const user = await User.findByPk(
            req.params.user_id,
            {
                include: { model: Post },
            }
        );

        if (!user) {
            res.status(500).json({
                message: "User not found",
            });
            return;
        }

        res.status(200).json(user.Posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readPost = async (req, res) => {
    try {
        const post = await Post.findByPk(
            req.params.id
        );
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(
            req.params.id
        );
        if (post) {
            await post.update(req.body);
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(
            req.params.id
        );
        if (post) {
            await post.destroy();
            res.status(200).json({
                message: "Post deleted",
            });
        } else {
            res.status(404).json({
                message: "Post not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
