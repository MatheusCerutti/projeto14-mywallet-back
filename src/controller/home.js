import db from "../config/database.js";

export async function carregarlancamentos(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(422).send("Informe o token");
    }

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }

    const user = await db.collection("usuarios").findOne({
        _id: session.userId
    })

    if (user) {
        try {
            const registros = await db.collection("historico").find().toArray()

            return res.send(registros)
        } catch (error) {
            console.error(error)
            console.log("Erro ao conectar no banco de dados")
        }

    } else {
        res.sendStatus(401);
    }
}