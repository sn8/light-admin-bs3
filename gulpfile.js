// Requirements
const gulp = require('gulp');
const less = require('gulp-less');
const extender = require('gulp-html-extend');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const minify = require('gulp-babel-minify');
const pkg = require('./package.json');

// Paths
const paths = {
  src: 'src/**/*',
  srcHtml: 'src/html',
  srcLess: 'src/less',
  srcJs: 'src/js/*.js',

  dist: 'dist',
  distCss: 'dist/assets/css',
  distJs: 'dist/assets/js',
  distImages: 'dist/assets/images',
  distFonts: 'dist/assets/fonts',
  distVendor: 'dist/assets/vendor',
};

// Set the banner content
const banner = ['/**\n',
  ' * <%= pkg.title %> v<%= pkg.version %>\n',
  ` * Copyright ${(new Date()).getFullYear()},  <%= pkg.author %>\n`,
  ' */\n',
].join('');

// Compile LESS files from /less into /css
gulp.task('less', () => {
  return gulp.src(`${paths.srcLess}/*.less`)
    .pipe(less())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(paths.distCss));
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], () => {
  return gulp.src([`${paths.distCss}/*.css`, `!${paths.distCss}/*.min.css`])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.distCss))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

// Copy JS to dist
gulp.task('js', () => {
  return gulp.src([paths.srcJs])
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(paths.distJs))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

// Minify JS
gulp.task('minify-js', ['js'], () => {
  return gulp.src(`${paths.distJs}/light-admin.js`)
    .pipe(minify({
      mangle: {
        keepClassName: true,
      },
    }))
    .pipe(header(banner, { pkg }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.distJs))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

// Extend html
gulp.task('extend', () => {
  return gulp.src(`${paths.srcHtml}/*.html`)
    .pipe(extender({ annotations: false, verbose: false }))
    .pipe(gulp.dest(paths.dist));
});

// Copy vendor libraries to dist directory
gulp.task('copy', () => {
  gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(gulp.dest(`${paths.distVendor}/bootstrap`));

  gulp.src(['node_modules/bootstrap/fonts/*'])
    .pipe(gulp.dest(paths.distFonts));

  gulp.src(['node_modules/open-sans-fontface/fonts/**/*'])
    .pipe(gulp.dest(`${paths.distFonts}/OpenSans`));

  gulp.src(['node_modules/@sn8/themify-icons/fonts/**/*'])
    .pipe(gulp.dest(paths.distFonts));

  gulp.src(['node_modules/overlayscrollbars/js/jquery.*js'])
    .pipe(gulp.dest(`${paths.distVendor}/overlayscrollbars`));

  gulp.src(['node_modules/moment/min/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/moment`));

  gulp.src(['node_modules/eonasdan-bootstrap-datetimepicker/build/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/bootstrap-datetimepicker`));

  gulp.src(['node_modules/select2/dist/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/select2`));

  gulp.src(['node_modules/fullcalendar/dist/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/fullcalendar`));

  gulp.src(['node_modules/bootstrap-notify/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/bootstrap-notify`));

  gulp.src(['node_modules/datatables.net/js/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/datatables`));

  gulp.src(['node_modules/datatables.net-bs/js/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/datatables`));

  gulp.src(['node_modules/datatables.net-responsive/js/*'])
    .pipe(gulp.dest(`${paths.distVendor}/datatables-responsive`));

  gulp.src(['node_modules/chart.js/dist/*.js'])
    .pipe(gulp.dest(`${paths.distVendor}/chart.js`));

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(`${paths.distVendor}/jquery`));

  gulp.src(['node_modules/metismenu/dist/*'])
    .pipe(gulp.dest(`${paths.distVendor}/metisMenu`));

  gulp.src(['node_modules/lightbox2/dist/js/**/*'])
    .pipe(gulp.dest(`${paths.distVendor}/lightbox2`));

  gulp.src(['node_modules/lightbox2/dist/images/**/*'])
    .pipe(gulp.dest(`${paths.distImages}/`));
});

gulp.task('default', ['copy', 'less', 'js', 'minify-css', 'minify-js', 'extend']);

gulp.task('minify', ['minify-css', 'minify-js']);

// Clean dist
gulp.task('clean-dist', () => {
  gulp.src('build/dist', { read: false })
    .pipe(clean());

  gulp.src('build/src', { read: false })
    .pipe(clean());
});

// Copy dist
gulp.task('copy-dist', () => {
  gulp.src([`${paths.dist}/**/*`])
    .pipe(gulp.dest('build/dist'));

  gulp.src(['package.json'])
    .pipe(gulp.dest('build/'));

  gulp.src(['README.md'])
    .pipe(gulp.dest('build/'));

  gulp.src(['docs/'])
    .pipe(gulp.dest('build/'));

  gulp.src([`${paths.srcLess}/**/*`])
    .pipe(gulp.dest('build/src/less'));

  gulp.src([paths.srcJs])
    .pipe(gulp.dest('build/src/js'));
});

// Configure the browserSync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: paths.dist,
      index: 'index.html',
    },
  });
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'js', 'extend'], () => {
  gulp.watch(`${paths.srcLess}/**/*`, ['less']);
  gulp.watch(paths.srcJs, ['js']);
  gulp.watch(`${paths.srcHtml}/**/*`, ['extend']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(`${paths.dist}/*.html`, browserSync.reload);
  gulp.watch(`${paths.distJs}/light-admin.js`, browserSync.reload);
  gulp.watch(`${paths.distCss}/style.css`, browserSync.reload);
});
