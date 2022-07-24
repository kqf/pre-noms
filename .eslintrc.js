module.exports = {
    env: {
        browser: false,
        es2021: true,
        mocha: true,
        node: true
    },
    root: true,
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/ban-ts-comment": ["off"],
        "semi": ["error", "always"],
        "indent": ["error", 4],
    }
};
