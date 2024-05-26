document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const productsContainer = document.querySelector('.products');
    const cartItemsElement = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutButton = document.querySelector('.checkout');

    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.setAttribute('data-id', product.id);
                productElement.setAttribute('data-name', product.name);
                productElement.setAttribute('data-price', product.price);

                const productName = document.createElement('h2');
                productName.textContent = product.name;
                productElement.appendChild(productName);

                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: $${product.price.toFixed(2)}`;
                productElement.appendChild(productPrice);

                const addButton = document.createElement('button');
                addButton.classList.add('add-to-cart');
                addButton.textContent = product.sold ? 'Sold' : 'Add to Cart';
                addButton.disabled = product.sold;
                addButton.addEventListener('click', () => {
                    if (!product.sold) {
                        addToCart(product.id, product.name, product.price);
                        renderCart();
                    }
                });
                productElement.appendChild(addButton);

                productsContainer.appendChild(productElement);
            });
        });

    function addToCart(id, name, price) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            alert("This item is already in your cart.");
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
    }

    function renderCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsElement.appendChild(listItem);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });
});
