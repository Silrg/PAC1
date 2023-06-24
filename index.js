const express = require("express");
const app = express();
app.use(express.static("public"));

// INSTRUCCIONES NUEVAS PARA HACER POSIBLE EL USO DE JSON
app.use(express.json());
// INSTRUCCIONES NUEVAS PARA PASAR DATOS POR BODY
app.use(express.urlencoded({ extended: false }));

// IMPORTAMOS ARRAY
const peliculas = require("./array");

// PETICIÓN DE TIPO GET: RECIBE LA INFO
app.get("/peliculas", (req, res) => {
    res.send(peliculas);
});

// PETICIÓN DE TIPO POST: AÑADE INFO
app.post("/peliculas", (req, res) => {
    let nuevaPelicula = {
        nombre: req.body.nombre,
        imagen: req.body.imagen,
        director: req.body.director,
        distribuidor: req.body.distribuidor,
        anyo: req.body.anyo,
        duracion: req.body.duracion,
    };

    peliculas.push(nuevaPelicula);
    res.send(peliculas);
});

//PETICIÓN DE TIPO PUT: ES PARA EDITAR *
app.put("/peliculas", (req, res) => {
    let nombre = req.body.nombre;
    let imagen = req.body.imagen;
    let director = req.body.director;
    let distribuidor = req.body.distribuidor;
    let anyo = req.body.anyo;
    let duracion = req.body.anyo;
    let coincidencia = false;

    for (let i = 0; i < peliculas.length; i++) {
        if (nombre == peliculas[i].nombre) {
            peliculas[i].imagen = imagen;
            peliculas[i].director = director;
            peliculas[i].distribuidor = distribuidor;
            peliculas[i].anyo = anyo;
            peliculas[i].duracion = duracion;
            coincidencia = true;
        }
    }
    if (coincidencia) {
        res.send("Se ha editado correctamente");
    } else {
        res.send("error, no encontrado");
    }

});
// Petición delete es para borrar **
app.delete("/peliculas", (req, res) => {
    let nombre = req.body.nombre;
    let coincidencia = false;
    for (let i = 0; i < peliculas.length; i++) {
      if (nombre == peliculas[i].nombre) {
        peliculas.splice(i, 1); // es una especie de cortar y pegar.
        coincidencia = true;
      }
    }
    res.send("probando");
  });

  app.listen(3000)