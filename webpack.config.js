var sleep = require('sleep');
var path = require('path');
var url = require('url');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
    './src/bootstrap.js',
    './src/index.tsx',
  ],

  output: {
    path: path.resolve(__dirname, 'dist.dev'),
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new StyleLintWebpackPlugin({
      files: ['**/*.less'],
      syntax: 'less',
      config: {
        'extends': 'stylelint-config-standard',
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: true,
    }),
  ],

  devtool: 'eval-source-map',

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
          'react-hot-loader/webpack',
          'ts-loader',
        ],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        loaders: [
          'style',
          'css',
          'autoprefixer',
          'less',
        ],
      },
      {
        test: /\.(svg|json)$/,
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

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: function(path, req) {
          const u = url.parse(path)
          let localPath = u.pathname.replace(/^\/api/, '');
          const method = req.method;
          if (/^\/location\/[0-9\.-]+\/[0-9\.-]+/.test(localPath)) {
            console.log(`rewrite ${localPath} -> /location`);
            localPath = '/location';
          }
          console.log(`mock: ${method} ${localPath} ${u.query ? `(query: ${u.query})` : ''}`);
          sleep.msleep(500);
          req.method = 'GET';
          return `/mock-server${localPath}.${method.toLowerCase()}.json`;
        },
      },
    },
  },
};
