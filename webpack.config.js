const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      root: path.resolve(__dirname, './'),
      src: path.resolve(__dirname, 'src/'),
      api: path.resolve(__dirname, 'src/api'),
      modules: path.resolve(__dirname, 'src/modules'),
      configs: path.resolve(__dirname, 'src/configs'),
    },
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true,
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: '.', to: './dist/index.html' }],
    },
    compress: true,
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: './assets/images/favicon.ico',
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
