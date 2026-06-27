import { deleteProductService, getAllProductsService, getByCategoryService, getProductByIdService, saveProductService, updateProductService } from "../services/product.service.js";

export async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsService();
        res.status(200).json({data: products})
    } catch (error) {   
        res.status(error.statusCode).json({
            error: e.error,
            message: e.message,
            statusCode: e.statusCode
        });
    }
}

export async function getByID(req, res) {
    const id = req.params.id;
    try {
        const product = await getProductByIdService(id);
        res.status(200).json({data:product})
    } catch (e) {
        res.status(e.statusCode).json({
            error: e.error,
            message: e.message,
            statusCode: e.statusCode
        });
    }
}

export async function getByCategoryController(req, res) {
    const category = req.params.category;
    console.log('category: ', category);

    try {
        const products = await getByCategoryService(category);
        res.status(200).json({ data: products });
    } catch (e) {
        res.status(e.statusCode ?? 500).json({
            error: e.error ?? 'Internal Server Error',
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        });
    }
}

export async function saveProductController(req, res) {
    
    const body = req.body;
    console.log('body: ', body);
    try {
        const product = await saveProductService(body);
        res.status(201).json({message:'Producto creado exitosamente', product:body})
    } catch (e) {
        res.status(e.statusCode).json({
            error:e.error ?? 'Internal Server Error', 
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        });
    }
}

export async function updateProductController(req, res) {
    const id = req.params.id;
    const body = req.body;

    try {
        console.log(await updateProductService(id, body))
        const product = await updateProductService(id, body);
        res.status(200).json({
            message: 'Producto actualizado exitosamente',
            product
        });
    } catch (e) {
        console.log(e);
        res.status(e.statusCode ?? 500).json({
            error: e.error ?? 'Internal Server Error',
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        });
    }
}

export async function deleteProductController(req, res) {
    console.log('deleteProductController: Solicitud recibida');
    const id = req.params.id;
    try {
        await deleteProductService(id);
        res.status(200).json({
            message:'Producto eliminado exitosamente'
        })
    } catch (e) {
        res.status(e.statusCode).json({
            error:e.error ?? 'Internal Server Error', 
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        })
    }
}