import { productModel } from "./models/product.model.js";

//Fuiones CRUD aplicadas a los productos.

// Obtenemos todos los productos. 
const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

// Obtenemos los productos segun su ID.

const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

// Creamos un producto nuevo.
const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

// Actualizamos un producto especifico segun su ID.
const update = async (id, data) => {
  const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
  return productUpdate;
};

// Eliminamos un producto especifico segun ID.

const deleteOne = async (id) => {
  const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
  return product;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne
}