"use strict";
const ncp = require("ncp");
const path_1 = require("path");
const fs_1 = require("fs");
const api_doc_generator_pkg_1 = require("api-doc-generator-pkg");
class APIDocGen {
    static generateDoc(definitionPath, changelogPath, version, destDir, callback) {
        const docGenerator = new api_doc_generator_pkg_1.APIDocGenerator();
        const definitionStr = fs_1.readFileSync(definitionPath, "utf8");
        const changelogStr = fs_1.readFileSync(changelogPath, "utf8");
        docGenerator.load(definitionStr, changelogStr);
        docGenerator.preprocess();
        const result = docGenerator.generate(version);
        try {
            fs_1.accessSync(destDir);
        }
        catch (e) {
            fs_1.mkdirSync(destDir);
        }
        result.forEach(function (file) {
            const containingDir = path_1.dirname(path_1.join(destDir, file.path));
            try {
                fs_1.accessSync(containingDir, fs_1.F_OK);
            }
            catch (e) {
                fs_1.mkdirSync(containingDir);
            }
            fs_1.writeFileSync(path_1.join(destDir, file.path), file.content);
            console.log("Writing " + path_1.join(destDir, file.path) + " ...");
        });
        ncp(docGenerator.publicDir, destDir, function (err) {
            callback(err);
        });
    }
}
exports.APIDocGen = APIDocGen;
