const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空构建目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') //

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // 区分server和发布环境
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
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
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ['vue-style-loader', 'css-loader', 'sass-loader']
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mov|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        inline: true,
        hot: true
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        })
    ]
}
