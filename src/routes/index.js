import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import sessionRouter from "./session.routes.js";
import contactRouter from "./contact.routes.js";
import ticketRouter from "./ticket.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/session", sessionRouter);
router.use("/tickets", ticketRouter);
router.use("/contact", contactRouter);


export default router;