import express from "express";
import cors from "cors";
import { cadastrar,logar } from "./controller/login.js";
import { receitas,despesas } from "./controller/lancamentos.js";
import { carregarlancamentos } from "./controller/home.js";

const server = express();
server.use(express.json());
server.use(cors());

//Cadastrar usuário

server.post("/cadastro",cadastrar)

//Logar
server.post("/",logar)


//Cadastrar receita

server.post("/nova-entrada", receitas)

//Cadastrar despesa

server.post("/nova-saida", despesas)

//Buscar historico de lancamentos

server.get("/home", carregarlancamentos);

server.listen(5002, () => {
    console.log('Servidor funfou')
})