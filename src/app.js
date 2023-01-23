import express from "express";
import cors from "cors";
import routerhome from "./routes/homeroutes.js";
import routerlancamentos from "./routes/lancamentosroutes.js";
import routerlogin from "./routes/loginroutes.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(routerhome)
server.use(routerlancamentos)
server.use(routerlogin)


server.listen(5002, () => {
    console.log('Servidor funfou')
})