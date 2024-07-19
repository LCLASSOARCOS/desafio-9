export function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Acceso denegado');
    }
    next();
}

export function userOnly(req, res, next) {
    if (req.user.role !== 'user') {
        return res.status(403).send('Acceso denegado');
    }
    next();
}