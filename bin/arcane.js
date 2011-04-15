#!/usr/bin/env node

var Arcane = require('../').Encrypt
  , args = process.argv.slice(2)
  , password = ""
  , i = 0;

for (i; i < args.length; i = i + 1) {
  if (args[i] === "--password") {
    password = args[i + 1];
    args.splice(i, 2);
  }
}

console.log(Arcane(args.join(" "), password));
