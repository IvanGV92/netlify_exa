const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  //Por donde ingresa a la aplicacion
  entry: './src/index.js',
  //en donde se va a crear los distribuibles y con que nombre
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  watch: true,
  //Que extensiones va a manejar el proyecto. Si se manejan frameworks se tienen que agregar aca
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname,'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
  },
  module:{
    //Se establecen las reglas que debe cumplir como la prueba con las extensions por expresion regular o el loader que es babel
    rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css|.styl$/i,
      use: [MiniCssExtractPlugin.loader,
      'css-loader',
      'stylus-loader'
    ],

    },
    {
      test: /\.png/,
      type: 'asset/resource'
    },
    {
      test:/\.(woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
          name: "[name].[contenthash].[ext]",
          outputPath: "./assets/fonts/",
          publicPath: "../assets/fonts/",
          esModule:false,
        }
      }
    }
  ],

},
   plugins: [
    //Configuracion para optimizar y desplegar HTML
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname,"src","assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ],

}