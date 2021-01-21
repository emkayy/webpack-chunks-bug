const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const isProd = process.env.NODE_ENV !== 'development';

const src = pathFragment => path.resolve(__dirname, 'src/' + (pathFragment || ''));

module.exports = {
    mode: isProd ? 'production' : 'development',

    devServer: {
        publicPath: '/', // webpack bug, should default to '/'
        contentBase: path.join(__dirname, 'build'),
    },

    optimization: {
        splitChunks: false
    },

    entry: {
        public: [ src('js/public.js'), src('less/public.less') ],
        video: [ src('less/video.less'), src('js/player.js') ],
    },

    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'js/[name].bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: { presets: [ [ "@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, } ] ] }
            }
        },
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                { loader: 'postcss-loader', options: { plugins: () => isProd ? [autoprefixer(), cssnano()] : [] } },
                'less-loader'
            ]
        },
    ]},

    plugins: [
        new RemoveEmptyScriptsPlugin(),

        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css',
            chunkFilename: '[name].css',
        }),

        new CleanWebpackPlugin(),
    ],

};
