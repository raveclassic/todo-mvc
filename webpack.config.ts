import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT = path.resolve(__dirname);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const config: Configuration = {
	entry: path.resolve(ROOT, './src/index.tsx'),
	output: {
		path: path.resolve(ROOT, 'dist'),
		filename: '[name].[contenthash].js',
	},
	mode: IS_PRODUCTION ? 'production' : 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	devServer: {
		contentBase: './build',
	},
	optimization: {
		runtimeChunk: 'single',
		moduleIds: 'hashed',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
							projectReferences: true,
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devtool: false,
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};

export default config
