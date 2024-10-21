import path from 'path';

export default {
  target: 'node',
  mode: 'development',
  entry: path.resolve(import.meta.dirname, 'src', 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map'
};
