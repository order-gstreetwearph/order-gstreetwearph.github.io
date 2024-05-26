const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let products = [
    { id: '1', name: 'Levis Pants', price: 10.00, sold: false },
    { id: '2', name: 'Levis Signature Pants', price: 20.00, sold: false },
    // Add more products as needed
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/checkout', (req, res) => {
    const cart = req.body.cart;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.sold = true;
        }
    });
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
