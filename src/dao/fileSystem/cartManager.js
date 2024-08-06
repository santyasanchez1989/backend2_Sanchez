import fs from "fs";

let carts = [];
const pathFile = "./src/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsPars = JSON.parse(cartsJson);
  carts = cartsPars || [];
};

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};


const addProductToCart = async (cid, pid) => {
  await getCarts();
  const index = carts.findIndex((cart) => cart.id === cid);
  
  
  if (index === -1) {
    throw new Error("Carrito no encontrado");
  }

  const existingProductIndex = carts[index].products.findIndex((product) => product.product === pid);
  
  if (existingProductIndex !== -1) {
    
    carts[index].products[existingProductIndex].quantity++;
  } else {
    
    carts[index].products.push({ product: pid, quantity: 1 });
  }

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  
  return carts[index];
};

const updateCart = async (cid, updatedCart) => {
  try {
    
    return updatedCart;
  } catch (error) {
    throw new Error("Error al actualizar carro");
  }
};


export default {
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
  updateCart,
 };