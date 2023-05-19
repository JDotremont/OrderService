export const authorizationMiddleware = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return async (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return res.sendStatus(401);
        }
        await next();
    }
};