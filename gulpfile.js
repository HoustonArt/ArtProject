const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript')
const tscConfig = require('./tsconfig.json')
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function(){
  return del('dist/**/*');
});

//typescript compile

gulp.task('compile', ['clean'], function(){
  return gulp.src('app/**/*.ts')
  .pipe(typescript(tscConfig.compilerOptions))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/app'));

  });


  gulp.task('build', ['compile']);
  gulp.task('default', ['build']);
// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js'
    ])
    .pipe(gulp.dest('dist/lib'))
});

gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/**/*', 'index.html', 'styles.css', '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'))
});
