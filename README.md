# Template-ts-package
Template project for creating node.js package with typescript

## Prerequise

To use the Template-ts-package environnement, you need to install 3 packages globally:
```
npm install -g gulp typings tsfmt
```

## Getting started

Start by installing npm dev packages:
```
npm intall
```

Then install typings files:
```
typings install
```


## Project structure

```
.
├── coverage                                Tests coverage files will be there
├── gulpfile.js
├── gulpTask                                Gulp tasks directory
│   ├── build.js
│   ├── bump.js
│   ├── default.js
│   ├── deploy.js
│   ├── format.js
│   ├── git.js
│   ├── test.js
│   └── tslint.js
├── package.json                             package.json
├── README.md
├── release                                  Release directory, generated package will be here
├── src                                      Source directory   
│   ├── index.ts                             index.ts should be there   
│   └── lib                                  lib directory conaints all other source files   
├── test                                     Tests drectory   
│   └── Test.js                              Main test file
├── tsconfig.json
├── tsfmt.json
├── tslint.json
└── typings.json

```


## Mains tasks

**gulp build:** Transpile typescript to javascript

**gulp clean:** Remove generated files

**gulp bump:** Bump current project version

**gulp version:** Display current project version

**gulp format:** Format all ts files

**gulp tslint:** Lint all ts file

**gulp test:** Run project test

**gulp push**: This is the main push task. Run sequense is:

1. Format all ts file

2. Lint all ts file

3. Clean project

4. Build project

5. Test project

6. Bump project version

7. Create npm package and add it to git

8. Commit files

9. Push files



