# prompt

Node module for getting user input in shell

## Install

```
yarn add @creuna/prompt
```

## Usage

**prompt**(questions: _Object_) : _Promise_

```js
const { name, likesPrompt } = await prompt({
  name: {
    text: 'Your name',
    value: process.argv[2]
  },
  likesPrompt: {
    text: 'Do you like prompt?',
    type: Boolean,
    optional: true
  }
})
```

### Question config

- text: `String`. Text to display to user
- value: `String | Boolean` Predefined value. If it is defined, prompt will not ask this question. Great for usage with process.argv.
- type: `String | Boolean`, optional. If Boolean is used, '(Y/N)' will be printed behind the text, and the value will be returned as a boolean
- optional: `Boolean`. If set to `true`, empty input for questions of type `Boolean` will return `undefined` instead of `false`
