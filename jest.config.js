// jest.config.js
const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // if you have a setup file
  testEnvironment: 'jsdom',
  preset: 'ts-jest', // Use ts-jest preset for TypeScript
  moduleNameMapper: {
    // Handle module aliases (if you have them in tsconfig.json)
    // The specific mock for technologies.json is removed as it's no longer used by the current test strategy.
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    // Add other aliases here if needed
  },
  transform: {
    // Use ts-jest for .ts/.tsx files
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    // Use babel-jest for .js/.jsx files if needed, or rely on Next.js SWC
    '^.+\\.(js|jsx)$': 'babel-jest', // You might need to install babel-jest and @babel/preset-env
  },
   // Ignore Next.js build outputs and node_modules
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = async () => {
  const nextConfig = await createJestConfig(customJestConfig)();
  // Next.js's Jest transformer uses SWC. If you prefer ts-jest for all TS/TSX, you might need to adjust transform.
  // For now, let's ensure ts-jest is prioritized for .ts/.tsx as specified in customJestConfig.
  // The default Next.js transform should handle JS/JSX.
  // We might need to remove the explicit babel-jest transform if SWC handles it.
  // Let's remove the explicit babel-jest for now and let next/jest handle it.
  delete nextConfig.transform['^.+\\.(js|jsx)$'];
  return nextConfig;
}
