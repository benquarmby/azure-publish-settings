"use strict";

var gulp = require("gulp");
var jslint = require("gulp-byo-jslint");
var jasmine = require("gulp-jasmine");
var libPaths = [
    "./**/*.js",
    "./**/*.json",
    "!./**/*-tests.js",
    "!./node_modules/**",
    "!./submodules/**"
];
var testPaths = [
    "./**/*-tests.js"
];

gulp.task("default");

gulp.task("lint-lib", function () {
    return gulp.src(libPaths).pipe(jslint({
        jslint: "submodules/JSLint/jslint.js",
        options: {
            node: true
        },
        noFail: true
    }));
});

gulp.task("lint-test", function () {
    return gulp.src(testPaths).pipe(jslint({
        jslint: "submodules/JSLint/jslint.js",
        options: {
            node: true,
            es6: true
        },
        globals: ["beforeEach", "beforeAll", "afterEach", "afterAll", "describe", "it", "expect"],
        noFail: true
    }));
});

gulp.task("watch", ["lint-lib", "lint-test", "test"], function () {
    gulp.watch(libPaths, ["lint-lib"]);
    gulp.watch(testPaths, ["lint-test"]);
    gulp.watch(libPaths.concat(testPaths), ["test"]);
});

gulp.task("test", function () {
    return gulp.src(["*-tests.js"])
        .pipe(jasmine());
});
