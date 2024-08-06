import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

//Funciones CRUD para la parte de carritos de compras.

//Recupera todos los carritos almacenados en la base de datos y las trae.

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

//Recupera el carrito especifico segun su ID.

const getById = async (id) => {
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};
//Crea un carrito.

const create = async () => {
  const cart = await cartModel.create({});

  return cart;
};

//Actualiza el carrito especifico segun ID.

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

// elimina carrito especifico segun ID.
const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

//Añade un producto especifico (ID producto), en un carrito especifico.

const addProductToCart = async (cid, pid) => {


  const cart = await cartModel.findById(cid);

  const productInCart = cart.products.find((element) => element.product == pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save(); 
  return cart;
};

//Elimina un producto especifico (ID producto), en un carrito especifico.


const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);

  cart.products = cart.products.filter((element) => element.product != pid);

  await cart.save();

  return cart;
};

//Actualizar cantidad de productos especifico (ID producto), en un carrito especifico.


const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findById(cid);
  const product = cart.products.find( element => element.product == pid);
  product.quantity = quantity;

  await cart.save();
  return cart;
}

//Vaciar el carrito especifico
const clearProductsToCart = async (cid) => {

  const cart = await cartModel.findById(cid);
  cart.products = []

  await cart.save()

  return cart;
  
}
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart
};