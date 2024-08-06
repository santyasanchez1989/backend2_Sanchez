import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import envs from "./config/envs.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 
app.use(cookieParser());
app.use(
  session({
    secret: envs.SECRET_CODE, 
    resave: true, 
    saveUninitialized: true, 
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.use("/", viewsRoutes);

const httpServer = app.listen(envs.PORT, () => {
  console.log(`Server on port ${envs.PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});