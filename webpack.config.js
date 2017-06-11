const path = require('path')

module.exports = {
   entry: path.join(__dirname, 'src', 'index.js'),
   output: {
      path: path.join(__dirname, 'build'),
      filename: 'app.build.js'
   },
   module: {
      loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
            presets: ['es2015', 'stage-2', 'react']
         }
      }, {
         test: /\.css$/,
         exclude: /node_modules/,
         loader: 'style-loader!css-loader'
      }]
   }
}
