import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import { WebpackOptions } from './types';

export const buildLoaders = (options: WebpackOptions): RuleSetRule[] => {
    const { isDev, isProd } = options;

    const rules: RuleSetRule[] = [];

    const babelLoader: RuleSetRule = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    ['@babel/preset-react', { runtime: 'automatic' }],
                ],
            },
        },
    };

    const imageLoader: RuleSetRule = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgLoader: RuleSetRule = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    rules.push(babelLoader);
    rules.push(imageLoader);
    rules.push(svgLoader);

    if (isDev) {
        const styleSimpleLoader: RuleSetRule = {
            test: /\.scss$/i,
            exclude: /\.module\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        };

        const styleModulesLoader: RuleSetRule = {
            test: /\.module\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[path]--[local]__[hash:base64:8]',
                        },
                    },
                },
                'sass-loader',
            ],
        };

        rules.push(styleSimpleLoader);
        rules.push(styleModulesLoader);
    }

    if (isProd) {
        // const styleLoader: RuleSetRule = {
        //     test: /\.scss$/i,
        //     use: [
        //         MiniCssExtractPlugin.loader,
        //         {
        //             loader: 'css-loader',
        //             options: {
        //                 modules: {
        //                     localIdentName: '[hash:base64:8]',
        //                 },
        //             },
        //         },
        //         ,
        //         'sass-loader',
        //     ],
        // };

        const styleLoader: RuleSetRule = {
            test: /\.scss$/i,
            exclude: /\.module\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        };


        rules.push(styleLoader);
    }

    return rules;
};
