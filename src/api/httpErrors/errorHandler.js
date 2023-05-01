//Los Middlewares de tipo error se deben hacer después de hacer el routing...




function logErrors(err, req, res, next){
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next){
  if (err.isBoom === true)
  {
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  else
  {
    next(err);
  }
}



module.exports = {logErrors, errorHandler, boomErrorHandler};
