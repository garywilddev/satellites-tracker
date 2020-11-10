module.exports = {
  env: {
    es2021: true
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["prettier", "import"]
};