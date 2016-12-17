module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/aff.js',
  },
  devtool: "source-map",
  devServer: {
    contentBase: __dirname,
    port: 5000,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/affjs)/,
        loader: 'babel-loader',
      },
    ],
  },
}
