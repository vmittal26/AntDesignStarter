const common = require("./webpack.common");
const merge = require("webpack-merge");
const globImporter = require('node-sass-glob-importer');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: "development",
  
    module: {

        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: 'style-loader' },
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
    plugins: [
        new AntdScssThemePlugin(path.join(__dirname, 'src', 'theme.scss')),
        new BundleAnalyzerPlugin()
      ],
    devtool:'cheap-module-eval-source-map',   
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        port: 8081
    }
    
});