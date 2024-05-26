document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsElement = document.querySelector('.checkout-items');
    const checkoutTotalElement = document.querySelector('.checkout-total');
    const checkoutForm = document.getElementById('checkout-form');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCheckoutSummary() {
        checkoutItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            checkoutItemsElement.appendChild(listItem);

            total += item.price * item.quantity;
        });

        checkoutTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Collect customer details
        const customerDetails = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value,
            // Add more fields as necessary
        };

        // Process the order
        fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Order placed successfully!');
                    localStorage.removeItem('cart'); // Clear cart
                    window.location.href = 'index.html'; // Redirect back to main page
                } else {
                    alert('Order placement failed.');
                }
            });
    });

    renderCheckoutSummary();
});
