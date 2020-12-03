const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require("webpack").DefinePlugin;

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist/dev' );
const FILENAME = 'bundle.js';

module.exports = {
    context: ROOT,

    entry: {
        'main': './index.ts'
    },
    
    output: {
        filename: FILENAME,
        path: DESTINATION
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 8080,
        open: true,
        bonjour: true
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'only-ttf-loader',
                        options: {},
                    },
                ]
            },
            /****************
            * PRE-LOADERS
            *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },
            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader'
            }
        ]
    },

    devtool: 'cheap-module-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            hash: true,
            template: `${ROOT}/index.ejs`
        }),
        new DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version),
            DATA: JSON.stringify(require("./package.json").data)
        })
    ]
};

