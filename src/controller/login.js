import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import db from "../config/database.js";

export async function cadastrar(req,res) {
    const { nome, email, senha, senhaConfirmada } = req.body;

    //Validação do usuário
    const validaCadastro = joi.object({
        nome: joi.string().required(),
        email: joi.string().required(),
        senha: joi.string().required(),
        senhaConfirmada: joi.string().required().valid(senha)

    })

    const validacao = validaCadastro.validate({ nome, email, senha, senhaConfirmada });

    if (validacao.error) {
        return res.status(422).send(validacao)
    }

    //Mudar a senha
    const novaSenha = bcrypt.hashSync(senha, 10)

    try {
        await db.collection("usuarios").insertOne({ nome, email, senha: novaSenha })
        res.status(201).send("Ok");

    } catch (error) {
        console.error(error)
        
    }

}



export async function logar(req,res) {

    const { nome, senha } = req.body

    const usuario = await db.collection("usuarios").findOne({ nome })

    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: usuario._id,
            token
        })
        res.status(201).send(token)
    } else {
        return res.status(422).send("email ou senha incorretos")
    }

}