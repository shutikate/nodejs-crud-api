import path from 'path';

export default (mode) => {
  const isDev = mode === 'development';
  const config = {
    target: 'node',
    mode: mode ?? 'development',
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
    devtool: isDev && 'inline-source-map'
  }
  return config;
};
