const errorHandler = (error, request, response, next) => {
    console.log(response, error)
    if (!request.token)
        return response.status(401).json({error: 'token missing or invalid'})

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'invalid token'})
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    return response.status(404).send({error: 'unknown endpoint'}).end()
}


export default {errorHandler, unknownEndpoint}