var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')


/* GET home page. */
router.get('/', controller.home);
/* GET de products para mostrar por id y categoria*/
router.get('/product/detail/:id', controller.productsDetalle);
/* *Get de prueba para mostrar contenido */
/*router.get('/product/:id', controller.productUni)*/
  


module.exports = router;
