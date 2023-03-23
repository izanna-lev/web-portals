/**
 * Webpack config for React Development.
 * @author Shivender
 **/

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin, ProvidePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const APP_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const defaultEnv = {
  BRANCH: "development",
  S3_URL: "https://app-onsite.s3.amazonaws.com/",
  SERVER: "https://developmentapi.onsiteplanning.com/",
  GOOGLE_API: "AIzaSyAOO-vhn-vejr178fuNVujksicv8nsTGfQ",

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
    mode: "development",
    entry: {
      main: `${APP_DIR}/index.tsx`,
    },
    output: {
      clean: true,
      path: BUILD_DIR,
      assetModuleFilename: "[name][ext]",
      filename: "[name].[contenthash].js",
      publicPath: "/",
      // sourceMapFilename: "[name].[contenthash].js.map",
    },

    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },

    devtool: "cheap-module-source-map",

    devServer: {
      static: {
        directory: "build",
      },
      historyApiFallback: true,
      compress: true,
      port: 3000,
      hot: true,
      open: true,
    },

    // loaders

    module: {
      rules: [
        // ts, tsx rules

        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        // sass, css rules

        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /\.module\.s?css$/,
        },

        // sass, css module rules

        {
          test: /\.module\.s?css$/,
          use: [
            "style-loader",
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

        // image rules

        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset/resource",
        },

        // font rules

        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d \.\d \.\d )?$/,
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
      new EnvironmentPlugin(defaultEnv),
      new ReactRefreshWebpackPlugin(),
      new ProvidePlugin({ process: "process/browser" }),
      new CopyPlugin({
        patterns: [
          {
            from: `./firebase-messaging-sw.js`,
            to: `${BUILD_DIR}/firebase-messaging-sw.js`,
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.png",
      }),
    ],
  };
};
