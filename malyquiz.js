/*
OMITÍ que el algoritmo "while (true)" es mala práctica, dejo comentado el error y sumo la corrección.

let nombre;

while (true) {
    nombre = prompt("Hola! ¿Cómo te llamás?");

    // Si el usuario presiona "Cancelar" o deja el nombre vacío, nombre será null o una cadena vacía y no te deja continuar
    if (nombre === null || nombre.trim() === "") {
        alert("Tenés que proporcionar un nombre para continuar.");
        continue;
    }

    // Valida que el nombre tenga al menos 3 letras
    const regex = /^[A-Za-z]{3,}$/;

    if (regex.test(nombre)) {
        break;
    } else {
        alert("El nombre debe tener al menos 3 letras. Inténtalo de nuevo.");
    }
}*/

// Saludo
let nombre;
let nombreValido = false;

while (!nombreValido) {
    nombre = prompt("Hola! ¿Cómo te llamás?");

    // Si el usuario presiona "Cancelar" o deja el nombre vacío, nombre será null o una cadena vacía y no te deja continuar
    if (nombre === null || nombre.trim() === "") {
        alert("Tenés que proporcionar un nombre para continuar.");
        continue;
    }

    // Valida que el nombre tenga al menos 3 letras
    const regex = /^[A-Za-z]{3,}$/;

    if (regex.test(nombre)) {
        nombreValido = true;
    } else {
        alert("El nombre debe tener al menos 3 letras. Inténtalo de nuevo.");
    }
}

// Alerta Saludo
alert(`Hola ${nombre}😊, bienvenido/a al cuestionario!`);

const quiz = () => {
    let puntaje;
    let intentarDeNuevo;

    do {
        alert("¡Empecemos!");
        puntaje = 0;
        let preguntasIncorrectas = [];

        // Esta función verifica la respuesta y asigna +2 puntos si la respuesta es correcta
        const verificarRespuesta = (pregunta, respuestaCorrecta, respuestaUsuario) => {
            if (respuestaUsuario === respuestaCorrecta) {
                puntaje += 2;
                console.log("Respuesta correcta!");
            } else {
                preguntasIncorrectas.push(pregunta);
                console.log("Respuesta incorrecta.");
            }
        };

        // Preguntas y respuestas correctas
        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 6 },
            { pregunta: "Un hexágono tiene 6 lados\n1-Verdadero\n2-Falso", respuestaCorrecta: 1 },
            { pregunta: "¿Cuánto es 7 * 7?", respuestaCorrecta: 49 },
            { pregunta: "¿Cuáles son los colores secundarios?\n1-Rojo, Amarillo y Azul\n2-Naranja, Violeta y Verde\n3-Violeta, Rojo y Azul\n4-Naranja, Amarillo y Verde", respuestaCorrecta: 2 },
        ];

        // Ciclo que recorre las preguntas y verifica las respuestas
        for (const pregunta of preguntas) {
            const respuestaUsuario = Number(prompt(pregunta.pregunta));
            verificarRespuesta(pregunta.pregunta, pregunta.respuestaCorrecta, respuestaUsuario);
        }

        // En caso de no tener puntaje perfecto este algoritmo muestra las preguntas incorrectas o felicita si respondiste todo bien
        if (preguntasIncorrectas.length > 0) {
            let mensaje = "Ups!😵Respondiste incorrectamente algunas preguntas:\n";
            for (const pregunta of preguntasIncorrectas) {
                mensaje += `- ${pregunta}\n`;
            }
            alert(mensaje);
        } else {
            alert("¡Excelente!😃😃😃Respondiste todas las preguntas correctamente.");
        }

        // Muestra tu puntaje final
        alert(`Tu puntaje final es: ${puntaje}/10`);

        // Si tu puntaje es menor a 10 te da la opción de intentarlo de nuevo.
        if (puntaje < 10) {
            intentarDeNuevo = confirm("Tu puntaje es menor a 10 🥲 ¿Quieres intentarlo de nuevo?");
        } else {
            intentarDeNuevo = false;
        }

    } while (intentarDeNuevo);
};

quiz(); // Ejecuta el cuestionario