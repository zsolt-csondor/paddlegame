const path = require('path');

module.exports = {
  entry: {
      app: "./public/paddlegame.js"
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
