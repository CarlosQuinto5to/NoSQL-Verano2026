const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(morgan("dev"));

mongoose.connect("monogodb://127.0.0.1:27017/escuela")
.then(()=>{ 
    console.log("Connectado correctamente a MongoDB");
})
.catch((error) =>{
    console.error("Error al conectar a MongoDB: ", error);
})

const alumnoSchema = new mongoose.Schema(
    {
        nombre: {type: String, required:true, trim:true},
        carrera: {type: String, required:true, trim:true},
        semestre: {type: Number, required:true, min:1}
    },{
        timestamps: true
    }
);

const Alumno = mongoose.model("Alumno", alumnoSchema);

app.get("/alumnos",(req,res) =>{
    res.json(alumnos);
})

app.get("/alumnos/:id",(req,res) =>{
    const id = Number(req.params.id);
    const alumno = alumnos.find(alumno => alumno.id === id);
    if (!alumno) {
        return res.status(404).json({mensaje: "Alumno no encontrado"});
    }  
    res.json(alumno);
})

app.post("/alumnos",(req,res) =>{
    const {nombre, carrera, semestre } = req.body;
    if(!nombre || !carrera || !semestre){
        return res.status(400).json({mensaje: "Faltan datos"});
    }
    const nuevoAlumno = {
        id: alumnos.length + 1,
        nombre: nombre,
        carrera: carrera,
        semestre: semestre
    }
    alumnos.push(nuevoAlumno);
    res.json({mensaje: "Alumno resgistrado correctamente", alumno: nuevoAlumno});
 })

app.put("/alumnos/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const {nombre, carrera, semestre} = req.body;
    if(!nombre || !carrera || !semestre){
        return res.status(400).json({
            mensaje: "Faltan datos del alumno"
        });
    }
    const indice = alumnos.findIndex(alumno => alumno.id === id);
    if(indice === -1){
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });
    }
    alumnos[indice] = {
        id: id,
        nombre: nombre,
        carrera: carrera,
        semestre: semestre
    };
    res.json({
        mensaje: "Alumno actualizado correctamente",
        alumno: alumnos[indice]
    });
});

app.delete("/alumnos/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const indice = alumnos.findIndex(alumno => alumno.id === id);
    if(indice === -1){
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });
    }
    const alumnoEliminado = alumnos(indice);
    alumnos.splice(indice, 1);
    res.json({
        mensaje: "Alumno eliminado correctamente",
        alumno: alumnoEliminado
    });
});

// --------------------

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

