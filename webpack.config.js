
const join = require('path').join;
const resolve = require('path').resolve;
const webpack = require('webpack');

console.log('__dirname = ' + __dirname);

const PATHS = {
    js: join(__dirname,'src/js'),
    fonts: join(__dirname,'fonts'),
    dist: 'dist/js'
};


module.exports = {
    entry: {
        src: join(PATHS.js,'index.js')
    },
    resolve: {
        extensions: ['', '.js']
       
    },
    output: {
        path: process.cwd(),
        publicPath: '',
        filename: join(PATHS.dist,'bundle.js')
    },
    module: {
        loaders: [
        {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.js
        },
        {
            test: /\.js$/,
            loader: 'babel',
            include: PATHS.js,
            exclude: /node_modules/
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            include : PATHS.fonts,
            loader: `file?name=/fonts/[name].[ext]`
        }]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: process.cwd(),

        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        // display only errors to reduce the amount of output
        stats: 'errors-only',

        // parse host and port from env so this is easy
        // to customize
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true
};

// host: is the IP address you wish to test against.
// you have seen it as 0.0.0.0 or 127.0.0.1 as examples
// here I use NODE, and it has an object called process
// which contains an object called env, which has properties
// called HOST and PORT, which you can set at the terminal, or
// use defaults (which I think is 127.0.0.1 and port 8080)

// the plugins setting above allows the page to be auto-refreshed.
// the "HotModuleReplacementPlugin()" is a plugin for webpack that
// performs the task.
// the tech info is at - https://webpack.github.io/docs/hot-module-replacement.html

