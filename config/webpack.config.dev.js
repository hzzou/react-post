const path = require('path');
const paths = require('./paths.js');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'development',
  resolve:{
    alias:{},
    extensions:['.js','.jsx','.json']
  },
  entry:[
    paths.appIndex
  ],
  devtool:'cheap-eval-source-map',
  output:{
    filename:'bundle.js',
    devtoolModuleFilenameTemplate:info=>path.resolve(info.absoluteResourcePath.replace(/\\/g,'/'))
  },
  module:{
    rules:[
      {
        enforce:'pre',
        test:/\.js$/,
        loader:'source-map-loader'
      },
      {
        test:/\.(png|jpg|jpeg|svg|gif)$/,
        loader:'url-loader'
      },
      {
        test:/\.(js|jsx)$/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 2,
                  "helpers": true,
                  "regenerator": true,
                  "useESModules": false
                }
              ]
              '@babel/plugin-proposal-class-properties']
          }
        },
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlPlugin({
      title:'React项目',
      template:paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    historyApiFallback:true,
    disableHostCheck:true,
    host:'localhost',
    port:'8095',
    hot:true,
    inline:true,
    open:true,
    watchContentBase:true,
    clientLogLevel:'none',
  }
});