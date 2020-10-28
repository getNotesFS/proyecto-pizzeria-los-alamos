//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const users = mongoose.model('user');

//Controladores
const userCreate = (req, res) => {
    res
        .status(200)
        .json({ "status": "Usuario creado exitosamente!" });
};

const userList = (req, res) => {
    res
        .status(200)
        .json({ "status": "Listado de usuarios" });
};


const userRead = (req, res) => {
    res
        .status(200)
        .json({ "status": "Read Usuario" });
};

const userUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "Usuario actualizado" });
};
const userDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "Usuario eliminado" });
};


module.exports = {
    userCreate,
    userDelete,
    userList,
    userRead,
    userUpdate
}