const buttonElement = document.getElementById("back");

//No funciona el comando para volver al menu
buttonElement.addEventListener("click", function () {
  window.location.href = "index.html";
});

let palabra;

//posibles palabras
var palabras_array = ["SAMAN", "UNIVERSIDAD", "VENEZUELA", 
"SISTEMAS", "VARIABLE", "DATO", "ALGORITMO", "PROGRAMACION", 
"FERIA", "METROPOLITANA", "MODULO", "CLASE", "FUNCION", "ARREGLO", 
"CONDICIONAL"];

//Esto elige la palabra aleatoria
var palabraAleatoria = palabras_array[Math.floor(Math.random() * palabras_array.length)];
document.getElementById("palabra").textContent = palabraAleatoria;


