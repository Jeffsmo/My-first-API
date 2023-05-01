const boom = require('@hapi/boom');


function validatorHandler(schema, property){
  return (req, res, next)=>{
    const data = req[property];
    //Si es un post la informacion vendría en Body
    //Si es un get la info vendría en params
    //o tambien podría venir en query
    const {error} = schema.validate(data, {abortEarly : false});
    if (error)
    {
      next(boom.badRequest(error));
    }
    else{
      next();
    }
  }
}


module.exports = validatorHandler;
