const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let config = {
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: "./public/index.html",
      filename: "./index.html", //relative to root of the application
    }),
  ],
};

module.exports = (env, argv) => {
  config.mode = argv.mode;
  if (argv.mode === "development") {
    config.devServer = {
      compress: true,
      hot: true,
      contentBase: "./build",
      historyApiFallback: true, //For react router
      open: true,
    };
    config.output.publicPath = "/";
  }

  if (argv.mode === "production") {
    config.entry = ["./src"];
    config.devtool = "source-map";
    config.output.filename = "[name].[chunkhash].bundle.js";
    config.output.publicPath =
      "https://Torrent-Search.github.io/torrent-search-web";
    config.output.chunkFilename = "[name].[chunkhash].bundle.js";
    config.optimization = {
      moduleIds: "hashed",
      runtimeChunk: {
        name: "manifest",
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    };
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
      }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      })
    );
    config.performance = {
      hints: "warning",
      // Calculates sizes of gziped bundles.
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js.gz");
      },
    };
  }

  console.log("Webpack config\n");

  return config;
};
