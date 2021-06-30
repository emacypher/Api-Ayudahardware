const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');

});

router.get('/register', (req, res) => {
    res.render('register');

});
router.get('/Login', (req, res) => {
    res.render('Login');

});
router.get('/arma_tu_pc', (req, res) => {
    res.render('arma_tu_pc');

});
router.get('/blog', (req, res) => {
    res.render('blog');

});
router.get('/buscar_hardware', (req, res) => {
    res.render('buscar_hardware');

});
router.get('/guias_armado', (req, res) => {
    res.render('guias_armado');

});
router.get('/sobre_nosotros', (req, res) => {
    res.render('sobre_nosotros');

});
router.get('/pc_armadas', (req, res) => {
    res.render('pc_armadas');

});
module.exports = router;