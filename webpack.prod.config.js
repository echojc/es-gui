var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var failPlugin = require('webpack-fail-plugin');

module.exports = {
  entry: [
    './src/bootstrap.js',
    './src/index.tsx',
  ],

  output: {
    path: path.resolve(__dirname, 'dist.prod'),
    filename: 'bundle.js',
  },

  plugins: [
    failPlugin,
    new CleanWebpackPlugin([
      'dist.prod',
    ]),
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new StyleLintWebpackPlugin({
      files: [
        '**/*.less',
      ],
      syntax: 'less',
      config: {
        'extends': 'stylelint-config-standard',
      },
    }),
    new ExtractTextWebpackPlugin('style.css'),
    new CopyWebpackPlugin([
      { from: './node_modules/es5-shim/es5-shim.min.js' },
      { from: './node_modules/es6-shim/es6-shim.min.js' },
      { from: './node_modules/normalize.css/normalize.css' },
    ], {
      copyUnmodified: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.prod.html',
      hash: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(preferEntry = true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.ts', '.tsx', '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          'ts-loader',
        ],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        loader: ExtractTextWebpackPlugin.extract(
          'style',
          'css!autoprefixer!less'
        ),
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          'raw',
        ],
      },
    ],
    preLoaders: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          'tslint',
        ],
      },
    ],
  },

  tslint: {
    emitErrors: true,
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'es5-shim': 'es5',
    'es6-shim': 'es6',
    'lodash': '_',
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
