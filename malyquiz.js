// Clase Jugador
class Jugador {
    constructor(nombre, edad, intentos, puntaje) {
        this.nombre = nombre;
        this.edad = edad;
        this.intentos = intentos;
        this.puntaje = puntaje;
    }
}

// Recuperar los datos de localStorage o inicializar con valores predeterminados
let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [
    new Jugador("Juan", 25, 4, 10),
    new Jugador("María", 30, 2, 8),
    new Jugador("Carlos", 22, 3, 6),
    new Jugador("Lucía", 27, 1, 4),
];

// Convertir los objetos recuperados a instancias de Jugador
jugadores = jugadores.map(jugador => new Jugador(jugador.nombre, jugador.edad, jugador.intentos, jugador.puntaje));

let nombre;
let edad;

// Pide el nombre del jugador
let nombreValido = false;
while (!nombreValido) {
    nombre = prompt("Hola! ¿Cómo te llamás?");
    if (nombre === null || nombre.trim() === "") {
        alert("Tenés que proporcionar un nombre para continuar.");
        continue;
    }

    const regex = /^[A-Za-z]{3,}$/;
    if (regex.test(nombre)) {
        nombreValido = true;
    } else {
        alert("El nombre debe tener al menos 3 letras. Inténtalo de nuevo.");
    }
}

// Pide la edad del jugador
let edadValida = false;
while (!edadValida) {
    edad = parseInt(prompt("¿Cuántos años tenés?"));
    if (isNaN(edad) || edad <= 0) {
        alert("Por favor, ingresá una edad válida.");
    } else {
        edadValida = true;
    }
}

// Alerta Saludo
alert(`Hola ${nombre}😊, bienvenido/a al cuestionario!`);

let intentos = 0;  // Variable para contar los intentos

const quiz = () => {
    let puntaje;
    let intentarDeNuevo;

    do {
        intentos++;  // Incrementa los intentos cada vez que el jugador repite el cuestionario
        alert("¡Empecemos!");
        puntaje = 0;
        let preguntasIncorrectas = [];

        const verificarRespuesta = (pregunta, respuestaCorrecta, respuestaUsuario) => {
            if (respuestaUsuario === respuestaCorrecta) {
                puntaje += 2;
                console.log("Respuesta correcta!");
            } else {
                preguntasIncorrectas.push(pregunta);
                console.log("Respuesta incorrecta.");
            }
        };

        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 6 },
            { pregunta: "Un hexágono tiene 6 lados\n1-Verdadero\n2-Falso", respuestaCorrecta: 1 },
            { pregunta: "¿Cuánto es 7 * 7?", respuestaCorrecta: 49 },
            { pregunta: "¿Cuáles son los colores secundarios?\n1-Rojo, Amarillo y Azul\n2-Naranja, Violeta y Verde\n3-Violeta, Rojo y Azul\n4-Naranja, Amarillo y Verde", respuestaCorrecta: 2 },
        ];

        for (const pregunta of preguntas) {
            const respuestaUsuario = Number(prompt(pregunta.pregunta));
            verificarRespuesta(pregunta.pregunta, pregunta.respuestaCorrecta, respuestaUsuario);
        }

        if (preguntasIncorrectas.length > 0) {
            let mensaje = "Ups!😵Respondiste incorrectamente algunas preguntas:\n";
            for (const pregunta of preguntasIncorrectas) {
                mensaje += `- ${pregunta}\n`;
            }
            alert(mensaje);
        } else {
            alert("¡Excelente!😃😃😃Respondiste todas las preguntas correctamente.");
        }

        alert(`Tu puntaje final es: ${puntaje}/10`);

        if (puntaje < 10) {
            intentarDeNuevo = confirm("Tu puntaje es menor a 10 🥲 ¿Quieres intentarlo de nuevo?");
        } else {
            intentarDeNuevo = false;
        }

    } while (intentarDeNuevo);

    const nuevoJugador = new Jugador(nombre, edad, intentos, puntaje);
    jugadores.push(nuevoJugador);
    console.log(jugadores);

    // Guardar los jugadores actualizados en localStorage
    localStorage.setItem('jugadores', JSON.stringify(jugadores));

    // Método map para aplicar 2 puntos extra a jugadores con menos de 4 puntos
    jugadores = jugadores.map(jugador => {
        if (jugador.puntaje < 4) {
            jugador.puntaje += 2;
        }
        return jugador;
    });

    // Ordena jugadores: primero por mayor puntaje, luego por menor intentos
    jugadores.sort((a, b) => {
        if (b.puntaje === a.puntaje) {
            return a.intentos - b.intentos; // Menor cantidad de intentos ubica primero al jugador si el puntaje es igual
        }
        return b.puntaje - a.puntaje; // Mayor puntaje primero
    });

    console.log("Jugadores ordenados:", jugadores);
};

quiz(); // Ejecuta el cuestionario










