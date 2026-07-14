const express= require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(morgan("dev"));

app.get("/", (req,res) =>{
    res.send("Hola Mundo");
});
app.get("/mensaje",(req,res) =>{
    res.send("Mensaje desde Express2");
});

app.get("/mensaje",(req,res) =>{
    res.send("Mensaje desde Express");
});

app.get("/pagina",(req,res) =>{
    const nomnbre = "Cralos"
    res.send(`
        <style>
            .p1 {
                color: green;
                background: red;
            }
        </style>
        <h1>Mi Pagina web</h1>
        <p class= "p1">Creada con Express</p>    
        <p class= "p1">Hola ${nomnbre}</p>    
        `);
});

app.get("/alumno",(req, res) =>{
    res.json({
        nombre: "Cralos",
        carrera: "ISC",
        semestre: 7
    });
});

app.get("/materias",(req, res) =>{
    res.json([
        {
            nombre: "NoSQL",
            hora: "8:00-11:00"
        },{
            nombre: "Automatas II",
            hora: "11:00-14:00"
        },{
            nombre: "Programacion WEB",
            hora: "14:00-15:00"
        },
    ]);
});

app.get("/mensaje/:nombre",(req,res) =>{
    res.send(`Hola ${req.params.nombre}`);
});

app.get("/suma/:a/:b",(req,res) =>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    
    res.send(`El resultado es: ${a+b}`);
});

app.get("/multiplicar/:a/:b",(req,res) =>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    
    res.send(`El resultado es: ${a*b}`);
});

app.get("/aleatorio",(req,res) =>{
    const numero= Math.floor(Math.random() * 100)+1;

    res.send(`Resultado: ${numero}`)
})

app.listen(PORT, () =>{
    console.log("Servidor iniciado en http://localhost:" + PORT);
});

