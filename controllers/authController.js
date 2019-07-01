const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const router = express.Router();

// falta implementar o JWT com TOKEN com 30 min de validade
router.post('/singup', async(req,res)=>{
    try {
        const usuario = await Usuario.create(req.body);
        return res.status(200).send( await Usuario.findOne( {"email":usuario.email} ) );
    } catch ( error ) {
        console.log(error.stack);

        if( error.code == 11000 ){
            return res.status(400).send({ error: 'E-mail já existente'});
        }else{
            return res.status(400).send({ error: 'Falha ao registrar usuário'});
        }
    }
});

router.post('/singin', async(req,res)=>{
    try {
        const {email, senha} = req.body;
        var usuario =  await Usuario.findOne( {email} ).select('+senha');
        if( await bcrypt.compareSync(senha, usuario.senha) ) {

            token = jwt.sign( { id:this._id }, authConfig.secret, {
                expiresIn: 1300
            }); 

            usuario =  await Usuario.findOneAndUpdate( {'_id':usuario._id}, {'token':token} );
            return res.status(200).send( usuario );
        }else{
            return res.status(401).send({ error: 'Usuário e/ou senha inválidos'});
        }
    } catch ( error ) {
        console.log(error);       
        return res.status(400).send({ error: 'Falha ao autenticar usuário'});
    }
});

router.post('/singin_old', async(req,res)=>{
    try {
        const usuario =  await Usuario.findOne( {"email":req.body.email} ).select('+senha'); ;
        
        if(bcrypt.compareSync(req.body.senha, usuario.senha)) {
            return res.status(200).send( await Usuario.findOne( {"email":usuario.email} ) );
        }else{
            return res.status(401).send({ error: 'Usuário e/ou senha inválidos'});
        }
    } catch ( error ) {
        return res.status(400).send({ error: 'Falha ao autenticar usuário'});
    }
});

module.exports = app => app.use('/auth', router);