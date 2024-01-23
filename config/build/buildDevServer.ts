import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { WebpackOptions } from "./types";

export const buildDevServer = (options: WebpackOptions): DevServerConfiguration | undefined => {
    const { isBuild, port } = options;

    if (isBuild) return undefined;

    const devServer: DevServerConfiguration = {
        historyApiFallback: true,
        port: port || 3000,
        open: true,
        hot: true,
    };

    return devServer;
};
