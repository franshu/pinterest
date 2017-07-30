// llamar a las dependencias
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require ('gulp-uglify');
var sass = require ('gulp-sass');
var minifyCSS = require('gulp-sass');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
//var fontAwesome = require('gulp-font-awesome-icons'); queria instalar la dependencia pero no me resultó asi que filo.
//const faIcons = require('gulp-font-awesome-icons');

//la primeta tarea se llama script, que concatena los archivs js
gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js','assets/js/*.js'])
	.pipe(concat('script.js'))
	.pipe(uglify())//minifica el js y lo deja en una linea (pesa menos)
	.pipe(gulp.dest('dist/js'));//carpeta dist donde se creara el archivo
});

//segunda tarea es style que concatena y minifica archivos scss a style.min.css 
gulp.task('style', function(){
	gulp.src(['assets/sass/main.scss'])
		.pipe(sass().on('error', sass.logError))//ejecuta sass para compilar archivos .scss
		.pipe(minifyCSS())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css'));//se  guarda en dist t de aca se linquea al html
	});

//tercera tarea Webserver, crea el servidor web de desarrollo a ejecutarse en localhost puerto 8000
gulp.task('webserver', function(){
	gulp.src('../pinterest/')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			directoryListing: false,
			open:true
	}));
});
//cuarta tarea Webserver, crea el servidor web de desarrollo a ejecutarse en localhost puerto 8000
gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss',['style']); //para mirar cambios en css
});

/*gulp.task('fonts', function() {
  gulp.src(['node_modules/font-awesome-icons/index.js'])
    .pipe(gulp.dest('dist/fonts'));
});*/
/*faIcons.getList().then(icons => console.log(icons.length));
=> 675 
 
faIcons.getList().then(icons => console.log(icons[0]));
=>
{ name: 'Glass',
  id: 'glass',
  unicode: 'f000',
  created: 1,
  filter: [ 'martini', 'drink', 'bar', 'alcohol', 'liquor','pinterest' ],
  categories: [ 'Web Application Icons' ]
}
 //'faIcons' la puse en la task pero no funcó
*/
gulp.task('default',['script', 'style','webserver','watch']);