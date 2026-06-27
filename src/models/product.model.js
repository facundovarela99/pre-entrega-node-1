import { db } from "../data/firebase.data.js";
import { query, where, collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AppError } from "../helpers/error.model.js";



const productsCollection = collection(db, 'products');

export async function getAllProductsModel() {
    try {
        const querySnapshot = await getDocs(productsCollection);
        const products = [];
        querySnapshot.forEach((doc)=>{
            products.push({id: doc.id, ...doc.data()});
        })
        return products;
    } catch (error) {
        throw new AppError(error, `Error al obtener los productos`, 500);
    }
}

export async function getByIDModel(id){
    const productDoc = await getDoc(doc(productsCollection, id));
    if (productDoc.exists()) {
        return {id: productDoc.id, ...productDoc.data()}
    }
    return null;
}

export async function getByField(field) {
    try {
        const productDoc = await getDoc(doc(productsCollection, field));
        if (productDoc.exists()) {
            return {id: productDoc.id, ...productDoc.data()}
        }
        return null;
    } catch (error) {
        throw new AppError(error, `Error al obtener el producto por el campo ${field}`, 500);
    }
}

export async function saveProductModel(product) {
    console.log('Producto llegando al modelo: ', product);
   return await addDoc(productsCollection, product);
};

export async function updateProductModel(id, body) {
    try {
        const productRef = doc(productsCollection, id);
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
            return null;
        }

        const dataToUpdate = { ...body };
        delete dataToUpdate.id;

        await updateDoc(productRef, dataToUpdate);

        return { id: productDoc.id, ...productDoc.data(), ...dataToUpdate };
    } catch (error) {
        throw new AppError(error, 'Error al actualizar el producto', 500);
    }
}

export async function deleteProductModel(id) {
    try {
        await deleteDoc(doc(productsCollection, id));
    } catch (error) {
        throw new AppError(error, 'Error al eliminar el producto', 500);   
    }
}

export async function getByCategoryModel(category) {
    const products = [];
    
    try {
        const q = query(productsCollection, where("categoria", "==", category));
        const querySnapshot = await getDocs(q);
        console.log('querySnapshot: ', querySnapshot);
        querySnapshot.forEach((doc) => {
            products.push({id: doc.id, ...doc.data()});
        });
        console.log('products by category ', category, ': ', products);
        return products
    } catch (error) {
        throw new AppError(error, 'Error al obtener los productos por categoría', 500);
    }
}

async function setUpdateQuery(fields) {
    const campos = ['nombre', 'color', 'categoria', 'precio', 'stock', 'talles'];
    const camposRecibidos = fields.map((field)=>{
        if (campos.includes(field)){
            return field.campo
        }
    })

    const queries = [];
    camposRecibidos.forEach((campo)=>{
        queries.push(campo, '==', )
    })

    const q = query(productsCollection, where('nombre', '==', nombre))
}