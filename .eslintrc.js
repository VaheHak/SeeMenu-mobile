module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/static-property-placement': [0],
    'no-mixed-operators': [0],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [0],
    'react/destructuring-assignment': [1],
    'react/jsx-props-no-spreading': [0],
    'react/prefer-stateless-function': [0],
    'max-len': [2, { code: 120 }],
  },
};
