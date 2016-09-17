"use strict";

var gulp = require("gulp");
var jslint = require("gulp-byo-jslint");
var paths = [
    "./**/*.js",
    "./**/*.json",
    "!./node_modules/**",
    "!./submodules/**"
];

gulp.task("default");

gulp.task("lint", function () {
    return gulp.src(paths).pipe(jslint({
        jslint: "submodules/JSLint/jslint.js",
        options: {
            node: true
        },
        noFail: true
    }));
});

gulp.task("lint-watch", ["lint"], function () {
    gulp.watch(paths, ["lint"]);
});
