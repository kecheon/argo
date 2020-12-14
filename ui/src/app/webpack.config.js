"use strict;";

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const END_POINT = isProd ? 'https://argo.innog2b.com' : 'http://localhost:3000';

const config = {
  mode: isProd ? "production" : "development",
  entry: {
    main: "./src/app/index.tsx"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: __dirname + "/../../../../argo-gateway/dist/app"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".ttf"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [...(isProd ? [] : ["react-hot-loader/webpack"]), `ts-loader?allowTsInNodeModules=true&configFile=${path.resolve("./src/app/tsconfig.json")}`]
      }, {
        enforce: 'pre',
        exclude: [
          /node_modules\/react-paginate/,
          /node_modules\/monaco-editor/,
        ],
        test: /\.js$/,
        loaders: [...(isProd ? ['babel-loader'] : []), 'source-map-loader'],
      }, {
        test: /\.scss$/,
        loader: "style-loader!raw-loader!sass-loader"
      }, {
        test: /\.css$/,
        loader: "style-loader!raw-loader"
      }, {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      SYSTEM_INFO: JSON.stringify({
        version: process.env.VERSION || "latest"
      })
    }),
    new HtmlWebpackPlugin({ template: "src/app/index.html" }),
    new CopyWebpackPlugin([{
      from: 'src/app/assets', to: 'assets'
    }, {
      from: "node_modules/argo-ui/src/assets", to: "assets"
    }, {
      from: "node_modules/@fortawesome/fontawesome-free/webfonts", to: "assets/fonts"
    }, {
      from: "../api/openapi-spec/swagger.json", to: "assets/openapi-spec/swagger.json"
    }, {
      from: 'node_modules/monaco-editor/min/vs/base/browser/ui/codiconLabel/codicon/codicon.ttf', to: "."
    }]),
    new MonacoWebpackPlugin({"languages":["json","yaml"]})
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      // "/api/v1": {
      //   "target": isProd ? '' : END_POINT + '/argo',
      //   "secure": false,
      //   "pathRewrite": {
      //     "^/api/v1": ""
      //   },
      //   "changeOrigin": true,
      //   "logLevel": "debug"
      // },
      "/api": {
        "target": isProd ? '' : END_POINT,
        "secure": false
      },
      "/argo": {
        "target": isProd ? '' : END_POINT,
        "secure": false
      },
      "/artifacts": {
        "target": isProd ? '' : END_POINT,
        "secure": false
      },
      "/artifacts-by-uid": {
        "target": isProd ? '' : END_POINT,
        "secure": false
      },
      '/oauth2': {
        'target': isProd ? '' : END_POINT,
        'secure': false,
      },
      // "/auth": {
      //   'target': isProd ? '' : JSON_SERVER,
      //   'secure': false,
      // }
    }
  }
};

module.exports = config;
