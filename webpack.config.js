require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env,argv) => {
  const isProduction = argv.mode === 'production'; //argv.mode reads the mode whether in production or development

  return {
    entry: path.resolve(__dirname,'src/app.js'),

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname,'dist'),
      clean: true
    },

    module: {
      rules: [
        {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
        },
        {
        test: /\.s?css$/,
        use: [
          isProduction ?//use style loader in dev mode and minicssextract in production mode
            MiniCssExtractPlugin.loader:"style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
        ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, //for reading images of different formats
          type: 'asset/resource',
        }
      ]
    },

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    plugins: [
      new HtmlWebpackPlugin({
        title:"Boiler Plate",
        filename:"index.html",
        template:"src/template.html"
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
      })
    ],
    devServer: {
      static: {
        directory:path.resolve(__dirname,'dist')
      },
      historyApiFallback: true
    },
  };
};

//{path:'.env.firebase'}