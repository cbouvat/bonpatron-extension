const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const terser = require('gulp-terser')
const stripDebug = require('gulp-strip-debug')
const zip = require('gulp-zip')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const rename = require('gulp-rename')

function css() {
  return src('src/css/*.scss')
    .pipe(sass())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css/'))
}

function cssMin() {
  return src('dist/css/*.css')
    .pipe(csso())
    .pipe(dest('dist/css/'))
}

function js() {
  return src('src/*.js')
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/'))
}

function jsMin() {
  return src('dist/*.js')
    .pipe(stripDebug())
    .pipe(terser())
    .pipe(dest('dist/'))
}

function cleanDist() {
  return del('dist/**')
}

function cleanBuild() {
  return del('build/**')
}

function copy() {
  return src([
    'src/*icons/*',
    'src/manifest.json',
    'src/*.html'
  ])
    .pipe(dest('dist/'))
}

function build() {
  return src('dist/**')
    .pipe(zip('build.zip'))
    .pipe(dest('build/'))
}

function sources() {
  return src(['**', '.eslintrc.js', '.editorconfig'], { ignore: ['node_modules/**', 'dist/**', 'build/**'] })
    .pipe(zip('sources.zip'))
    .pipe(dest('build/'))
}

exports.dev = () => {
  watch('src/**/*', parallel(css, js, copy))
}

exports.default = series(
  parallel(cleanDist, cleanBuild),
  parallel(css, js, copy),
  parallel(cssMin, jsMin),
  parallel(build, sources)
)
