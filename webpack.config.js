const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports =  () => {
  if((isProduction && isDevelopment) || (!isProduction && !isDevelopment)){
    throw new Error('Please, set valid NODE_ENV variable!!!')
  }

  console.log(`Project is running in ${process.env.NODE_ENV} mode.`)

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
          test: /\.(png|jpe?g|gif|ico|ttf|woff2|woff|eot)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        }
      ]
    }
  }
}