function errorHandler(error, req, res, next) {
    let status = error.status || 500;
    let message = error.message || `Internal Server Error`;

    console.log(error);
    
    switch (error.name) {
        case `SequelizeValidationError`:
        case `SequelizeUniqueConstraintError`:
            status = 400;
            message = error.errors[0].message;
            break;
    };

    res.status(status).json({ message: message});
}

module.exports = errorHandler;