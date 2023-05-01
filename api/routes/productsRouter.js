const express = require('express');

const ProductServices = require('../services/productServices')
const validatorHandler = require('../httpErrors/validatorHandler')
const {createProductSchema, updateProductSchema, getProductSchema} = require('../DTO/productValidationSchema')

//LOs middlewares corren de forma individual en cada una de las rutas porque deben definir independientemente de donde sacan los datos.....

const router = express.Router();
const service = new ProductServices();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = await req.params;
      const product = await service.findOne(id); ///EStos procedimientos entre req y res tambien se consideran middlewares
      res.json(product);
    } catch (error) {

  //Esta es una manera de utilizar los status code....
  //    res.status(404).json({
  //      message: error.message,
  //   })
      next(error);
    }
});


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req, res) =>{
    const body = await req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
});


//LOs middlewares se pueden concatenar....

router.patch('/:id',
validatorHandler(updateProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async(req, res, next) =>{
  try {
    const {id} = await req.params;
    const body = await req.body;
    const product =await service.update(id, body);
    res.json(product);
  } catch (error) {

//    res.status(404).json({
//      message: error.message,
//    })

    next(error);
  }

});


router.delete('/:id', async(req, res, next) =>{
  try {
    const {id} =await req.params;
    const product =await service.delete(id);
    res.json(product);
  } catch (error) {
    next(error)
  }

});


module.exports = router;
