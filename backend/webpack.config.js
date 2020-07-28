const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const isProduction =
	typeof process.env.NODE_ENV !== "undefined" &&
	process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";

console.log(mode);

const devtool = isProduction ? "source-map" : "inline-source-map";

module.exports = {
	entry: "./src/server.ts",
	target: "node",
	externals: [nodeExternals()],
	mode,
	devtool,
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
				include: path.resolve(__dirname, "src"),
				exclude: path.resolve(__dirname, "node_modules"),
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		filename: "server.js",
		path: path.resolve(__dirname, "dist"),
	},
};
