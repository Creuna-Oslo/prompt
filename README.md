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
    value: process.argv[2],
    optional: true
  },
  likesPrompt: {
    text: 'Do you like prompt?',
    type: Boolean
  }
})
```

### Question config

- text: `String`. Text to display to user
- value: `String | Boolean` Predefined value. If it is defined, prompt will not ask this question. Great for usage with process.argv.
- type: `String | Boolean`, optional. If Boolean is used, '(Y/N)' will be printed behind the text, and the value will be returned as a boolean
- optional: `Boolean` - default `false`. Affects questions of type `String` only. If set to `true`, a missing answer will be returned as an empty string. If left at `false`, prompt will keep asking until a non-empty answer is given.
