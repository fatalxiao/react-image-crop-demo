module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint/eslint-plugin'
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 0
    }
};
