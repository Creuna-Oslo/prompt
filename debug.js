// Script for working with prompt in a CLI

const prompt = require('.');

const { name, age, password, bool } = prompt({
  name: 'Your name',
  age: {
    text: 'Your age',
    optional: true
  },
  password: {
    text: 'Password',
    obfuscate: true
  },
  bool: {
    text: 'Do you like prompt?',
    type: Boolean
  }
});

console.log(name, age, password, bool);
