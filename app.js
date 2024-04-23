const express = require('express');
const productRoutes = require('./src/routes/productRoutes.js');
const cartRoutes = require('./src/routes/cartRoutes');
const app = express();
const PORT = 8080;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});






