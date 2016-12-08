var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('default', function() {
});

gulp.task('dbmon', function() {
  return gulp.src('examples/dbmon/dbmon.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      },
      devtool: "source-map",
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ],
      },
    }))
    .pipe(gulp.dest('examples/dbmon'));
});
