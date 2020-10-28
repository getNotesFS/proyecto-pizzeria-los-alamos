const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({ // definicion del esquema
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    telefono: {
        type: Number,
        'default': 9999999999
    },
    edad: {
        type: Number,
        'default': 1,
        min: 1,
        max: 100
    },
    materias: {
        tipo: {
            type: String,
            enum: ['Presencial', 'Virtual']
        },
        nombres: [String]
    },
    creado: {
        type: Date,
        'default': Date.now
    }
});

const Usuario = new mongoose.model('user', usuariosSchema); // compilar el esquema en el modelo


const user = new Usuario({
    nombre: 'Bridge',
    apellido: 'Parker JHONSON',
    direccion: 'Quito * Ecuador',
    telefono: 0999654258,
    edad: 10,
    materias: {
        tipo: 'Virtual',
        nombres: ['Desarrollo web 1', 'Desarrollo web 2', 'Desarrollo web 4']
    }
}); // crear el documento



user.save(); // guardar en DB