/*global exports*/
/*jshint bitwise:false*/

exports.Arcane = (function () {
  
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
    var c = '',
        i = 0,
        max = 0;

    for (i = 0, max = a.length; i < max; i = i + 1) {
      c = c + String.fromCharCode(a.substr(i, 1).charCodeAt() | b.substr(i, 1).charCodeAt());
    }

    return c;
  }

  function and(a, b) {
    var c = '',
        i = 0,
        max = 0;

    for (i = 0, max = a.length; i < max; i = i + 1) {
      c = c + String.fromCharCode(a.substr(i, 1).charCodeAt() & b.substr(i, 1).charCodeAt());
    }

    return c;
  }

  function xor(a, b) {
    var c = '',
        i = 0,
        max = 0;

    for (i = 0, max = a.length; i < max; i = i + 1) {
      c = c + String.fromCharCode(a.substr(i, 1).charCodeAt() ^ b.substr(i, 1).charCodeAt());
    }

    return c;
  }

  function crypt(phrase, key) {
    var len = phrase.length + 1,
        hash = new Array(len).join('\x1a'),
        invr = new Array(len).join('\xe5');

    return or(and(xor(phrase, key), hash), and(phrase, invr));
  }

  function createKey(hash, len) {
    return "" + pad(hash, len);
  }

  function addSalt() {
    var chr = "1234567890@#%^_()abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        salt = "",
        i = 0;

    for (i; i < 4; i = i + 1) {
      salt = salt + chr.substr(Math.floor(Math.random() * chr.length), 1);
    }

    return salt;
  }

  return {
    encrypt: function (text, password, useSalt) {
      var salt = "",
          key = "",
          encrypted = "",
          len = text.length;

      password = password || false;

      if (useSalt === undefined) {
        useSalt = true;
      }

      if (password) {
        key = createKey(password, len);
        encrypted = crypt(text, key);
      } else {
        encrypted = text;
      }

      if (useSalt === true) {
        salt = addSalt();
        key = createKey(salt, len);
        encrypted = salt + ":" + crypt(encrypted, key);
      }

      return encrypted;
    },

    decrypt: function (text, password) {

      var decrypted = "",
          phrase = text.split(":"),
          useSalt = (phrase.length === 2),
          salt = "",
          len = 0,
          key = "";

      if (useSalt) {
        salt = phrase[0];
        text = phrase[1];
      } else {
        text = phrase[0];
      }
      
      len = text.length;

      if (password) {
        key = createKey(password, len);
        decrypted = crypt(text, key);
      } else {
        decrypted = text;
      }

      if (useSalt) {
        key = createKey(salt, len);
        decrypted = crypt(decrypted, key);
      }

      return decrypted;
    }

  };
}());
