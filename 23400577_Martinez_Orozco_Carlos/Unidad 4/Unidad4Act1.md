# Actividad 1 -- Carlos Martinez Orozco
## 1. Crear una pelicula
* *Metodo HTTP:* POST
* *URI:* /peliculas
* *Json enviado:*
{
  "id": 1,
  "nombre": "Spiderman - Fuera de casa",
  "director": "Harryson wale",
  "año": 2025,
  "duracion" : 113,
  "genero": "Accion"
}
* *Json recibido:*
{
  "code": 200,
  "msg": "Pelicula creada"
}
## 2. Consulta una pelicula
* *Metodo HTTP:* GET 
* *URI:* /peliculas/1
* *Json enviado:*
{
}
* *Json recibido:*
{
  "code": 200,
  data: {
    "id": 1,
    "nombre": "Spiderman - Fuera de casa",
    "director": "Harryson wale",
    "año": 2025,
    "duracion" : 113,
    "genero": "Accion"
  }
}
## 3. Actualizar el año, director y duración de una película por su id
* *Metodo HTTP:* PUT
* *URI:* /peliculas/1
* *Json enviado:*
{
  "año": 2024,
  "duracion" : 123,
}
* *Json recibido:*
{
  "code": 200,
  "msg": "Pelicula actualizada"
}
## 4. Borra una pelicula por su id
* *Metodo HTTP:* DELETE
* *URI:* /peliculas/1
* *Json enviado:*
{
}
* *Json recibido:*
{
  "code": 200,
  "msg": "Pelicula Eliminada"
}
