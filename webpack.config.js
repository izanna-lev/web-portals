/**
 * Webpack config for React Production build.
 * @author Shivender
 **/

const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { EnvironmentPlugin, ProvidePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const APP_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const defaultEnv = {
  BRANCH: "development",
  S3_URL: "https://app-onsite.s3.amazonaws.com/",
  SERVER: "https://developmentapi.onsiteplanning.com/",
  GOOGLE_API: "AIzaSyByy1LrT-5ZQ642PzXM4m_WCQ-fS6GO-9s",

  // Firebase Configuration Keys

  FIREBASE_API_KEY: "AIzaSyDysxPbJS2KStgi-o1jjirSnOXtSeXG2X8",
  FIREBASE_AUTH_DOMAIN: "onsite-travel.firebaseapp.com",
  FIREBASE_PROJECT_ID: "onsite-travel",
  FIREBASE_STORAGE_BUCKET: "onsite-travel.appspot.com",
  FIREBASE_MESSAGING_SENDER_ID: "757245140014",
  FIREBASE_APP_ID: "1:757245140014:web:6141547c58931e23a593bf",
  FIREBASE_MEASUREMENT_ID: "G-X1RMPLGFVY",
  FIREBASE_VAPID_KEY:
    "BBtb1OIBx9b9WDEsf_Kul9_5vWDCeLguyDImUuDIy6Vhj_PTV2g2_oMTDmmGigVR8vrz9nZEOzLQAhKv1BON2dE",
};

module.exports = (env) => {
  return {
    mode: "production",
    entry: {
      main: `${APP_DIR}/index.tsx`,
    },
    output: {
      clean: true,
      path: BUILD_DIR,
      assetModuleFilename: "[name][ext]",
      filename: "[name].[contenthash].js",
      publicPath: "/",
      sourceMapFilename: "[name].[contenthash].js.map",
    },

    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      minimize: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },

    devtool: "source-map",

    // loaders
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          exclude: /\.module\.s?css$/,
        },

        {
          test: /\.module\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: false,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false,
              },
            },
          ],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },

        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", ".css"],
    },

    // plugins
    plugins: [
      new EnvironmentPlugin(env),
      new ProvidePlugin({ process: "process/browser" }),
      new CopyPlugin({
        patterns: [
          {
            from: `./firebase-messaging-sw.js`,
            to: `${BUILD_DIR}/firebase-messaging-sw.js`,
          },
        ],
      }),
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      new CompressionPlugin({
        algorithm: "gzip",
        test: /.js$|.css$|.map$/,
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.png",
        hash: true,
        cache: true,
      }),
    ],
  };
};
