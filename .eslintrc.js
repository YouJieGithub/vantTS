module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // enable JSX
      impliedStrict: true, // enable global strict mode
    },
  },
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "no-irregular-whitespace": ["off"], // 取消空格报错
    "no-unused-vars": "off", // 定义了或者声明引入了，但没有使用不报错
    "@typescript-eslint/no-unused-vars": ["off"], //没有使用的参数，不会报错。因为个人觉的把可用的参数写上去 有利于以后的维护。
    "@typescript-eslint/no-empty-function": ["off"], // 方法内部没有逻辑书写，不会报错，可以先定义好方法名，方便使用
    "@typescript-eslint/no-explicit-any": ["off"], // ts 定义数据类型为any不报错
  },
};
