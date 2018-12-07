// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = 'development';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeExternals = require('webpack-node-externals');

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = (MODE === 'development');

// FRONTEND
const frontConfig = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,
    // source-map 方式でないと、CSSの元ソースが追跡できないため
    devtool: 'source-map',

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: './src/client/index.js',
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist/asset`,
        // 出力ファイル名
        filename: 'bundle-front.js'
    },

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        contentBase: 'dist',
        open: true
    },

    module: {
        rules: [

            // JS
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: 'babel-loader',
                        // Babel のオプションを指定する
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2018 を ES5 に変換
                                '@babel/preset-env',
                            ]
                        }
                    }
                ]
            },

            // Sassファイルの読み込みとコンパイル
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: ExtractTextPlugin.extract([
                // CSSをバンドルするための機能
                {
                    loader: 'css-loader',
                    options: {
                        // オプションでCSS内のurl()メソッドの取り込まない
                        url: false,
                        // ソースマップの利用有無
                        sourceMap: enabledSourceMap,
                        // 空白文字やコメントを削除する
                        minimize: true,
                        // Sass+PostCSSの場合は2を指定
                        importLoaders: 2
                    },
                },

                // PostCSSのための設定
                {
                    loader: 'postcss-loader',
                    options: {
                        // PostCSS側でもソースマップを有効にする
                        sourceMap: true,
                        plugins: () => [require('autoprefixer')]
                    },
                },

                // Sassをバンドルするための機能
                {
                    loader: 'sass-loader',
                    options: {
                        // ソースマップの利用有無
                        sourceMap: enabledSourceMap,
                    }
                }
                ]),
            },

            {
                // 対象となるファイルの拡張子
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                // 画像をBase64として取り込む
                loader: 'url-loader'
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ],
};


// BACKEND
const backConfig = {
  mode: MODE,
  target: "node",
  entry: './src/server/back.js',
  output: {
    path: `${__dirname}/dist/asset`,
    filename: "bundle-back.js"
  },
  externals: [nodeExternals()],
};


// Combined 'module.exports'
module.exports = [ frontConfig, backConfig ];