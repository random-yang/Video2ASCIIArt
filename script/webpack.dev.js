const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        inline: true,
        hot: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
})
