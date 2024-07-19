//middleware/checkrole.js


const checkUserRole = (allowedRoles) => (req, res, next) => {
    if (!req.session.login) {
        return res.status(401).redirect("/login");
    }

    const userRole = req.session.user.role;
    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        res.status(403).send('Acceso denegado. No tienes permiso para acceder a esta página.');
    }
};

export default checkUserRole;