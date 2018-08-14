# prompt

Node module for getting user input in shell

## Install

```
yarn add @creuna/prompt
```

## Usage

**prompt**(questions: _Object_) : _Object_

```js
const { name, likesPrompt } = prompt({
  name: "Your name",
  age: {
    text: "Your age",
    value: process.argv[2],
    optional: true
  },
  password: {
    text: "Password",
    obfuscate: true
  },
  likesPrompt: {
    text: "Do you like prompt?",
    type: Boolean
  }
});
```

### Question

Question can either be a `string` or an `object`. If question is a `string`, all config options will have the default value. If you need to configure the question, pass it as an `object`

### Question config

- text: `string`. Text to display to user
- value: `string` or `boolean`. Predefined answer to question. If it is defined, prompt will not ask this question. Great for usage with process.argv.
- type: `String | Boolean` - default `String`. If Boolean is used, '[y/n]' will be printed behind the text, and the answer will be returned as a boolean
- obfuscate: `boolean` - default `false`. If set to `true`, input will be obfuscated with asterisks (\*\*\*)
- optional: `Boolean` - default `false`. Affects questions of type `String` only. If set to `true`, a missing answer will be returned as an empty string. If left at `false`, prompt will keep asking until a non-empty answer is given.
