import { cadastrar,logar } from "../controller/login.js";
import {Router} from "express";

const routerlogin = Router();

//Cadastrar usuário

routerlogin.post("/cadastro",cadastrar)

//Logar
routerlogin.post("/",logar)

export default routerlogin;