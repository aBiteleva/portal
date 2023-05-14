const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

const prod = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'portal-react-angular',
    projectName: 'react-app',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    mode: prod ? 'production' : 'development',
    entry: './src/portal-react-angular-react-app.tsx',
    output: {
      path: __dirname + '/dist/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/, use: [
            {loader: 'style-loader'},
            {loader: 'css-loader', options: {modules: true}},
            {loader: 'sass-loader'},
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
        }
      ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
      new MiniCssExtractPlugin(),
    ]
  });
};

