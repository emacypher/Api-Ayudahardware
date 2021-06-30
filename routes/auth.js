const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const user = require("../controllers/user");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  //VERIFACAMOS FORMATO
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async function (req, res) {
    // SI HAY ERROR GUARDAMOS
    const errors = validationResult(req);
    validate(errors, res);
    const response = await user.getUserByEmail(req.body.email);
    if (response === null) {
      //ENCRIPTAMOS EL PASSSWORD
      hashPassword(req.body.password)
        .then((r) => user.create(req.body, (req.body.password = r), res))
        .then((r) => {
          return res.status(200).send(r);
        })
        .catch((err) => {
          return err.toString();
        });
    } else {
      return res.status(400).send("El email ya esta registrado");
    }
  }
);

router.post(
  "/login",
  //VALIDACIONES
  body("email").isEmail().normalizeEmail(),
  body("password").not().isEmpty().trim().escape(),
  //VALIDACIONES
  async (req, res) => {
    //SE ENCARGA DE VERIFICAR QUE LO QUE RECIBIMOS POR BODY TENGA EL FORMATO DESEADO
    const errors = validationResult(req);
    //ASIGNAMOS A UNA VARIABLE ERROR
    //SI HAY ERROR RETORNAMOS EL ERROR
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }
    //SOLICITAMOS LOS DATOS QUE NECESITAMOS
    const { email, password } = req.body;
    //RESULT GUARDAR LOS RESULTADOS LA BUSQUEDA DEL USUARIO QUE INTENTA LOGUEARSE
    const result = await loginUser(email, password);
    if (!result) {
      return res.status(409).json("Incorrect username or password");
    } else {
      req.session.userId = user.id;
      return res.status(200).json(result);
    }
  }
);
router.delete("/logout", async (req, res) => {
  req.session = null;
});

async function loginUser(email, password) {
  try {
    //Buscamos al usuario por su email
    const result = await user.getUserByEmail(email);
    if (result) {
      //Destructuramos los resultados
      const { dataValues } = result;
      //Verificamos contraseña enviada vs contraseña de la base de datos
      const compare = await bcrypt.compare(password, dataValues.password);
      if (compare) {
        return result.dataValues;
      }
    } else {
      return false;
    }
  } catch (e) {
    return { error: e };
  }
}

async function hashPassword(password) {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
}

function validate(errors, res) {
  if (!errors.isEmpty()) {
    if (errors.errors.param == "email") {
      return res.status(400).send("Email invalido");
    }
    if (errors.errors.param === "password") {
      return res.status(400).send("Password invalido");
    }
    return res.status(400).json({ errors: errors.array() });
  }
}

module.exports = router;
