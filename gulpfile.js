'use strict';

const gulp = require('gulp');
// 4 types of tasks return:
gulp.task('hello', function (callback) {
    console.log('Hello');
    callback(); // to show the task finished
});

gulp.task('example:promise', function () {
    return new Promise((resolve, reject) => {
        resolve('result');
    })
})

gulp.task('example:stream', function () {
    // reads all from stream (and throws the data away) and then done
    return require('fs').createReadStream(__filename);
});

gulp.task('example:process', function () {
    // returns child process
    return require('child_process').spawn('ls', ['node_modules'], { stdio: 'inherit' });
})
//
// Many tasks in one
gulp.task('example', gulp.series('hello', 'example:promise', 'example:stream', 'example:process'));
// series - sequently, parallel - concurency
gulp.task('hello:ser', gulp.series('hello1', 'hello2'));
gulp.task('hello:par', gulp.parallel('hello1', 'hello2'));

// copy everything from src to folder build
gulp.task('build1', function () {
	return gulp.src('src/**/*.*')												
	//test minimatch: http://www.globtester.com
		.pipe(gulp.dest('build'));
});

// clean build folder
gulp.task('clean1', function () {
	return del('build/**/*');
});
