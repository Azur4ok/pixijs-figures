const path = require('path')
const HtmlWebplackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebplackPlugin({
      title: 'pixijs-figures',
      template: path.join(__dirname, '/src/index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 4000,
    hot: true,
    open: true,
  },
  performance: { hints: false },
}
