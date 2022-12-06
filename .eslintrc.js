module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "google",
        "prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "require-jsdoc": "off",
    },
};

