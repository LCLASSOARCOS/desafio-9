//user.controller.js
import CartsModel from "../models/carts.model.js";
import { createHash, isValidPassword } from "../utils/hashbcryp.js";
import UserDTO from "../dto/user.dto.js";
import UsersModel from "../models/users.model.js";
import ensureCart from "../middleware/ensureCart.js";
import { addLogger, logger } from "../utils/logger.js";


class UserController {
    async register(req, res) {
        const { first_name, last_name, email, password, age } = req.body;
        try {
            const existeUsuario = await UsersModel.findOne({ email });
            if (existeUsuario) {
                return res.status(400).send("El usuario ya existe");
            }

            const nuevoCarrito = new CartsModel();
            await nuevoCarrito.save();

            const nuevoUsuario = await UsersModel.create({
                first_name,
                last_name,
                email,
                cart: nuevoCarrito._id,
                password: createHash(password),
                age
            });

            await nuevoUsuario.save();

            res.redirect("/login");
        } catch (error) {
            next(createError(ERROR_TYPES.SERVER_ERROR, "Error interno del servidor", { originalError: error.message }));
            req.logger.error("Error interno del servidor" + error.mensaje)
        }
    }

    async login(req, res) {
        if (!req.user) {
            return res.status(400).send("Credenciales inválidas");
        }

        // Asegurar que el usuario tenga un carrito
        await ensureCart(req, res, async () => {
            req.session.user = {
                _id: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age,
                email: req.user.email,
                cart: req.user.cart
            };

            req.session.login = true;
            res.redirect("/profile");
        });
    }
    async createUser(req, res) {
        try {
            // Lógica para crear un usuario
            const user = await UsersModel.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(createError(ERROR_TYPES.SERVER_ERROR, "Error interno del servidor", { originalError: error.message }));
            req.logger.error("Error interno del servidor" + error.mensaje)
        }
    }

    async profile(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).send("No autorizado");
        }
    }

    async logout(req, res) {
            try {
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Logout failed' });
                    }
                    res.clearCookie('connect.sid'); // Clear the session cookie
                    return res.redirect('/login'); // Redirigir después de borrar la cookie y destruir la sesión
                });
            } catch (error) {
                next(createError(ERROR_TYPES.SERVER_ERROR, "Error interno del servidor", { originalError: error.message }));
                req.logger.error("Error interno del servidor" + error.mensaje)
            }
        }

    async admin(req, res) {
        if (req.session.user.role !== "admin") {
            return res.status(403).send("Acceso denegado");

        }
        res.render("admin");
    }
}
export default UserController;