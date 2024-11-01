// frontend/jest.config.js
module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!axios|@mui|recharts)" // Transpile axios, MUI, and Recharts
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    globals: {
      "ts-jest": {
        useESM: true
      }
    }
  };
  