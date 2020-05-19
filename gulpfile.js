const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const handlebars = require('gulp-compile-handlebars');
// const handlebars = require('handlebars');
// const gulpHandlebars = require('gulp-handlebars-html')(handlebars); //default to require('handlebars') if not provided
const rename = require('gulp-rename');

//compile less to css
function style() {
    return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
}

//hbs
function hbs(){
    
    var templateData = {
		firstName: 'Kaanon'
	},
	options = {
		ignorePartials: true,
		partials : {
			footer : '<footer>the end</footer>'
		},
		batch : ['./src/templates/partials'],
		helpers : {
			capitals : function(str){
				return str.toUpperCase();
			}
		}
	}

	return gulp.src('src/templates/**/*.handlebars')
		.pipe(handlebars(templateData, options))
		.pipe(rename(function(path) {
            path.basename = path.basename;
            path.extname = '.html';
          }))
        .pipe(gulp.dest('./src/'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
           baseDir: "./src",
        }
    });
    //gulp.watch('src/scss/**/*.scss', style)
    gulp.watch('src/less/**/*.less', style)
    gulp.watch('src/templates/**/*.handlebars', hbs);
    gulp.watch('src/*.html').on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.hbs = hbs;