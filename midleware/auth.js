const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send( {error: 'Não autorizado'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send( {error: 'Não autorizado'});

    const [bearer, token] = parts;

    if(bearer!="Bearer")
        return res.status(401).send( {error: 'Não autorizado'});
console.log(token); 
    jwt.verify( token, authConfig.secret, (err, decoded) => {
        if(err){
console.log(err); 
            return res.status(401).send( {error: 'Sessão inválida'});
        }
    });    
    next();
};