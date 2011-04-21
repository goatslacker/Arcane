#!/usr/bin/env node

var Arcane = require('../').Arcane,
  password = "",
  args = (function () {
    var args = process.argv.splice(2),
        key = null,
        val = null,
        arg = null,
        obj = {};

    obj.arguments = [];

    while (args.length) {
      arg = args.shift();    

      if (arg.indexOf("-") !== -1) {
        obj[arg] = args.shift();
      } else {
        obj.arguments.push(arg);
      }
    }

    return obj;
  }());

password = args['-p'] || false;

if ("-d" in args) {
  console.log(Arcane.decrypt(args['-d'], password));
} else {
  console.log(Arcane.encrypt(args.arguments.join(" "), password));
}
