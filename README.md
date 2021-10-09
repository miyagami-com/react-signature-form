# react-signature-form

> A lightweight and customisable package to enable your users to set their autographs and save it to an image.

[![NPM](https://img.shields.io/npm/v/react-signature-form.svg)](https://www.npmjs.com/package/react-signature-form)
[![GitHub license](https://img.shields.io/badge/license-ICS-blue.svg)](https://npmjs.org/package/react-signature-form)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![dt](https://img.shields.io/npm/dt/react-signature-form.svg)](https://npmjs.org/package/react-signature-form)

## Contents

* [Why?](#why)
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Props](#props)

## Why?

We wanted to create a simple autograph form field, without any unnecessary functionalities or dependencies.

+ Simple integration _only 2 required parameters_.
+ Customizable options for _any_ project.
+ Typescript compatibility.
+ Up to date React Hook examples.

And also is incredibly fault tolerant and performant.

`react-signature-form` is the only tool that checks all of those boxes.

## Installation

With npm

```
npm install react-signature-form
```

With yarn

```
yarn add react-signature-form
```
## Usage

```javascript
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import SignatureForm from 'react-signature-form'

const [signature, setSignature] = useState(null);

ReactDOM.render(
  <SignatureForm
      signature={signature}
      setSignature={setSignature}
      canvasProps={{width: 500, height: 200}}
  />,
  document.getElementById('root')
)
```

### API

The SignatureForms expects a signature and setSignature callback function. After the user saved the signature it is stored in signature. A React useState hook is the easiest way to do this.

- `signature` : `string`, first argument of the useState hook.
- `setSignature` : `function`, second argument of the useState hook.

### Props

The props of SignatureForm mainly control the properties and styling of the buttons and canvas.
All props are **optional**. The canvas, buttons and signature have the following default values.

- `width` : `number`, default: `400`
- `height` : `number`, default: `200`
- `canvasStyle` : `CSSProperties`
- `markerStyle` : `CanvasLineProperties`, default: `true`
  - `lineWidth` : `number`, default: `4`
  - `lineJoin` : `CanvasLineJoin`, default: `round`
  - `strokeStyle` : `string`, default: `#000`
- `saveButtonStyle` : `CSSProperties`
- `clearButtonStyle` : `CSSProperties`
- `redrawButtonStyle` : `CSSProperties`
- `saveButtonText` : `string`, default: `Save`
- `clearButtonText` : `string`, default: `Clear`
- `redrawButtonText` : `string`, default: `Redraw`

## License

MIT © [Miyagami](https://github.com/miyagami-com)

Made with ❤️ by [Miyagami](https://www.miyagami.com)

