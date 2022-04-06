let turno = 1;
let fichas = ["url('./ficha_roja.png", "url('./ficha_negra.png"];
let puestas = 0;
let partidaAcabada = false;
let botones = Array.from(document.getElementsByClassName("button-play-style"));

botones.forEach((x) => x.addEventListener("click", ponerFicha));

//Pones nuestra ficha negra
function ponerFicha(event) {
    let botonPulsado = event.target;
    if (!partidaAcabada && botonPulsado.innerHTML == "") {
        botonPulsado.style.backgroundImage = "url('./ficha_negra.png";
        botonPulsado.style.backgroundSize = "cover";
        puestas += 1;

        let estadoPartida = estado();
        if (estadoPartida == 0) {
            cambiarTurno();
            if (puestas < 9) {
                ia();
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();
            }
        }
    }
}

//Cambiamos de turno
function cambiarTurno() {
    if (turno == 1) {
        turno = 0;
    } else {
        turno = 1;
    }
}

function estado() {
    posicionVictoria = 0;
    nEstado = 0;

    //Se pinta el background de amarillo en cuanto se forma el 3 en raya
    function sonIguales(...args) {
        valores = args.map((x) => x.style.backgroundImage);
        if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
            args.forEach((x) => (x.style.backgroundColor = "yellow"));
            return true;
        } else {
            return false;
        }
    }

    //Vemos si coincide alguna linea
    if (sonIguales(botones[0], botones[1], botones[2])) {
        posicionVictoria = 1;
    } else if (sonIguales(botones[3], botones[4], botones[5])) {
        posicionVictoria = 2;
    } else if (sonIguales(botones[6], botones[7], botones[8])) {
        posicionVictoria = 3;
    } else if (sonIguales(botones[0], botones[3], botones[6])) {
        posicionVictoria = 4;
    } else if (sonIguales(botones[1], botones[4], botones[7])) {
        posicionVictoria = 5;
    } else if (sonIguales(botones[2], botones[5], botones[8])) {
        posicionVictoria = 6;
    } else if (sonIguales(botones[0], botones[4], botones[8])) {
        posicionVictoria = 7;
    } else if (sonIguales(botones[2], botones[4], botones[6])) {
        posicionVictoria = 8;
    }

    if (posicionVictoria > 0) {
        if (turno == 1) {
            nEstado = 1;
        } else {
            nEstado = -1;
        }
    }

    return nEstado;
}

//Funcionalidad del bot
function ia() {
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let valores = botones.map((x) => x.style.backgroundImage);
    let pos = -1;

    if (valores[4] == "") {
        pos = 4;
    } else {
        let n = aleatorio(0, botones.length - 1);
        while (valores[n] != "") {
            n = aleatorio(0, botones.length - 1);
        }
        pos = n;
    }

    botones[pos].style.backgroundImage = "url('./ficha_roja.png')";
    botones[pos].style.backgroundSize = "cover";
    return pos;
}
