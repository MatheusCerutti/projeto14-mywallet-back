import { carregarlancamentos } from "../controller/home.js";
import {Router} from "express";

const routerhome = Router();
//Buscar historico de lancamentos

routerhome.get("/home", carregarlancamentos);

export default routerhome;