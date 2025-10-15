import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Card.js";
const app = express();
connectDB();

app.use(express.json());

app.post("/createCard", async (req, res) => {
    try{
        const card = await Card.create(req.body);
        //vamos a regresar la cart creada por mongoDB
        res.status(201).json(card).send("Card created succesfully");
    } catch (error) {
        res.status(400).setDefaultEncoding(error);
        console.error(error);
    }
});

app.get("/getAllCards", async (req, res) => {
    try {
        const cards = Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(400).send(error);
        console.error(error);
    }
});

app.post("/cards", async (req, res) => {
    try{
        const card= await Card.create(req.body);
        console.log(card);
        // res.status(201).json(card).send("card create succesfully");
    }catch (error) {}
});

//ENDPOINT. node index.js
app.get("/Hola", (req, res) => {
    res.status(200).send("Hello World from a Server!!");
});

app.get("/Hello", (req, res) => {
    res.status(200).send("Hola mundo desde el servidor express de nuevo");
});

const PORT = process.env.PORT;
app.listen(PORT);
app.listen(PORT, () => {
    console.log('Servidor Ejecutandose en http://localhost:${PORT}')
});

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos: " + user + " " + email);
    res.status(200).send("Data received successfully");
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
