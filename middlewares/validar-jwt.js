const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const mongoose = require("mongoose");
const Usuario = mongoose.model("usuario");
 
dotenv.config();

const validarJWT2 = (req, res, next) => {

    // Leer el Token
    //const token = req.header('x-token') || req.headers['authorization'] || req.headers['x-access-token'];
    const token = req.cookies.token || '';
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}
 
const validarJWT = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

 
const varlidarADMIN_ROLE = async(req, res, next)  => {

    const uid = req.uid;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.TipoUsuario !== 1  ) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
 
module.exports = {
    validarJWT, 
    varlidarADMIN_ROLE
}