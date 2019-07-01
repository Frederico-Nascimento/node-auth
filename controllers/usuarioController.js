const express = require('express');
const Usuario = require('../models/usuario');
const authMidleware = require('../midleware/auth');
const router = express.Router();
router.use(authMidleware);

// falta implementar o JWT com TOKEN com 30 min de validade
router.get('/:id', async(req,res)=>{
    var usuario =  await Usuario.findOne( {"_id": req.params.id } );  
    res.send(usuario)
});


module.exports = app => app.use('/usuario', router);