import joi from "joi";
import db from "../config/database.js";

export async function receitas(req,res){
    const { valor, descricao } = req.body

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(422).send("Informe o token");
    }


    //Validar a receita
    const validaReceita = joi.object({
        valor: joi.number().required(),
        descricao: joi.string().required()
    })

    const validacao = validaReceita.validate({ valor, descricao });

    if (validacao.error) {
        return res.status(422).send(validacao)
    }

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.status(401).send("Você não tem autorização");
        }
        await db.collection("historico").insertOne({ valor, descricao, tipo: "Receita" })
        res.status(201).send("Ok");

    } catch (error) {
        res.status(500).send("Deu erro no bd")
    }
}

export async function despesas(req,res){
    const { valor, descricao } = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(422).send("Informe o token");
    }

    //Validar a despesa
    const validaDespesa = joi.object({
        valor: joi.number().required(),
        descricao: joi.string().required()
    })

    const validacao = validaDespesa.validate({ valor, descricao });

    if (validacao.error) {
        return res.status(422).send(validacao)
    }

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.status(401).send("Você não tem autorização");
        }
        await db.collection("historico").insertOne({ valor, descricao, tipo: "Despesa" })
        res.status(201).send("Ok");

    } catch (error) {
        res.status(500).send("Deu erro no bd")
    }
}