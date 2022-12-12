// ----------------------------------------------
// Neighbourhood Backend Node.js with Express.js
// Authors: Rowan and Ian
// Date: Dec 2022
// ----------------------------------------------

const { sequelize } = require("./db/connection");
const express = require("express");

const User = require("./user/userModel");
const Post = require("./post/postModel");
const FavoritePost = require("./post/userPostModel");
const likePost = require("./post/likePost");
const Comment = require("./comments/commentModel");

// swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Neighbourhood Backend",
            description:
                "The Neighbourhood App Backend API",
            contact: {
                name: "Rowan / Ian",
            },
            servers: ["http://localhost:5000"],
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    // ['.routes/*.js']
    apis: [
        "src/post/postRoutes.js",
        "src/region/regionRoutes.js",
        "src/school/schoolRoutes.js",
        "src/user/userRoutes.js",
        "src/auth/authRoutes.js",
        "src/comments/commentRoutes.js",
        "src/server.js",
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// routes

const postRouter = require("./post/postRoutes");
const regionRouter = require("./region/regionRoutes");
const userRouter = require("./user/userRoutes");
const authRouter = require("./auth/authRoutes");
const schoolRouter = require("./school/schoolRoutes");
const commentRouter = require("./comments/commentRoutes");

// sequelize
const syncTables = async () => {
    // Set up the foreign key relationship with Posts

    User.hasMany(Post, {
        OnDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Post.belongsTo(User);

    User.belongsToMany(Post, {
        through: FavoritePost,
    });

    Post.belongsToMany(User, {
        through: FavoritePost,
    });

    User.belongsToMany(Post, {
        through: likePost,
    });
    Post.belongsToMany(User, {
        through: likePost,
    });

    Post.hasMany(Comment, {
        OnDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Comment.belongsTo(Post);

    sequelize.sync();
};

syncTables();

// server config
const port = process.env.PORT || 5001;
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(postRouter);
app.use(regionRouter);
app.use(userRouter);
app.use(authRouter);
app.use(schoolRouter);
app.use(commentRouter);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);

// health manager route
app.get("/health", (request, response) => {
    response
        .status(200)
        .send({ message: "API is working" });
});

// start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
