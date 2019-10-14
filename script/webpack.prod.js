const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝不需要webpack处理的静态资源

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: 'none',
    output: {
        publicPath: './'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    minSize: 0
                },
                default: {
                    minSize: 0,
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/favicon.ico'),
                to: '../dist'
            }
        ])
    ]
})
