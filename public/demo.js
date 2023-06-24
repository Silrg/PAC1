mostrar();

function insertar() {
// PRIMERO, GRABO INFORMACIÓN QUE EL USUARIO ME HA DADO
let nombre = document.getElementById("nombre").value;
let imagen = document.getElementById("imagen").value;
let director = document.getElementById("director").value;
let distribuidor = document.getElementById("distribuidor").value;
let anyo = document.getElementById("anyo").value;
let duracion = document.getElementById("duracion").value;

// ENCAPSULO ESTA INFORMACIÓN EN UN OBJETO LITERAL
let nuevo = {
    nombre,
    imagen,
    director,
    distribuidor,
    anyo,
    duracion,
};
// VAMOS A MANDAR ESTA INFORMACIÓN AL SERVIDOR. NOSOTROS
  // ESTAMOS EN EL LADO DEL CLIENTE (FICHEROS ESTÁTICOS) Y
  // TENGO QUE MANDARLA AL SERVIDOR. ES DECIR, TENGO QUE
  // REALIZAR UNA PETICIÓN (UN REQUEST) Y EL SERVIDOR
  // ME TENDRÁ QUE DAR UNA RESPUESTA (RESPONSE)

  fetch("/peliculas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo),
  });
  mostrar();
}

function mostrar() {
    fetch("/peliculas", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json", 
        },
    })
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        let mostrarPeliculas = "";
        for (let i = 0; i < datos.length; i++) {
            mostrarPeliculas += `
            <div id="card">
            <h2>${datos[i].nombre}</h2>
            <img id="img" src="${datos[i].imagen}" alt="imagen">
            <h3>${datos[i].director}</h3>
            <h3>${datos[i].distribuidor}</h3>
            <h3>Año: ${datos[i].anyo}</h3>
            <h3>Duración: ${datos[i].duracion}</h3>

            </div>
              `;
        }
        document.getElementById("print").innerHTML = mostrarPeliculas;
    });
}

function buscarPelicula() {
    let itemBuscar = document.getElementById("itemBuscar").value;

// CONVERTIMOS LO QUE EL USUARIO HA ESCRITO PRIMERO EN MINÚSCULA Y
  // DESPUÉS CONVERTIMOS LA PRIMERA LETRA EN MAYÚSCULA PARA QUE LA
  // COINCIDENCIA SEA REAL
  itemBuscar = itemBuscar.toLowerCase();
  let primera = itemBuscar.substring(0, 1);
  primera = primera.toUpperCase();
  let resto = itemBuscar.substring(1);
  let final = primera + resto;
  console.log(final); 

  // FETCH E IMPRESIÓN DE RESULTADOS
  fetch("/peliculas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
})
.then(function (respuesta) {
  return respuesta.json();
})
.then(function (datos) {
  let mostrarPeliculas = "";

  for (let i = 0; i < datos.length; i++) {
    if (datos[i].nombre == final) { //*** */
      mostrarPeliculas += `
          <div id="card">
            <h3>${datos[i].nombre.toUpperCase()}</h3>
            <img id="img" src="${datos[i].imagen}" alt="imagen">
            <h3>${datos[i].director}</h3>
            <h3>${datos[i].distribuidor}</h3>
            <h3>Año: ${datos[i].anyo}</h3>
            <h3>Duración: ${datos[i].duracion}</h3>
          </div>`;
          
    }
  }
  if (mostrarPeliculas == "") {
    mostrarPeliculas += `<p>No hay coincidencias</p>`;
  }

  document.getElementById("print").innerHTML = mostrarPeliculas;
});
}

function editar() {

// CONVERTIMOS LO QUE EL USUARIO HA ESCRITO PRIMERO EN MINÚSCULA Y
// DESPUÉS CONVERTIMOS LA PRIMERA LETRA EN MAYÚSCULA PARA QUE LA
// COINCIDENCIA SEA REAL **

// PRIMERO, GRABO INFORMACIÓN QUE EL USUARIO ME HA DADO *
 let nombre = document.getElementById("nombreEditar").value;
 let imagen = document.getElementById("imagenEditar").value;
 let director = document.getElementById("directorEditar").value;
 let distribuidor = document.getElementById("distribuidorEditar").value;
 let anyo = document.getElementById("anyoEditar").value;
 let duracion = document.getElementById("duracionEditar").value;
 
 
   
// ENCAPSULO ESTA INFORMACIÓN EN UN OBJETO LITERAL *
 let nuevo = {
    nombre,
    imagen,
    director,
    distribuidor,
    anyo,
    duracion, 
 };
   
        // VAMOS A MANDAR ESTA INFORMACIÓN AL SERVIDOR. NOSOTROS *
     // ESTAMOS EN EL LADO DEL CLIENTE (FICHEROS ESTÁTICOS) Y
     // TENGO QUE MANDARLA AL SERVIDOR. ES DECIR, TENGO QUE
     // REALIZAR UNA PETICIÓN (UN REQUEST) Y EL SERVIDOR
     // ME TENDRÁ QUE DAR UNA RESPUESTA (RESPONSE)
   
     fetch("/peliculas", {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(nuevo), //mandas por body el objeto nuevo y no la clave especie
       });
       mostrar();
     }
   
   //borrar **
   function borrar() {
     let nombre =document.getElementById("nombreBorrar").value;
     let nuevo = {
       nombre: nombre,
     };
     fetch("/peliculas", {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(nuevo),
     });
     mostrar();
     }
   

