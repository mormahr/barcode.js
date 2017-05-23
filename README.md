# Barcode.js
![Logo](https://cdn.rawgit.com/mormahr/barcode.js/35fd6ead/assets/logo.svg)

[![Build Status](https://travis-ci.org/mormahr/barcode.js.svg?branch=master)](https://travis-ci.org/mormahr/barcode.js)
[![npm version](https://badge.fury.io/js/barcodejs.svg)](https://www.npmjs.com/package/barcodejs)

> ⚠️ **Currently not ready for production usage!**
>
> Although we use this in production, we do so in a controlled environment usage only text sources we completely control.
> Expect APIs to change until this notice is removed. (We will however respect semantic versioning.)

Encode strings into an intermediate representation and render them to different output formats.

The primary focus of this project is to be **fast** and have a **low footprint**, while being **reliable**.

## Usage
Install via yarn
```bash
$ yarn add barcodejs
```

Or install via npm
```bash
$ npm install --save barcodejs
```

Create an SVG barcode
```js
import {encodeCode39, renderBarcodeToSVG} from "barcodejs"
// common-js
// const {encodeCode39, renderBarcodeToSVG} = require("barcodejs")

const svg = renderBarcodeToSVG(encodeCode39("HELLO WORLD"), {
    // Optional
    width: "100%",
    height: "20mm",
})

console.log(svg)
```

## Support
Supported barcode types:
* Code39

Supported output formats:
* SVG
* HTML + CSS

## Features
* **No dependencies**
* The SVG is resizable via standard css or html `width` / `height` attributes (including % of the container).

## Caveats
* Currently **work in progress**
  * No validation of input strings
  * Limited barcode type support
  * No documentation 🙄
