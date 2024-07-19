//views.router.js
import express from 'express';
import ProductsController from '../controllers/products.controller.js';
import authMiddleware from '../middleware/authmiddleware.js';
import checkUserRole from '../middleware/checkrole.js';
import CartsController from '../controllers/carts.controller.js';
import ProductsService from '../service/products.service.js';
import passport from 'passport';
import ViewsController from '../controllers/views.controller.js';
import ensureCart from '../middleware/ensureCart.js';
const router = express.Router();
const pc = new ProductsController();
const cc = new CartsController();
const ps = new ProductsService();
const vc = new ViewsController();

router.get("/", vc.renderHome);
router.get("/products", authMiddleware, ensureCart, vc.renderProducts);
router.get("/carts", authMiddleware, ensureCart, (req, res) => {
    const cartId = req.session.user.cart;
    res.redirect(`/carts/${cartId}`);
});
router.get("/carts/:cid", authMiddleware, ensureCart, vc.renderCart);
router.get("/login", vc.renderLogin);
router.get("/register", vc.renderRegister);
router.get("/realtimeproducts", authMiddleware, checkUserRole(['admin']), vc.renderRealTimeProducts);
router.get("/chat", authMiddleware, checkUserRole(['usuario']), vc.renderChat);
router.get("/profile", authMiddleware,ensureCart, vc.renderProfile);
router.get('/empty/:cid', cc.emptyCart);
router.get("/api/carts/:cid/purchase", authMiddleware, ensureCart, vc.compraExitosa);
router.get("/mockingproducts", vc.renderMockingProducts);

export default router;