import { deleteProductService, getAllProductsService, getByCategoryService, getProductByIdService, saveProductService, updateProductService } from "../services/product.service.js";

export async function getAllProducts(req, res) {
    try {
        if (req.query.categoria) {
            var products = await getByCategoryService(req.query.categoria);   
        } else{
            var products = await getAllProductsService();
        }
        res.status(200).json({data: products})
    } catch (e) {   
        res.status(e.statusCode ?? 500).json({
            error: e.error ?? 'Internal Server Error',
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500
        });
    }
}

export async function getByID(req, res) {
    const id = req.params.id;
    try {
        const product = await getProductByIdService(id);
        res.status(200).json({data:product})
    } catch (e) {
        res.status(e.statusCode ?? 500).json({
            error: e.error ?? 'Internal Server Error',
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500
        });
    }
}

export async function saveProductController(req, res) {
    
    const body = req.body;
    try {
        const product = await saveProductService(body);
        res.status(201).json({message:'Producto creado exitosamente', product})
    } catch (e) {
        res.status(e.statusCode ?? 500).json({
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
        const product = await updateProductService(id, body);
        res.status(200).json({
            message: 'Producto actualizado exitosamente',
            product
        });
    } catch (e) {
        res.status(e.statusCode ?? 500).json({
            error: e.error ?? 'Internal Server Error',
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        });
    }
}

export async function deleteProductController(req, res) {
    const id = req.params.id;
    try {
        await deleteProductService(id);
        res.status(200).json({
            message:'Producto eliminado exitosamente'
        })
    } catch (e) {
        res.status(e.statusCode ?? 500).json({
            error:e.error ?? 'Internal Server Error', 
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        })
    }
}
