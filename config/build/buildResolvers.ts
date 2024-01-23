import { Configuration as WebpackConfiguration } from "webpack";
import { WebpackOptions } from "./types";

export const buildResolvers = (options: WebpackOptions): WebpackConfiguration["resolve"] => {
    const { paths } = options;
    const resolve: WebpackConfiguration["resolve"] = {};

    resolve.extensions = [".tsx", ".ts", ".js"];

    resolve.alias = {
        "@": paths.src,
    };

    return resolve;
};
