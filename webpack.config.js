const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    watch: !isProduction,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
    entry: './src/index.js', //'./src/css/owfont-regular.css', './src/css/style.css',//
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(ico|png|svg|jpe?g|gif|mp3)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin({
      //   template: 'index.html',
      // }),
      // new MiniCssExtractPlugin({
      //   filename: 'style.css',
      // }),
    ],
  };
  return config;
};
