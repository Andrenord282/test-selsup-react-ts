import path from "path";
import { buildConfig } from "./config/build/buildConfig";
import { Configuration as WebpackConfiguration } from "webpack";
import { WebpackEnv, WebpackOptions } from "./config/build/types";

export default (env: WebpackEnv): WebpackConfiguration => {
    const options: WebpackOptions = {
        mode: env.mode || "development",
        analyzer: env.analyzer || false,
        isBuild: env.isBuild,
        isDev: env.mode === "development",
        isProd: env.mode === "production",
        port: env.port || 3000,
        paths: {
            src: path.resolve(__dirname, "src"),
            entry: path.resolve(__dirname, "src", "index.tsx"),
            output: path.resolve(__dirname, "build"),
            public: path.resolve(__dirname, "public", "index.html"),
            assets: path.resolve(__dirname, "public", "assets"),
            favicon: path.resolve(__dirname, "public", "favicon.ico"),
        },
    };

    return buildConfig(options);
};
