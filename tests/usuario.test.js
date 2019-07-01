// usuario.test.js
var Usuario = require('../models/usuario');

module.exports = {

  setUp: function(callback){    
    callback();
  },

  tearDown: function(callback){
    this.usuario = undefined;
    callback();
  },

  "Primeiro teste de exemplo" : function(test){
    test.ok(true, "exemplo");
    test.done();
  },

  "Segundo teste de exemplo" : function(test){
    test.ok(true, "exemplo");
    test.done();
  },

  "Terceiro teste de exemplo" : function(test){
    test.ok(true, "exemplo");
    test.done();
  }

}