const { response } = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Usuario = mongoose.model("usuario");

const { generarJWT } = require('../../helpers/jwt');

 

const login = async( req, res = response ) => {

    const {Correo, Contrasenia } = req.body;
    console.log(req.body);
    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({Correo: Correo });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( Contrasenia, usuarioDB.Contrasenia );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );

         
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const register = async(req, res = response) => {

    const { Correo, Contrasenia } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ Correo: Correo });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(); 
        usuario.TipoUsuario = req.body.TipoUsuario;
        usuario.Nombres = req.body.Nombres;
        usuario.Apellidos = req.body.Apellidos;
        usuario.Correo = req.body.Correo; 
        usuario.Datos = {
            Cedula: req.body.Cedula,
            Provincia: req.body.Provincia,
            Ciudad: req.body.Ciudad,
            DireccionFacturacion: req.body.DireccionFacturacion,
            DireccionEnvio: req.body.DireccionEnvio,
            Referencia: req.body.Referencia,
            TelefonoConvencional: req.body.TelefonoConvencional,
            TelefonoCelular: req.body.TelefonoCelular,
            CodigoPostal: req.body.CodigoPostal,
        };
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.Contrasenia = bcrypt.hashSync( req.body.Contrasenia, salt );
    
    
        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarUser = async (req, res = response) => {

    //  Validar token y comprobar si es el usuario correcto

    const uid = req.params.usuarioid;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const {Correo, ...campos } = req.body;

        if ( usuarioDB.Correo !== req.body.Correo ) {

            const existeEmail = await Usuario.findOne({Correo: Correo });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.Correo = Correo;
 
            
            if (req.body.Contrasenia != usuarioDB.Contrasenia ) {
                // Encriptar contraseña 
                const salt = bcrypt.genSaltSync();
                campos.Contrasenia = bcrypt.hashSync( req.body.Contrasenia, salt );

            }else{
                campos.Contrasenia =usuarioDB.Contrasenia;
            }
            campos.TipoUsuario = req.body.TipoUsuario;
            console.log("========CAMPOS",campos);

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario
    });

}

module.exports = {
    login,
    register,
    actualizarUser,
    renewToken
}