module.exports = {
    publicPath: './',
    css: { extract: process.env.BUILD_LIB === 'true' ? false : true },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(mov|mp4)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        }
    }
}
