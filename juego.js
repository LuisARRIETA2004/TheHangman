const buttonElement = document.getElementById("back");

//No funciona el comando para volver al menu
buttonElement.addEventListener("click", function () {
  window.location.href = "index.html";
});


//posibles palabras
// var palabras_array = ["SAMAN", "UNIVERSIDAD", "VENEZUELA",
// "SISTEMAS", "VARIABLE", "DATO", "ALGORITMO", "PROGRAMACION",
// "FERIA", "METROPOLITANA", "MODULO", "CLASE", "FUNCION", "ARREGLO",
// "CONDICIONAL"];

//Esto elige la palabra aleatoria
// var palabraAleatoria =
//   palabras_array[Math.floor(Math.random() * palabras_array.length)];
// document.getElementById("palabra").textContent = palabraAleatoria;

var palabras = [
  ["SAMAN", "Árbol tropical"],
  ["UNIVERSIDAD", "Institución educativa"],
  ["VENEZUELA", "País de Sudamérica"],
  ["SISTEMAS", "Conjunto de elementos"],
  ["VARIABLE", "Dato que puede cambiar"],
  ["DATO", "Información procesada"],
  ["ALGORITMO", "Secuencia de pasos"],
  ["PROGRAMACION", "Creación de software"],
  ["FERIA", "Evento comercial"],
  ["METROPOLITANA", "Relativo a una metrópoli"],
  ["MODULO", "Unidad independiente"],
  ["CLASE", "Modelo de objeto"],
  ["FUNCION", "Tarea específica"],
  ["ARREGLO", "Colección de datos"],
  ["CONDICIONAL", "Sentencia que evalúa"],
];


// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");



// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}


// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "¡¡ Felicidades !!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Restablecer juego
function otraPalabra() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar
window.onload = inicio();
