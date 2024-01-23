export type WebpackMode = "development" | "production";

export type WebpackEnv = {
    mode: WebpackMode;
    isBuild: boolean;
    port?: number;
    analyzer?: boolean;
};

export type WebpackOptions = {
    mode: WebpackMode;
    analyzer: boolean;
    isBuild: boolean;
    isDev: boolean;
    isProd: boolean;
    port: number;
    paths: {
        src: string;
        entry: string;
        output: string;
        public: string;
        assets: string;
        favicon: string;
    };
};
