export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "\\.(css|less)$": "identity-obj-proxy",
  },

  moduleDirectories: ["node_modules", "<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  rootDir: "./",
};
