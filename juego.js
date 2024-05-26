const buttonElement = document.getElementById("back");

buttonElement.addEventListener("click", function () {
  window.location.href = "index.html";
});


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

//Setea las variables para que empiecen en 0
var pto1 = 0;
var pto2 = 0;
var pto3 = 0;
var pto4 = 0;

document.getElementById("p1").value = pto1;
document.getElementById("p2").value = pto2;
document.getElementById("p3").value = pto3;
document.getElementById("p4").value = pto4;

         
//Estp se encarga de seleccionar el turno de cada jugador
document.addEventListener("DOMContentLoaded", function() {
  var indexJugador = localStorage.getItem("indexJugador") || 1;
  indexJugador = parseInt(indexJugador) % 4 + 1;
  localStorage.setItem("indexJugador", indexJugador);
  document.getElementById("indexJugador").value = indexJugador;
});


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

  const huecoAMostrar = document.getElementById("hueco-pista");
  huecoAMostrar.innerHTML = palabras[rand][1];
  huecoAMostrar.style.color = "black"; 
}

// Comprueba si ha finalizado
function compruebaFin() {
  let congratulationsMessage;
  if (oculta.indexOf("_") == -1) {

    congratulationsMessage = "¡¡ Felicidades !!";

    puntos();
  } else if (cont == 0) {
    congratulationsMessage = "Game Over";
    puntos();
  }

  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = congratulationsMessage;
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    //Se ejecuta la funcion de los puntos
    puntos()

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  } else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").className += "zoom-in";
    //Se ejecuta la funcion de los puntos
    puntos()

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

function prueba() {
  document.getElementById("p1").value = pto1;
}
prueba();


function puntos() {
  // Aquí debes tener una condición para determinar si el jugador gana o pierde
  if (oculta.indexOf("_") == -1) { // Por ejemplo, si el jugador completa la palabra
    switch (indexJugador) {
      case 1:
        pto1 += 10;
        document.getElementById("p1").value = pto1;
        break;
      case 2:
        pto2 += 10;
        document.getElementById("p2").value = pto2;
        break;
      case 3:
        pto3 += 10;
        document.getElementById("p3").value = pto3;
        break;
      case 4:
        pto4 += 10;
        document.getElementById("p4").value = pto4;
        break;
    }
  } else if (cont == 0) { // Si el jugador pierde todas las oportunidades
    switch (indexJugador) {
      case 1:
        pto1 -= 5;
        document.getElementById("p1").value = pto1;
        break;
      case 2:
        pto2 -= 5;
        document.getElementById("p2").value = pto2;
        break;
      case 3:
        pto3 -= 5;
        document.getElementById("p3").value = pto3;
        break;
      case 4:
        pto4 -= 5;
        document.getElementById("p4").value = pto4;
        break;
    }
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
