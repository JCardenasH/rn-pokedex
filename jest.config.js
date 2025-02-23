module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-url-polyfill|react-redux)/)',
  ],
};
