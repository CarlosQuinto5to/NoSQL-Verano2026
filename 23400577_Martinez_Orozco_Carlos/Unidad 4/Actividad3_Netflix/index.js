const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");


const app = express();
const PORT = 3000;
app.use(express.json());




app.use(morgan('dev'));
mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix").then(() => {
    console.log("Conectado a la base de datos");
}).catch((err) => {
    console.log("Error al conectar a la base de datos", err);
});

const serieSchema = new mongoose.Schema({
    titulo:         {type: String, required: true, trim: true},
    genero:         {type: String, required: true, trim: true},
    año:            {type: Number, required: true, min: 1},
    temporadas:     {type: Number, required: true, min: 1},
    episodios:      {type: Number, required: true, min: 1},
    idioma:         {type: String, required: true, trim: true},
    calificacion:   {type: Number, required: true, min: 1, max: 10},
    nc:             {type: String, required: true, trim: true}},
{
    timestamps: true
});

const serie = mongoose.model("Serie", serieSchema, "series");

const peliculaSchema = new mongoose.Schema({
    titulo:         {type: String, required: true, trim: true},
    genero:         {type: String, required: true, trim: true},
    año:            {type: Number, required: true, min: 1},
    duracion:       {type: Number, required: true, min: 1},
    idioma:         {type: String, required: true, trim: true},
    calificacion:   {type: Number, required: true, min: 1, max: 10},
    nc:             {type: String, required: true, trim: true}
},{
    timestamps: true
});

const pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");


app.listen(PORT, () =>{
    console.log("Servidor iniciado en http://localhost:" + PORT);
});

app.get("/series", async (req, res) => {
    try{
        const series = await serie.find();
        res.json(series);
    } catch (error){
        res.status(500).json({
            mensaje: "Error al obtener las series",
            error: error
        });
    }
});


app.get("/peliculas", async (req, res) => {
    try{
        const peliculas = await pelicula.find();
        res.json(peliculas);
    } catch (error){
        res.status(500).json({
            mensaje: "Error al obtener los peliculas",
            error: error
        });
    }
});


app.get("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const serie = await serie.findById(id);
        if (!serie) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }
        res.json(serie);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el serie",
            error: error
        });
    }
});

app.get("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const peliculas = await pelicula.findById(id);
        if (!peliculas) {
            return res.status(404).json({
                mensaje: "pelicula no encontrada"
            });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el pelicula",
            error: error
        });
    }
});