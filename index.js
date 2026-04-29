const url = 'https://fakestoreapi.com/';

// Función para mostrar el producto creado

function showCreatedProduct(product){
    console.log(`-------------Producto creado -------------`);
    console.log(`ID: ${product.id}`);
    console.log(`Title: ${product.title}`);
    console.log(`Price: $${product.price}`);
    console.log(`Description: ${product.description}`);
    console.log(`Category: ${product.category}`);
}

// Función para mostrar la lista de productos

function showProducts(products){
    console.log(`-------------Lista de productos -------------`);
    products.forEach(product => {
        console.log('\n');
        console.table(`ID: ${product.id}`)
        console.table(`Title: ${product.title}`)
        console.table(`Price: $${product.price}`)
        console.table(`Description: ${product.description}`)
        console.table(`Category: ${product.category}`)
    });
}

// Función para mostrar un producto específico

function showProduct(product){
    if (product.id === undefined) {
        throw new Error('Producto no encontrado');
    }
    console.log(`-------------Detalles del producto ${product.id} -------------`);
    console.log(`Title: ${product.title}`)
    console.log(`Price: $${product.price}`)
    console.log(`Description: ${product.description}`)
    console.log(`Category: ${product.category}`)
}

// Función para obtener la lista de productos

async function getProducts(resource) {
    if (resource === 'products') {
        const response = await fetch(`${url}/${resource}`);
        const products = await response.json();
    
        if (!response.ok) {
            const err = new Error(response.message);
            console.log(err);
        } else{
            showProducts(products)
        }
    } else{
        getProduct(resource)
    }
}

// Función para obtener un producto específico

async function getProduct(resource) {
    
    const response = await fetch(`${url}/${resource}`);
    const product = await response.json();

    if (!response.ok) {
        const err = new Error(response.message);
        console.log(err);
    }
    showProduct(product);
}

// Función para crear un nuevo producto

async function createProduct(body) {
    const product = body;
    if (product.title === undefined || product.price === undefined || product.category === undefined || product.id === undefined) {
        throw new Error('Faltan datos para crear el producto');
    }
    fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => showCreatedProduct(data))
    .catch(e=>console.log(e))
}

// Funcion para eliminar un producto

async function  deleteProduct(body) {
    const response = await fetch(`${url}/${body}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(response.message);
        console.log(err);
    } else{
        console.log(`Producto con ID ${data.id} eliminado`);
    }
}

// Capturamos el verbo HTTP
const method = process.argv[2]; // La acción (EJ: GET o DELETE)
const resource = process.argv[3]; // El recurso (EJ: products o products/1)
const variable1 = process.argv[4]; // El título del producto a crear (EJ: "Nuevo producto")
const variable2 = process.argv[5]; // El precio del producto a crear (EJ: 20.85)
const variable3 = process.argv[6]; // La categoría del producto a crear (EJ: "juegos")
const id = process.argv[7]; // El ID del producto a crear (EJ: 1)

switch (method) {
    case 'GET':
        await getProducts(resource)         
        break;
    case 'POST':
        await createProduct({resource:resource, title:variable1, price: variable2, category: variable3, id: id})
        break;
    case 'DELETE':
        await deleteProduct(resource)
        break;
    default:
        throw new Error('Verbo inválido');
}


