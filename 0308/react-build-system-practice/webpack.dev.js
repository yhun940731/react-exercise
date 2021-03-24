// node.js
const path = require('path');
const getAbsolutePath = (dirPath) => path.resolve(__dirname, dirPath);

// commonJS 진영의 내보내기
module.exports = {
  // 번들 모드 설정
  mode: 'development',
  // entry
  entry: {
    main: './src/index.js',
  },
  //output
  output: {
    path: getAbsolutePath('public'),
    filename: 'js/[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  // 개발 서버 설정
  devServer: {
    contentBase: getAbsolutePath('public'),
    index: 'index.html',
    port: 9000,
    hot: true,
    writeToDisk: true,
  },
};