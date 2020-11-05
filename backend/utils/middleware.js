// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.log('Errorhandler:', response, error);
  // if (!request.token) return response.status(401).json({ error: 'token missing or invalid' });

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  } if (error.name === 'Invalid file format') return response.status(400).json(error.name);
  next(error);
};

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'unknown endpoint' }).end();

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('Bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

export default { errorHandler, unknownEndpoint, tokenExtractor };
