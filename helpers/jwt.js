const jwt = require('jsonwebtoken');

/*const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
    
        });

        

    });

    
}


module.exports = {
    generarJWT,
}*/

const generarJWT = (res, id) => {
    const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
    });
    return res.cookie('token', token, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
      httpOnly: true,
    });
  };
  module.exports = {
    generarJWT,
}