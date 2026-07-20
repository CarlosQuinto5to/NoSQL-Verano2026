const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.get("/", (req,res) =>{
    res.send("Hola Mundo");
});
// Ejercicio 1. Numero par o impar
app.get('/par/:numero', (req,res) =>{
    let a = Number(req.params.numero)
    if (a % 2 === 0) {
        res.send('El numero es par '+a);
    }else{
        res.send('El numero es impar '+a)
    } 
});

// Ejercicio 2. Mayor de edad 
app.get('/mayor_edad/:edad',(req,res) =>{
    const a = Number(req.params.edad);
    if (a >= 18) {
        res.send('Es mayor de edad con '+a);
    }else{
        res.send('Es menor de edad con '+a);
    }
});

// Ejercicio 3. calculadora
app.get('/calculadora/:calculo/:a/:b', (req, res) =>{
    const op = req.params.calculo;
    const a = Number(req.params.a);
    const b = Number(req.params.b);

    switch (op) {
        case 'suma':
            res.send(`El resultado de la suma de ${a} y ${b} es ${a+b}`)
            break;

        case 'resta':
            res.send(`El resultado de la resta de ${a} y ${b} es ${a-b}`)
            break;

        case 'multiplicacion':
            res.send(`El resultado de la multiplicacion de ${a} y ${b} es ${a*b}`)
            break;

        case 'division':
            res.send(`El resultado de la division de ${a} y ${b} es ${a/b}`)
            break;
    
        default:
            break;
    }
})
// Ejercicio 4. Tabla de multiplicar
app.get('/tabla/:numero',(req,res) =>{
    const numero = Number(req.params.numero);
    let tabla = '';
    for (let index = 1; index <= 10; index++) {
        tabla += `${numero} x ${index} = ${numero * index} <br>`;
    }
    res.send(tabla);
})

// Ejercicio 5. Calificacion
app.get('/calificacion/:nota',(req,res) =>{
    const calif = Number(req.params.nota);

    if (calif <= 100 && calif > 0){
        if (calif >= 90) {
            res.send('Excelente');
        }
        if (calif >= 80) {
            res.send('Muy bien');
        }
        if (calif >= 70) {
            res.send('Aprobado');
        }
        if (calif < 70) {
            res.send('Reprobado');
        }
    }
})

app.listen( PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});