function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mr-2';
        checkbox.checked = product.checked;
        checkbox.onchange = () => toggleCheck(index);

        const productImage = document.createElement('img');
        productImage.src = product.image || '';
        productImage.className = 'item-image';

        const productDetails = document.createElement('span');
        productDetails.innerHTML = `<strong>${product.name}</strong> - Quantidade: ${product.quantity}`;
        if (product.checked) {
            productDetails.style.textDecoration = 'line-through';
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.onclick = () => removeProduct(index);

        listItem.appendChild(checkbox);
        listItem.appendChild(productImage);
        listItem.appendChild(productDetails);
        listItem.appendChild(removeButton);
        productList.appendChild(listItem);
    });
}

function addProduct() {
    const productName = document.getElementById('productInput').value.trim();
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    const imageUrl = document.getElementById('imageInput').value.trim();

    if (productName) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({
            name: productName,
            quantity: quantity,
            image: imageUrl,
            checked: false
        });
        localStorage.setItem('products', JSON.stringify(products));

        document.getElementById('productInput').value = '';
        document.getElementById('quantityInput').value = '1';
        document.getElementById('imageInput').value = '';
        loadProducts();
    } else {
        alert("Por favor, insira um nome de produto.");
    }
}

function removeProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function toggleCheck(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].checked = !products[index].checked;
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function clearList() {
    localStorage.removeItem('products');
    loadProducts();
}

document.getElementById('addButton').addEventListener('click', addProduct);
document.getElementById('clearButton').addEventListener('click', clearList);
loadProducts();
