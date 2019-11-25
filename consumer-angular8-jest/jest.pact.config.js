module.exports = {
  testMatch: [ "**/+(*.)+(pact)\.(spec)\.(ts)" ],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      astTransformers: [
        'node_modules/jest-preset-angular/build/InlineFilesTransformer',
        'node_modules/jest-preset-angular/build/StripStylesTransformer'
      ]
    },
    stringifyContentPathRegex: true
  },

  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  testURL: 'http://localhost:1234',
  setupFilesAfterEnv: ['<rootDir>/pact/jest/setupJest.ts']
};
