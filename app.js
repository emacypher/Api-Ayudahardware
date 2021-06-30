const cookieParser = require("cookie-parser");
const session = require("express-session");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const findUserMiddleware = require("./middlewares/findUser");

const { Sequelize } = require("./models");
const publicDirectory = path.join(__dirname, "./public");
const app = express();

//Habilitamos la sessiones para guardar los datos del usuario que se loguee
app.use(
  session({
    secret: ["1v89cfdg84re89v2189sd", "m$%#$g2dsf96&/ujy%296rt&2"],
    saveUninitialized: false,
    resave: false,
  })
);

app.use(findUserMiddleware);

app.use(express.static(publicDirectory));
app.use(cors()); //Habilitamos peticiones (GET - PUT - POST - DELETE)
app.use(logger("dev")); //Muestra peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // ?
app.set("view engine", "hbs"); // Extensiones de la vista

//Conect to BD
const sequelize = new Sequelize("test", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: 0,
});

//sequelize se autentica con la BD MySql
sequelize
  .authenticate()
  .then(function () {
    console.log("Connect");
  })
  .catch(function (error) {
    console.log("error: " + error);
  });

//defino las rutas

app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use("/part", require("./routes/getComponent"));
app.use("/perfomance", require("./routes/perfomance"));

app.listen(5000, () => {
  console.log("Servidor iniciado en el puerto 5000");
});
