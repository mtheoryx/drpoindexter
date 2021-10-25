---
title: "Configure Prettier for Angular and Typescript"
---

[Initial Guide to Follow](https://medium.com/ngconf/ultimate-prettier-angular-cheatsheet-777c9515f4fb)

One difference is we are using `.prettier.json` instead of `.prettier.config.js`.

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "proseWrap": "never",
  "parser": "typescript",
  "endOfLine": "lf"
}
```

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "proseWrap": "never",
  "parser": "typescript",
  "endOfLine": "lf",
  "overrides": [
    {
      "files": ["**/*.json"],
      "options": {
        "parser": "json"
      }
    },
    {
      "files": ["**/*.yml", "**/*.yaml"],
      "options": {
        "parser": "yaml"
      }
    },
    {
      "files": ["**/*.md"],
      "options": {
        "parser": "markdown"
      }
    },
    {
      "files": ["src/**/*.html"],
      "options": {
        "parser": "angular"
      }
    },
    {
      "files": ["src/**/*.scss"],
      "options": {
        "parser": "scss"
      }
    }
  ]
}
```

tslint is now not supported, use eslint instead.

[So I followed this guide to get started](https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration)

Oof, tslint is out of date, needs v5.18, only had v5.15

`npm install --save-dev tslint@5.18`

```shell
$ > npx tslint-to-eslint-config --prettier
npx: installed 60 in 4.1s

✨ 101 rules replaced with their ESLint equivalents. ✨

❗ 9 ESLint rules behave differently from their TSLint counterparts ❗
  Check ./tslint-to-eslint-config.log for details.

❓ 2 rules are not known by tslint-to-eslint-config to have ESLint equivalents. ❓
  The "@typescript-eslint/tslint/config" section of ./.eslintrc.js configures eslint-plugin-tslint to run them in TSLint within ESLint.
  Check ./tslint-to-eslint-config.log for details.

⚡ 6 new packages are required for this ESLint configuration. ⚡
  npm install @angular-eslint/eslint-plugin @typescript-eslint/eslint-plugin-tslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-prefer-arrow --save-dev

♻ Consider using --comments to replace TSLint comment directives in your source files. ♻
```

Whoa, okay, one thing at a time! Let's get those other packages installed first.

```shell
npm install @angular-eslint/eslint-plugin @typescript-eslint/eslint-plugin-tslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-prefer-arrow --save-dev
```

Whoops, broke something...

```
"prettier/@typescript-eslint" has been merged into "prettier"
```

Remove an entry from extends in the .eslintrc.js file.

`"prettier/@typescript-eslint"`

I think we're good to go, let's see what we get!

```shell
✖ 98302 problems (97248 errors, 1054 warnings)
  90828 errors and 0 warnings potentially fixable with the `--fix` option.
```

Oh shit! Well at least it's running!
