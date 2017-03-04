const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';

const PACKAGE = require('./package.json');

const PATHS = {
    context: path.join(__dirname, './src'),
    build: path.join(__dirname, './build'),
    nodeModulesPath: path.resolve(__dirname, './node_modules')
};


module.exports = {
    context: PATHS.context,
    devtool: '#inline-source-map',
    entry: {
        "app": './index.js'
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(js)$/,
                loaders: ['babel-loader'],
                exclude: [PATHS.nodeModulesPath]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
                PACKAGE_NAME: JSON.stringify(PACKAGE.name),
                PACKAGE_VERSION:  JSON.stringify(PACKAGE.version + '-dev')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,     /** deps shared by chunks are extracted into its own async chunk **/
            async: true
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 25000        /** Chunks must be at least 25K (approximated) to be considered a chunk */
        })

    ]


};