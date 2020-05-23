const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

module.exports =  () => {
  if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development'){
    throw new Error('Please, set NODE_ENV variable!!!')
  }

  return {
    context: path.resolve(__dirname, 'src'),
    mode: process.env.NODE_ENV,
    entry: './main/index.ts',
    output:{
      filename: isProduction?'index.[contenthash].js':'index.[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      port: 8000,
      hot: true
    },
    resolve:{
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './main/index.html',
        minify: {
          collapseWhitespace: isProduction,
          removeComments: isProduction,
          removeRedundantAttributes: isProduction,
          removeScriptTypeAttributes: isProduction,
          removeStyleLinkTypeAttributes: isProduction,
          useShortDoctype: isProduction
        }
      }),
      new CopyWebpackPlugin({
        patterns: [
          {   
            from: path.resolve(__dirname, 'src/main/favicon.ico'),
            to: path.resolve(__dirname, 'dist'), 
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'bundle.[contenthash].css' : 'bundle.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevelopment,
                reloadAll: true,
              }
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.ts(x?)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|ttf|woff2|woff|eot)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ]
    }
  }
}