import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Card.js";
const express = require("express");
const cors = require("cors");
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
connectDB();

app.use(cors());
//Crear una carta
app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json({
      message: "Card created successfully",
      card
    });
  } catch (error) {
    res.status(400).json({
      error: "Error creating card",
      details: error.message
    });
  }
});


app.put("/updateCard/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({ message: " Card updated successfully!", updatedCard });
  } catch (error) {
    res.status(400).json({ error: " Error updating card", details: error.message });
  }
});

app.post("/addCard", async (req, res) => {
  try {
    const existing = await Card.findOne({ name: req.body.name });
    if (existing) {
      return res.status(409).json({ message: " Card with that name already exists" });
    }
    const newCard = await Card.create(req.body);
    res.status(201).json({ message: " Card added successfully!", newCard });
  } catch (error) {
    res.status(400).json({ error: " Error adding card", details: error.message });
  }
});

// Obtener una carta por ID
app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ error: " Invalid card ID", details: error.message });
  }
});

app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error retrieving cards", details: error.message });
  }
});

app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({ message: " Card deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error: " Error al eliminar la carta", details: error.message });
  }
});

app.get("/review", (req, res) => {
  const endpoints = `
  ==== ENDPOINTS DISPONIBLES ====

  POST   /createCard       → Crear una carta
  PUT    /updateCard/:id   → Actualizar una carta
  POST   /addCard          → Agregar una carta (con verificación)
  GET    /getCard/:id      → Obtener carta por ID
  GET    /getAllCards         → Obtener todas las cartas
  DELETE /deleteCard/:id   → Eliminar carta
  GET    /review           → Muestra esta lista
  `;
  res.status(200).send(endpoints);
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});