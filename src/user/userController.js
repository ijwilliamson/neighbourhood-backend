// Crud operations for user using express and sequelize
const User = require("./userModel");

// create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(
            req.body,
            {
                attributes: [
                    "id",
                    "user_name",
                    "email",
                    "pcd",
                    "name",
                    "address",
                    "region_id",
                ],
            }
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
                "id",
                "user_name",
                "email",
                "pcd",
                "name",
                "address",
                "region_id",
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readUser = async (req, res) => {
    try {
        const user = await User.findByPk(
            req.params.id,
            {
                attributes: [
                    "id",
                    "user_name",
                    "email",
                    "pcd",
                    "name",
                    "address",
                    "region_id",
                ],
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(
            req.params.id,
            {
                attributes: [
                    "id",
                    "user_name",
                    "email",
                    "pcd",
                    "name",
                    "address",
                    "region_id",
                ],
            }
        );
        if (user) {
            await User.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(
            req.params.id
        );
        if (user) {
            await User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: "User deleted",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
