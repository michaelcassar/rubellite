var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var pump = require("pump");

gulp.task("build", function (cb) {

    pump([
        gulp.src("../rubellite.js"),
        uglify(),
        rename("rubellite.min.js"),
        gulp.dest("../")
    ], cb);

});
