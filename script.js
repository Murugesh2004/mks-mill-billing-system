document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');
    const productForm = document.getElementById('productForm');
    const loadCustomersButton = document.getElementById('loadCustomers');
    const loadProductsButton = document.getElementById('loadProducts');
    const customerList = document.getElementById('customerList');
    const productList = document.getElementById('productList');
    const productSelect = document.getElementById('productSelect');

    // Handle customer form submission
    customerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const customer = { name, email, phone };

        // Get existing customers from localStorage
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        customers.push(customer);

        // Save updated customer list to localStorage
        localStorage.setItem('customers', JSON.stringify(customers));

        // Reset form
        customerForm.reset();
        alert('Customer added successfully!');
    });

    // Handle product form submission
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);

        const product = { productName, productPrice };

        // Get existing products from localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);

        // Save updated product list to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Populate product dropdown
        populateProductDropdown();

        // Reset form
        productForm.reset();
        alert('Product added successfully!');
    });

    // Populate product dropdown
    function populateProductDropdown() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productSelect.innerHTML = '<option value="">Select a product</option>'; // Reset dropdown

        products.forEach((product, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = product.productName;
            productSelect.appendChild(option);
        });
    }

    // Load customers and display them
    loadCustomersButton.addEventListener('click', () => {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];

        if (customers.length === 0) {
            customerList.innerHTML = '<p>No customers found.</p>';
            return;
        }

        customerList.innerHTML = '';
        customers.forEach((customer, index) => {
            const customerItem = document.createElement('div');
            customerItem.className = 'customer-item';
            customerItem.innerHTML = `
                <strong>Customer ${index + 1}:</strong><br>
                <strong>Name:</strong> ${customer.name}<br>
                <strong>Email:</strong> ${customer.email}<br>
                <strong>Phone:</strong> ${customer.phone}
            `;
            customerList.appendChild(customerItem);
        });
    });

    // Load products and display them
    loadProductsButton.addEventListener('click', () => {
        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (products.length === 0) {
            productList.innerHTML = '<p>No products found.</p>';
            return;
        }

        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <strong>Product ${index + 1}:</strong><br>
                <strong>Name:</strong> ${product.productName}<br>
                <strong>Price:</strong> ₹${product.productPrice.toFixed(2)}
            `;
            productList.appendChild(productItem);
        });
    });

    // Initial population of product dropdown
    populateProductDropdown();
});
