import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";

const server = express();
server.use(express.json());
server.use(cors());

dotenv.config();



const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect()
    db = mongoClient.db()

} catch (error) {
    console.error(error)
    console.log("Erro ao conectar no banco de dados")

}

//Cadastrar usuário

server.post("/cadastro", async (req,res)=>{

    const {nome,email,senha, senhaConfirmada} = req.body;

    //Validação do usuário
    const validaCadastro = joi.object({
        nome:joi.string().required(),
        email:joi.string().required(),
        senha:joi.string().required(),
        senhaConfirmada:joi.string().required().valid(senha)

    })

    const validacao = validaCadastro.validate({ nome,email,senha,senhaConfirmada });

    if (validacao.error) {
        return res.status(422).send(validacao)
    }
    
    try {
        await db.collection("usuarios").insertOne({nome, email, senha, senhaConfirmada})
        res.status(201).send("Ok");

    } catch (error) {
         res.status(500).send("Deu erro no bd")
    }

})





server.listen(5002, () => {
    console.log('Servidor funfou')
})