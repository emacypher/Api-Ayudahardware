const { User } = require("../models/index.js");

module.exports = {
  //Especificamos que usuario necesitamos
  getUserById: function (id) {
    return User.findByPk(id);
  },
  //Especificamos cual eliminar
  deleteUser: function (id) {
    return User.destroy(id);
  },
  //Buscamos todos los usuarios
  read: function () {
    return User.findAll({
      attributes: ["id", "email", "name", "roleId"],
    });
  },
  //Creamos
  create: function ({ email, name, password }) {
    return User.create({
      name,
      email,
      password,
      roleId: 2,
    }).then(() => this.getUserByEmail(email));
  },
  //Buscamos usuario por email
  getUserByEmail: function (email) {
    return User.findOne({ where: { email } });
  },

  //Actualizamos usuario
  updateChanges: function (userId, changes) {
    return User.update(changes, { where: { id: userId } }).then(() =>
      this.getUserById(userId)
    );
  },
};
