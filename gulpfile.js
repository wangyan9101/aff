var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('default', function() {
});

[
  'dbmon',
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
              exclude: /node_modules/,
              loader: 'babel-loader',
            },
          ],
        },
      }))
      .pipe(gulp.dest('examples/' + what));
  });
});

