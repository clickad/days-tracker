const path = require('path');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     title: 'Output Management'
  //   })
  // ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
	  {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env"]
			}
		}
		}
	  
    ]
  }
};