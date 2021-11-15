const { src, dest, series, parallel, watch } = require( 'gulp' ),
  yargs = require( 'yargs' ),
  gulp_if = require( 'gulp-if' ),
  del = require( 'del' ),
  plumber = require( 'gulp-plumber' ),
  sourcemaps = require( 'gulp-sourcemaps' ),
  babel = require( 'gulp-babel' ),
  sass = require( 'gulp-sass' )( require( 'sass' ) ),
  postcss = require( 'gulp-postcss' ),
  combine_media_query = require( 'postcss-combine-media-query' ),
  autoprefixer = require( 'autoprefixer' ),
  cssnano = require( 'cssnano' ),
  uglify = require( 'gulp-uglify' );


const PRODUCTION = yargs.argv.prod === 'true';


const clean_old_dist = async ( cb ) => {
  await del( './dist', { force: true } );
  cb();
};


const clean_dist_css = async ( cb ) => {
  await del( './dist/css', { force: true } );
  cb();
};


const clean_dist_js = async ( cb ) => {
  await del( './dist/js', { force: true } );
  cb();
};


const copy_files = () => {
  const globs = [
    'src/copy/**',
    './src/js/libs/**/*.js'
  ];
  return src( globs ).pipe( dest( 'dist' ) );
};


const compile_scss = () => {
  return src( 'src/scss/*.scss' )
    .pipe( plumber() ) // Prevent pipe breaking caused by errors from gulp plugins
    .pipe( gulp_if( !PRODUCTION, sourcemaps.init() ) )
    .pipe( sass( { outputStyle: 'expanded' } ).on( 'error', sass.logError ) )
    .pipe( gulp_if(
      PRODUCTION,
      postcss( [
        combine_media_query(),
        autoprefixer( { cascade: false } ),
        cssnano()
      ] ),
      postcss( [ combine_media_query() ] )
    ) )
    .pipe( gulp_if( !PRODUCTION, sourcemaps.write() ) )
    .pipe( plumber.stop() )
    .pipe( dest( 'dist/css' ) );
};


const transpile_js = () => {
  return src( [ 'src/js/**/*.js', '!src/js/libs/**/*.js' ] )
    .pipe( plumber() )
    .pipe( gulp_if( !PRODUCTION, sourcemaps.init() ) )
    .pipe( gulp_if( PRODUCTION, babel( {
      presets: [ '@babel/env' ]
    } ) ) )
    .pipe( gulp_if( PRODUCTION, uglify() ) )
    .pipe( gulp_if( !PRODUCTION, sourcemaps.write() ) )
    .pipe( dest( 'dist/js' ) );
};


const watch_files = () => {
  watch( './src/scss/**/*.scss', series( compile_scss ) );
  watch( [ 'src/js/**/*.js', '!src/js/libs/**/*.js' ], series( transpile_js ) );
  console.log( '[Warning] You are in the development mode now!' );
  console.log( 'To create optimized files for production use `npm run build`' );
  console.log( 'Gulp started successfully. You may start coding...' );
};


exports.scss = series( clean_dist_css, compile_scss );

exports.js = series( clean_dist_js, transpile_js );

exports.build = series(
  clean_old_dist,
  parallel(
    copy_files,
    compile_scss,
    transpile_js,
  ),
)

exports.default = series(
  clean_old_dist,
  parallel(
    copy_files,
    compile_scss,
    transpile_js,
  ),
  watch_files
);
