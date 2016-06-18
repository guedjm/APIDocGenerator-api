"use strict";

const fs = require("fs");
const gulp = require("gulp");
const bump = require("gulp-bump");
const prompt = require("gulp-prompt");
const changelog = require("gulp-changelogmd");
const runSequence = require("run-sequence");

gulp.task("bump", function (cb) {
  gulp.src("./")
    .pipe(prompt.prompt({
      type: "checkbox",
      name: "bumpType",
      message: "What type of bump would you like to do",
      choices: ["patch", "minor", "major"]
    }, function (res) {

      if (!res.bumpType || res.bumpType.length != 1) {
        console.log("Invalid bump type");
      }
      else {
        const bumpType = res.bumpType[0];
 
         gulp.src("./package.json")
            .pipe(bump({ type: bumpType }))
            .pipe(gulp.dest("./"))
            .on('end', function (err) {
              if (bumpType != "patch") {
                runSequence("changelog", cb);
              }
              else {
               cb(err); 
              }
            });      
        }
    }));
});

gulp.task("version", function () {
  const pkg = JSON.parse(fs.readFileSync("./package.json"));
  console.log("Current version is " + pkg.version);
});

gulp.task("changelog", function () {
  const pkg = JSON.parse(fs.readFileSync("./package.json"));
  
  return gulp.src("./CHANGELOG.md")
    .pipe(changelog(pkg.version))
    .pipe(gulp.dest("./"));
})
