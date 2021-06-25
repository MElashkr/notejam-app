const resolve = require('path').resolve


module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    //entry: ['./app.js'],
    entry: ['./bin/www'],
    output: {
        filename: "app-bundle.js",
        path: resolve(__dirname, './../dist')
    }
}