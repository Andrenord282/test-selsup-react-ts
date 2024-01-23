import { WebpackOptions } from "./types";

export const buildDevtools = (options: WebpackOptions): string | false => {
    const { isDev } = options;

    if (!isDev) return false;

    return "inline-source-map";
};
