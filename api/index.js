const express = require('express');
const routerApi = require('./routes/routerAPI');
const cors = require('cors');
const {logErrors, errorHandler, boomErrorHandler} = require('./httpErrors/errorHandler');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Estos tambien son Middlewares...
//app.use(cors()); ----->>> ESTO DA ACCESO A TODOS LOS ORIGENES, CUIDADO!!...

const whitelist= ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){callback(null, true)}
    else{callback(new Error('Access not allowed'))}
  }
}
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

//EL orden en que coloquemos los middlewares van a ser
//el orden en que se estén ejecutando...

app.use(logErrors); //Los middlewares se utilizan en el metodo .use()...
app.use(boomErrorHandler);
app.use(errorHandler);

// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// })

app.listen(port, () => {
  console.log('Mi port' +  port);
});
