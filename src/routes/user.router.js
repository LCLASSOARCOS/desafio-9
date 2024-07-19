//user.router.js
import express from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";
const uc = new UserController();
import checkUserRole from "../middleware/checkrole.js";
import userRepository from "../repositories/user.repository.js";

const router = express.Router();
// Rutas para registrar y loguear usuarios
router.post("/register", passport.authenticate("register", { failureRedirect: "/failedregister" }), uc.register);
router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), uc.login);

// Rutas protegidas que requieren autenticación
router.get("/profile", authMiddleware, uc.profile);
//router.post("/logout", authMiddleware, uc.logout);
router.post("/logout", authMiddleware, uc.logout); // Usamos POST para logout

router.get("/admin", authMiddleware, checkUserRole(['admin']), uc.admin);

router.post("/users", uc.createUser);

router.get("/failedregister", (req, res) => res.send("Registro Fallido!"));
router.get("/faillogin", (req, res) => res.send("Fallo todo, vamos a morir"));

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), (req, res) => {});
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
});

router.get('/current', authMiddleware, async (req, res) => {
    try {
        const userDTO = await userRepository.getById(req.user._id);
        res.json(userDTO);
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});
export default router;