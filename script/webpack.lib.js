const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝不需要webpack处理的静态资源
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空构建目录

module.exports = {
    mode: 'production',
    entry: {
        Video2ASCIIArt: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/lib/',
        filename: 'Video2ASCIIArt.umd.js',
        library: 'Video2ASCIIArt', // 模块名称
        libraryExport: 'default',
        libraryTarget: 'umd' // 输出格式
    },
    externals: {
        vue: 'vue'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
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
                            name: 'img/[name].[hash:8].[ext]'
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
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/index_2.html'),
                to: '../lib'
            }
        ])
    ]
}
