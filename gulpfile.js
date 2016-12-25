var gulp = require('gulp');
var webpack = require('gulp-webpack');
var wp = require('webpack');

gulp.task('default', function() {
  gulp.src('index.js')
    .pipe(webpack({
      output: {
        filename: 'affjs.js',
        library: 'affjs',
        libraryTarget: 'umd',
        umdNamedDefine: true,
      },
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules(?!\/affjs)/,
            loader: 'babel-loader',
          },
        ],
        plugins: [
          new wp.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
            },
          }),
          new wp.optimize.OccurrenceOrderPlugin(),
        ],
      },
    }))
  .pipe(gulp.dest('lib'));
});

[
  'dbmon',
  'todomvc',
].map(what => {
  gulp.task(what, function() {
    return gulp.src('examples/' + what + '/main.js')
      .pipe(webpack({
        output: {
          filename: 'bundle.js',
        },
        devtool: "source-map",
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules(?!\/affjs)/,
              loader: 'babel-loader',
            },
          ],
        },
      }))
      .pipe(gulp.dest('examples/' + what));
  });
});

