const mongoose = require('../database');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const UsuarioSchema = new mongoose.Schema({
    _id: {
        type : String,
        required: false
    },
    nome: {
        type : String,
        required: true
    },
    email: {
        type : String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha:{
        type : String,
        required: true,
        select: false
    },
    data_criacao:{
        type : Date,
        dafault: Date.now,
        required: false
    },
    data_atualizacao:{
        type : Date,
        dafault: Date.now,
        required: false
    },
    ultimo_login:{
        type : Date,
        dafault: Date.now,
        required: false
    },
    token: {
        type : String,
        required: false,
        select: true
    }
});

UsuarioSchema.pre('save', async function name(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha =hash;
    this._id = uuid.v1();
    this.token = jwt.sign( { id:this._id }, authConfig.secret, {
        expiresIn: 1300
    });      
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;