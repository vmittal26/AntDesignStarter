const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'overrideBrowserslist': ['> 1%', 'last 2 versions']
                            })],
                        }
                    },
                    AntdScssThemePlugin.themify({
                        loader: 'sass-loader',
                        options: {
                            importer: globImporter()
                        },
                      }),
                    ]
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                  },
                  AntdScssThemePlugin.themify('less-loader'),
                ],
              },
        ]
    },
    devtool:'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./src/css/[name].[contentHash].css"
        }),
        new AntdScssThemePlugin(path.join(__dirname, 'src', 'theme.scss')),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]

})