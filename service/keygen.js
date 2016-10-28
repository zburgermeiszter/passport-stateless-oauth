"use strict";

var fs = require('fs');
var NodeRSA = require('node-rsa');

var key = new NodeRSA({b: 512});

function saveFile(name, content) {
  fs.writeFile(name, content, 'utf8', (err)=> {
    if (err) {
      console.error('Error saving file ('+name+'): '+ err);
    }
    console.log('File ('+name+') saved.');
  });
}

saveFile('public.key', key.exportKey('public'));
saveFile('private.key', key.exportKey('private'));

// var text = 'Hello RSA!';
// var encrypted = key.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);
// var decrypted = key.decrypt(encrypted, 'utf8');
// console.log('decrypted: ', decrypted);