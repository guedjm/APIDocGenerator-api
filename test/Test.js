"use strict";

const APIDocGenerator = require("../index").APIDocGen;

describe("Testing APIDocGenerator-api", function () {

    console.log(__dirname);
    APIDocGenerator.generateDoc("./test/test.yaml", "./test/CHANGELOG.md", "1.0.0", "./result");
});