const express = require('express');
const router = express.Router();
const CartManager = require('./CartManager');

// Crear una instancia de CartManager
const cartManager = new CartManager('./data/carts.json');

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCartData = req.body; // Obtener los datos del nuevo carrito del cuerpo de la solicitud
        await cartManager.createCart(newCartData); // Crear el nuevo carrito
        res.status(201).json({ message: 'Carrito creado correctamente' }); // Enviar una respuesta de éxito
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' }); // Manejar errores
    }
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid; // Obtener el ID del carrito de los parámetros de la solicitud
        const cartProducts = await cartManager.getCartProducts(cartId); // Obtener los productos del carrito por su ID
        res.json(cartProducts); // Enviar los productos del carrito como respuesta
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos del carrito' }); // Manejar errores
    }
});

// Ruta para agregar un producto a un carrito por su ID
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid; // Obtener el ID del carrito de los parámetros de la solicitud
        const productId = req.params.pid; // Obtener el ID del producto de los parámetros de la solicitud
        const productQuantity = req.body.quantity; // Obtener la cantidad del producto del cuerpo de la solicitud
        await cartManager.addProductToCart(cartId, productId, productQuantity); // Agregar el producto al carrito
        res.status(201).json({ message: 'Producto agregado al carrito correctamente' }); // Enviar una respuesta de éxito
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' }); // Manejar errores
    }
});

module.exports = router;
