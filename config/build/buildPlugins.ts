import path from "path";
import webpack, { WebpackPluginInstance } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { WebpackOptions } from "./types";

export const buildPlugins = (options: WebpackOptions): WebpackPluginInstance[] => {
    const { analyzer, isDev, isProd, isBuild, paths } = options;

    const plugins: WebpackPluginInstance[] = [];

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    if (isDev) {
        plugins.push(
            new HtmlWebpackPlugin({
                favicon: paths.favicon,
                template: paths.public,
            })
        );
    }

    if (isDev && !isBuild) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProd) {
        plugins.push(
            new HtmlWebpackPlugin({
                filename: "index.[contenthash].html",
                title: 'init react app',
                favicon: paths.favicon,
                template: paths.public,
            })
        );
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash].css",
                chunkFilename: "css/[name].[contenthash].css",
            })
        );
    }

    if (isBuild) {
        plugins.push(
            new CopyPlugin({
                patterns: [{ from: paths.assets, to: path.resolve(paths.output, "assets") }],
            })
        );
    }

    return plugins;
};
