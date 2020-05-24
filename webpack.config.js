const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolveRelativePath = relativePath => path.resolve(__dirname, relativePath)

process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  entry: resolveRelativePath('src'),
  output: {
    filename: 'static/js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    contentBase: resolveRelativePath('public'),
    compress: true,
    hot: true, // hot-reloading!
    open: true,
    port: 3000,
    publicPath: '/',

  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveRelativePath('public/index.html'),
    }),
    new webpack.DefinePlugin({
      IEX_API_KEY: JSON.stringify('pk_ced49274168f445d883fb81a650c4dd5'), // publishable
      IEX_CLOUD_API_URL: JSON.stringify('https://cloud.iexapis.com/stable')
    })
  ],
}
