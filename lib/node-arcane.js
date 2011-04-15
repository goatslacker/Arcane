/*global exports*/
/*jshint bitwise:false*/

exports.Encrypt = function (text, password, useSalt) {
  password = password || false;
  if (useSalt === undefined) {
    useSalt = true;
  }
  
  function pad(salt, len) {
    var c = '';

    if (salt.length === 0) {
      return c;
    }

    while (c.length < len) {
      c = c + salt;
    }

    c = c.substr(0, len);

    return c;
  }

  function or(a, b) {
    var c = ''
      , i = 0;

    for (i; i < a.length; i = i + 1) {
      c = c + String.fromCharCode(a.substr(i, 1).charCodeAt() | b.substr(i, 1).charCodeAt());
    }

    return c;
  }

  function and(a, b) {
    var c = ''
      , i = 0;

    for (i; i < a.length; i = i + 1) {
      c = c + String.fromCharCode(a.substr(i, 1).charCodeAt() & b.substr(i, 1).charCodeAt());
    }

    return c;
  }

  function xor(a, b) {
    var c = ''
      , i = 0;

    for (i; i < a.length; i = i + 1) {
      c = c + String.fromCharCode(a.substr(i, 1).charCodeAt() ^ b.substr(i, 1).charCodeAt());
    }

    return c;
  }

  function addSalt() {
    var chr = "1234567890@#%^_()abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      , salt = ""
      , i = 0;

    for (i; i < 4; i = i + 1) {
      salt = salt + chr.substr(Math.floor(Math.random() * chr.length), 1);
    }

    return salt;
  }

  var salt = addSalt()
    , hash = new Array(text.length + 1).join('\x1a')
    , invr = new Array(text.length + 1).join('\xe5')
    , passwordKey = null
    , saltKey = null
    , encrypted = "";

  if (password) {
    passwordKey = "" + pad(password, text.length);
    encrypted = or(and(xor(text, passwordKey), hash), and(text, invr));
  } else {
    encrypted = text;
  }

  if (useSalt === true) {
    saltKey = "" + pad(salt, encrypted.length);
    encrypted = salt + ":" + or(and(xor(encrypted, saltKey), hash), and(encrypted, invr));
  }

  return encrypted;
};
