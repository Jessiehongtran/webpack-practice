const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        about: './src/about.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: 'css-loader'
            }, 
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    
}