module.exports = errorHandler;

function errorHandler(error, req, res, next) {
    if (typeof (error) === 'string') {
        // custom application error
        return res.status(400).send({ message: error });
    }

    if (error.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).send({ message: error.message });
    }

    if (error.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).send({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).send({ message: error.message });
}