//middleware/authmiddleware.js


const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, continúa con la siguiente función de middleware
        return next();
    }
    // Si el usuario no está autenticado, redirige a la página de login o responde con un error
    res.redirect('/login'); // Puedes cambiar '/login' por la ruta que corresponda en tu aplicación
}

export default authMiddleware;