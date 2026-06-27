import { getByCategoryModel } from "../models/product.model.js";
import { AppError } from "./error.model.js";

export async function validateProduct(product, currentProductId = null){
    try {
        await validateExistingProduct(product, currentProductId);
        validateName(product.nombre);
        validateCategory(product.categoria);
        validateColor(product.color);
        validatePrice(product.precio);
        validateStock(product.stock);
    } catch (error) {
        throw new AppError("Unprocessable Entity", error.message, 422);
    }
}

function validateName(nombre){
    if (nombre === "") {
        throw Error("El nombre no puede venir vacío")
    }

    if (Number(nombre)) {
        throw Error("El nombre debe ser una cadena de caracteres")
    }

    if (nombre.length <=3 || nombre.length > 25) {
        throw Error("El nombre debe tener entre 4 y 15 caracteres de longitud")
    }

}

function validateCategory(categoria){
    if (categoria === "") {
        throw Error("La categoria no puede venir vacío")
    }

    if (Number(categoria)) {
        throw Error("La categoria debe ser una cadena de caracteres")
    }

    if (categoria.length <=3 || categoria.length > 15) {
        throw Error("La categoria debe tener entre 4 y 15 caracteres de longitud")
    }

}

function validateColor(color){
    if (color === "") {
        throw Error("El color no puede venir vacío")
    }

    if (Number(color)) {
        throw Error("El color debe ser una cadena de caracteres")
    }

    if (color.length <=3 || color.length > 15) {
        throw Error("El color debe tener entre 4 y 15 caracteres de longitud")
    }
}

function validatePrice(precio){
    if (precio === "") {
        throw Error("El precio no puede venir vacío")
    }

    if (!Number(precio)) {
        throw Error("El precio debe ser un número")
    }

    if (Number(precio) < 0) {
        throw Error("El precio no puede ser un número negativo")
    }
}

function validateStock(stock){
    if (stock === "") {
        throw Error("El stock no puede venir vacío")
    }

    if (!Number(stock)) {
        throw Error("El stock debe ser un número")
    }

    if (Number(stock) < 0){
        throw Error("El stock no puede ser un número negativo")
    }
}

export function validateUpdatedProduct(product){
    try {
        (product.nombre) && validateName(product.nombre);
        (product.categoria) && validateCategory(product.categoria);
        (product.color) && validateColor(product.color);
        (product.precio) && validatePrice(product.precio);
        (product.stock) && validateStock(product.stock);
    } catch (error) {
        throw new AppError("Unprocessable Entity", error.message, 422);
        
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function validateExistingProduct(product, currentProductId = null){
    const {nombre, color, categoria} = product
    const productsWithCategory = await getByCategoryModel(product.categoria);

    productsWithCategory.forEach((prod)=>{
        if (nombre === prod.nombre && color === prod.color && categoria === prod.categoria){
            throw Error("Producto ya existente")
        };
    })
}

export function normalizeProduct(product){
    return {
        nombre: product.nombre.trim(),
        categoria: product.categoria.trim(),
        color: product.categoria.trim(),
        ...product
    }
}

export function normalizeProductFields(product){

    (product.nombre) && (product.nombre =  product.nombre.trim());
    (product.categoria) && (product.categoria =  product.categoria.trim());
    (product.color) && (product.color =  product.color.trim());
    
    return product
}
