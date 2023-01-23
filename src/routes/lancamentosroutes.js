import { receitas,despesas } from "../controller/lancamentos.js";
import {Router} from "express";

const routerlancamentos = Router();

//Cadastrar receita

routerlancamentos.post("/nova-entrada", receitas)

//Cadastrar despesa

routerlancamentos.post("/nova-saida", despesas)

export default routerlancamentos;