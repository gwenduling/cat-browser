module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  verbose: true,
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/*.{js,jsx,ts,tsx}",
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/src/reportWebVitals.ts",
    "!**/src/index.tsx"
  ]
};
