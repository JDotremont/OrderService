const defaultOptions = { 
    validateQuery: false,
    abortEarly: false,
}

export const validationMiddleware = (schema, options = defaultOptions) => async (req, res, next) => {
    options = { ...defaultOptions, ...options }
    try {
        const data = await schema.validate(options.validateQuery ? req.query : req.body, { 
            abortEarly: options.abortEarly 
        });
        req.parsedBody = data;
        next();
    } catch(error) {
        res.status(400).json(error);
    }
}