module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:cypress/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['eslint-plugin-no-inline-styles', 'cypress', 'prettier'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-inline-styles/no-inline-styles': 2,
        'no-multi-spaces': ['error'],
        curly: ['error', 'all'],
        'operator-linebreak': ['error', 'after'],
        'no-trailing-spaces': ['error'],
        'no-cond-assign': ['error', 'always'],
        'no-return-assign': ['error', 'always']
    },
    ignorePatterns: ['node_modules']
};
