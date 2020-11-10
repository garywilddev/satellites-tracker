module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['../../.eslintrc.js', 'plugin:react/recommended', 'nextjs'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {},
}
