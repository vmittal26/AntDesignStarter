const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const tsImportPluginFactory = require('ts-import-plugin');
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js"),
            moment: `moment/moment.js`
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: true
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                exclude: /node_modules/
            },

            {
                test: /\html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images"
                    }
                }
            }
        ]
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins: [
        new HTMLWebpackPlugin({
        template: "./src/index.html"
    }),
     new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
    ]
}