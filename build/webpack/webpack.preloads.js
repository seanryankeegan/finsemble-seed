const path = require("path");
const preloadFilesToBuild = require("./webpack.preloads.entries.json");

let entries = {};
for (let key in preloadFilesToBuild) {
	let component = preloadFilesToBuild[key];
	entries[component.output] = component.entry;
}

module.exports = {
    devtool: 'source-map',
    entry: entries,
    stats: "minimal",
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: [/node_modules/, "/chartiq/"],
                loader: 'babel-loader',
                options: {
                    cacheDirectory: './.babel_cache/',
                    presets: ['react', 'stage-1']
                }
            }
        ]
    },
    output: {
        filename: "[name].js",
        sourceMapFilename: "[name].map.js",
        path: path.resolve(__dirname, '../../dist/'),
        publicPath: 'http://localhost:3375/'
    },
    watch: false,
    resolve: {
        extensions: ['.js', '.jsx', '.json', 'scss', 'html'],
        modules: [
            './node_modules',
            './src/components',
            './src/clients',
            './src/services'
        ],
    },
};