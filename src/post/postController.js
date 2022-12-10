const Post = require("./postModel");
const User = require("../user/userModel");
const FavoritePost = require("./userPostModel");
const likePost = require("./likePost");
const { Op } = require("sequelize");
const { sequelize } = require("../db/connection");

const baseSQL = `SELECT Posts.id, post_type, Posts.UserId as user_id, Users.user_name, Posts.created_at, post_content, 
                    If (PostLikes.Likes IS NULL, 0, PostLikes.Likes) AS likes,
                    If (Favorites.UserId IS NOT NULL, True, False) As fav,
                    If (Likes.UserId IS NOT NULL, True, False) As userLike
                    FROM Posts
                    LEFT JOIN Favorites On Posts.Id = Favorites.PostId AND Posts.UserId = Favorites.UserId
                    LEFT JOIN Likes on Posts.Id = Likes.PostId AND Posts.UserId = Likes.UserId
                    LEFT JOIN PostLikes On Posts.Id = PostLikes.PostId
                    LEFT JOIN Users ON Posts.UserId = Users.id`;

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
            regionId: req.region,
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

exports.likePost = async (req, res) => {
    try {
        const result = await likePost.destroy({
            where: {
                UserId: req.body.user_id,
                PostId: req.body.post_id,
            },
        });

        if (result) {
            res.status(201).json({
                message: "like removed",
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

        await likePost.create({
            UserId: req.body.user_id,
            PostId: req.body.post_id,
        });

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
        const sql = `${baseSQL}
                    WHERE (Favorites.UserId = ${req.userId} OR Favorites.UserId IS NULL) AND RegionId = ${req.region}`;

        const posts = await sequelize.query(sql);

        res.status(200).json(posts[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readTypePost = async (req, res) => {
    // req.params.post_type will now be an arry  [2,3,4] as a string

    try {
        // build filter
        const filterString = req.params.post_type;
        const filter = JSON.parse(filterString);
        let sqlFilter = "";
        filter.forEach((f) => {
            sqlFilter += `post_type = ${f} OR `;
        });
        sqlFilter = sqlFilter.slice(
            0,
            sqlFilter.length - 4
        );
        console.log(sqlFilter);

        const sql = `${baseSQL}
                    WHERE ((Favorites.UserId = ${req.userId} OR Favorites.UserId IS NULL) AND
                            (${sqlFilter})) AND RegionId = ${req.region}`;

        const posts = await sequelize.query(sql);

        // const posts = await Post.findAll({
        //     where: {
        //         post_type: req.params.post_type,
        //     },
        // });
        res.status(200).json(posts[0]);
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

        const sql = `${baseSQL}
                    WHERE ((Favorites.UserId = ${req.userId} OR Favorites.UserId IS NULL) AND
                            (post_content LIKE '%${req.params.search}%')) AND RegionId = ${req.region}`;

        const posts = await sequelize.query(sql);

        // const posts = await Post.findAll({
        //     where: {
        //         post_content: {
        //             [Op.like]: `%${req.params.search}%`,
        //         },
        //     },
        // });
        res.status(200).json(posts[0]);
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

        const sql = `${baseSQL}
                    WHERE ((Favorites.UserId = ${req.userId} OR Favorites.UserId IS NULL) AND
                            (Posts.UserId = ${req.params.user_id}))  AND RegionId = ${req.region}`;

        const posts = await sequelize.query(sql);

        // const user = await User.findByPk(
        //     req.params.user_id,
        //     {
        //         include: { model: Post },
        //     }
        // );

        // if (!user) {
        //     res.status(500).json({
        //         message: "User not found",
        //     });
        //     return;
        // }

        res.status(200).json(posts[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readPost = async (req, res) => {
    try {
        const sql = `${baseSQL}
                    WHERE ((Favorites.UserId = ${req.userId} OR Favorites.UserId IS NULL) AND
                            (Posts.id = ${req.params.id}))  AND RegionId = ${req.region}`;

        const post = await sequelize.query(sql);

        // const post = await Post.findByPk(
        //     req.params.id
        // );

        if (post[0].length === 0) {
            res.status(500).json({
                message: "post not found",
            });
        }

        res.status(200).json(post[0][0]);
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
