import CartsRepository from "../repositories/carts.repository.js";
import mongoose from "mongoose";

const cr = new CartsRepository();

class CartsService {
    // 1. Crear carrito
    async addCart() {
        try {
            const newCart = await cr.addCart();
            return {
                status: true,
                cart: newCart,
                msg: "Se agregó el carrito correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al agregar el carrito: " + error.message };
        }
    }

    // 2. Borrar carrito
    async deleteCart(cartId) {
        try {
            await cr.deleteCart(cartId);
            return { status: true, msg: "Carrito eliminado correctamente" };
        } catch (error) {
            return { status: false, msg: "Error al borrar el carrito: " + error.message };
        }
    }

    // 3. Agregar productos al carrito
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const carts = await cr.addProductToCart(cartId, productId, quantity);
            return {
                status: true,
                cart: carts,
                msg: "Producto agregado correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al agregar el producto: " + error.message };
        }
    }

    // 4. Mostrar carritos
    async getCarts() {
        try {
            const carts = await cr.getCarts();
            return {
                status: true,
                cart: carts,
                msg: "Carritos obtenidos correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar mostrar carritos: " + error.message };
        }
    }

    // 5. Mostrar el carrito según el ID
    async getCartById(cartId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                return { status: false, msg: "ID de carrito no válido" };
            }
            const cart = await cr.getCartById(cartId);
            if (!cart) {
                return { status: false, msg: "Carrito no encontrado" };
            }
            return {
                status: true,
                cart: cart,
                msg: "Carrito obtenido correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar mostrar el carrito: " + error.message };
        }
    }

    // 6. Borrar un producto del carrito
    async deleteProductCart(cartId, productId) {
        try {
            await cr.deleteProductFromCart(cartId, productId);
            return { status: true, msg: "Producto borrado del carrito correctamente" };
        } catch (error) {
            return { status: false, msg: "Error al intentar borrar producto del carrito: " + error.message };
        }
    }

    // 7. Actualizar productos del carrito
    async updateCart(cartId, updatedProducts) {
        try {
            const cart = await cr.updateCart(cartId, updatedProducts);
            return {
                status: true,
                cart: cart,
                msg: "Carrito actualizado correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar actualizar el carrito: " + error.message };
        }
    }

    // 8. Actualizar la cantidad de productos de un carrito
    async updateProductsQuantityCart(cartId, productId, newQuantity) {
        try {
            const cart = await cr.updateProductQuantity(cartId, productId, newQuantity);
            return {
                status: true,
                cart: cart,
                msg: "Cantidad de producto actualizada correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar actualizar la cantidad de productos del carrito: " + error.message };
        }
    }

    // 9. Vaciar carrito
    async emptyCart(cartId) {
        try {
            const cart = await cr.emptyCart(cartId);
            return {
                status: true,
                cart: cart,
                msg: "Carrito vaciado correctamente"
            };
        } catch (error) {
            return { status: false, msg: "Error al intentar vaciar el carrito: " + error.message };
        }
    }
}

export default CartsService;