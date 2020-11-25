const paths = require('./paths.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWepackPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  performance: { //隐藏默认的性能警告
    hints: false
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: paths.appIndex,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name]-[hash:8].js',
    publicPath: './'
  },
  //devtool:'cheap-module-source-map',
  devtool: false,
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf)$/,
        loader: 'url-loader'
      },

      {
        test: /\.s(a|c)ss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader
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
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader
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
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          output: {
            comments: false
          },
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React项目',
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      favicon: './favicon.ico'
    }),
    new CompressionWepackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|svg)$/,
      compressionOptions: {
        level: 9
      },
      deleteOriginalAssets: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[contenthash:8].css'
    }),

  ]
})