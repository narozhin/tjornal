let path = require('path')

module.exports = {
	entry: "./src/index.js",
	output: {
		 path: path.resolve(__dirname),
		 filename: "bundle.js"
	},
	watch: true,
	module: {
	  	rules: [
		    {
		      test : /\.jsx?/,
		      exclude: /(node_modules|bower_components)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['env']
		        }
		      }
		    },
		    {
        		test: /\.css$/,
        		use: [
          			{ loader: "style-loader" },
          			{ loader: "css-loader" }
        		]
      		}
	  	]
	}
}
