import { normalizeProduct, normalizeProductFields, validateProduct, validateUpdatedProduct } from "../helpers/products.helper.js";
import { deleteProductModel, getAllProductsModel, getByIDModel, getByCategoryModel, saveProductModel, updateProductModel } from "../models/product.model.js"
import { AppError } from "../helpers/error.model.js";

export async function getAllProductsService() {
    try {
        return await getAllProductsModel();
    } catch (error) {
        throw error
    }
}

export async function getProductByIdService(id) {
    return await getByIDModel(id);
}

export async function saveProductService(product) {
    try {
        const normalizedProduct = normalizeProduct(product);
        await validateProduct(normalizedProduct);
        return await saveProductModel(normalizedProduct);
    } catch (error) {
        throw error;
    }
}

export async function updateProductService(id, body) {
    if (!id) {
        throw new AppError('Bad Request', 'El id del producto es obligatorio', 400);
    }

    try {
        const normalizedProduct = normalizeProductFields({ ...body, id });
        await validateUpdatedProduct(normalizedProduct, id);

        const updatedProduct = await updateProductModel(id, normalizedProduct);

        return updatedProduct;
    } catch (error) {
        throw error;
    }
}

export async function getByCategoryService(category) {
    try {
        const products = await getByCategoryModel(category);
        return products;
    } catch (error) {
        throw error
    }
}

export async function deleteProductService(id) {
    if (await getByIDModel(id) === null) {
        throw new AppError('Resource not found', 'Producto inexistente', 404);
    }

    try {
        await deleteProductModel(id);
    } catch (error) {
        throw error;
    }
}


