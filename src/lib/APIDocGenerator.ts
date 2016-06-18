"use strict";

import { join, dirname } from "path";
import { accessSync, readFileSync, writeFileSync, mkdirSync, F_OK } from "fs";
import { APIDocGenerator, GeneratedFile } from "api-doc-generator-pkg";

export class APIDocGen {

  public static generateDoc(definitionPath: string,
    changelogPath: string,
    version: string,
    destDir: string): void {

    const docGenerator: APIDocGenerator = new APIDocGenerator();
    const definitionStr: string = readFileSync(definitionPath, "utf8");
    const changelogStr: string = readFileSync(changelogPath, "utf8");

    docGenerator.load(definitionStr, changelogStr);
    docGenerator.preprocess();

    const result: GeneratedFile[] = docGenerator.generate(version);

    try {
      accessSync(destDir);
    } catch (e) {
      mkdirSync(destDir);
    }

    result.forEach(function(file: GeneratedFile): void {
      const containingDir: string = dirname(join(destDir, file.path));

      try {
        accessSync(containingDir, F_OK);
      } catch (e) {
        mkdirSync(containingDir);
      }
      writeFileSync(join(destDir, file.path), file.content);

      console.log("Writing " + join(destDir, file.path) + " ...");
    });
  }
}
