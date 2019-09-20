module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "standard",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        "react",
        "react-hooks"
    ],
    rules: {
        "react/display-name": [0, { "ignoreTranspilerName": false }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    settings: {
        react: {
            version: "detect",
        },
    }
};