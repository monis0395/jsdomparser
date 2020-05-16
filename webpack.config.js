const path = require("path");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const config = {
    entry: "./index.ts",
    output: {
        filename: "jsdomparser.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    optimization: {
        minimize: true,
    },
    mode: 'production',
    plugins: [new BundleAnalyzerPlugin()],
};

module.exports = config;
