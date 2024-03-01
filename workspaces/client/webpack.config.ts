import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: [/\.tsx?/],
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: './public',
        },
      ],
    }),
  ],
}

export default config;