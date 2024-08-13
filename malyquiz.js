const valorTitulo = "MALY QUIZ";

function cargarDOM() {
    const titulo = document.getElementById("titulo");
    titulo.innerText = valorTitulo;
}

cargarDOM();

class Jugador {
    constructor(nombre, edad, intentos, puntaje) {
        this.nombre = nombre;
        this.edad = edad;
        this.intentos = intentos;
        this.puntaje = puntaje;
    }
}

let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [
    new Jugador("Juan", 25, 4, 10),
    new Jugador("María", 30, 2, 8),
    new Jugador("Carlos", 22, 3, 6),
    new Jugador("Lucía", 27, 1, 4),
];

jugadores = jugadores.map(jugador => new Jugador(jugador.nombre, jugador.edad, jugador.intentos, jugador.puntaje));

document.getElementById("formularioJugador").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);

    if (!/^[A-Za-z]{3,}$/.test(nombre)) {
        document.getElementById("saludo").innerText = "El nombre debe tener al menos 3 letras. Inténtalo de nuevo.";
        return;
    }

    if (isNaN(edad) || edad <= 0) {
        document.getElementById("saludo").innerText = "Por favor, ingresá una edad válida.";
        return;
    }

    document.getElementById("saludo").innerText = `Hola ${nombre}😊, bienvenido/a al cuestionario!`;
    iniciarQuiz(nombre, edad);
});

function iniciarQuiz(nombre, edad) {
    let intentos = 0;
    let puntaje;

    const quiz = () => {
        intentos++;
        puntaje = 0;
        let preguntasIncorrectas = [];
        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 6 },
            { pregunta: "¿Cuántos lados tiene un hexágono?", respuestaCorrecta: 6 },
            { pregunta: "¿Cuánto es 7 * 7?", respuestaCorrecta: 49 },
            { pregunta: "¿Cuántas Copas del Mundo tiene Argentina?", respuestaCorrecta: 3 },
        ];

        const preguntasContainer = document.getElementById("preguntas");
        preguntasContainer.innerHTML = "";

        preguntas.forEach((pregunta, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${pregunta.pregunta}</p>
                <input type="number" id="respuesta${index}">
            `;
            preguntasContainer.appendChild(div);
        });

        const submitButton = document.createElement("button");
        submitButton.innerText = "Enviar Respuestas";
        submitButton.addEventListener("click", function () {
            preguntas.forEach((pregunta, index) => {
                const respuestaUsuario = Number(document.getElementById(`respuesta${index}`).value);
                if (respuestaUsuario === pregunta.respuestaCorrecta) {
                    puntaje += 2;
                } else {
                    preguntasIncorrectas.push(pregunta.pregunta);
                }
            });

            mostrarResultados(puntaje, preguntasIncorrectas);
        });

        preguntasContainer.appendChild(submitButton);
    };

    const mostrarResultados = (puntaje, preguntasIncorrectas) => {
        let resultado = `Tu puntaje final es: ${puntaje}/10\n`;

        if (preguntasIncorrectas.length > 0) {
            resultado += "Ups!😵Respondiste incorrectamente algunas preguntas:\n";
            preguntasIncorrectas.forEach(pregunta => {
                resultado += `- ${pregunta}\n`;
            });
        } else {
            resultado += "¡Excelente!😃😃😃Respondiste todas las preguntas correctamente.";
        }

        document.getElementById("resultado").innerText = resultado;

        const intentarDeNuevoContainer = document.getElementById("intentarDeNuevo");
        intentarDeNuevoContainer.innerHTML = ""; // Limpiar cualquier contenido previo

        const nuevoJugador = new Jugador(nombre, edad, intentos, puntaje);
        jugadores.push(nuevoJugador);
        localStorage.setItem('jugadores', JSON.stringify(jugadores));

        if (puntaje < 10) {
            const retryButton = document.createElement("button");
            retryButton.innerText = "Intentar de Nuevo";
            retryButton.addEventListener("click", quiz);

            intentarDeNuevoContainer.appendChild(retryButton);
        }

        mostrarJugadoresOrdenados();
    };

    quiz();
}

function mostrarJugadoresOrdenados() {
    jugadores = jugadores.map(jugador => {
        if (jugador.puntaje < 4) {
            jugador.puntaje += 2;
        }
        return jugador;
    });

    jugadores.sort((a, b) => {
        if (b.puntaje === a.puntaje) {
            return a.intentos - b.intentos;
        }
        return b.puntaje - a.puntaje;
    });

    const top10Jugadores = jugadores.slice(0, 10); // Obtener los 10 mejores jugadores

    let listaJugadores = "Top 10 Jugadores:\n";
    top10Jugadores.forEach((jugador, index) => {
        listaJugadores += `${index + 1}. ${jugador.nombre} - Puntaje: ${jugador.puntaje}, Intentos: ${jugador.intentos}\n`;
    });

    document.getElementById("mejoresJugadores").innerText = listaJugadores; // Mostrar la lista en el DOM
}







/*
const valorTitulo = "MALY QUIZ";

function cargarDOM() {
    const titulo = document.getElementById("titulo");
    titulo.innerText = valorTitulo;
}

cargarDOM();

class Jugador {
    constructor(nombre, edad, intentos, puntaje) {
        this.nombre = nombre;
        this.edad = edad;
        this.intentos = intentos;
        this.puntaje = puntaje;
    }
}

let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [
    new Jugador("Juan", 25, 4, 10),
    new Jugador("María", 30, 2, 8),
    new Jugador("Carlos", 22, 3, 6),
    new Jugador("Lucía", 27, 1, 4),
];

jugadores = jugadores.map(jugador => new Jugador(jugador.nombre, jugador.edad, jugador.intentos, jugador.puntaje));

document.getElementById("formularioJugador").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);

    if (!/^[A-Za-z]{3,}$/.test(nombre)) {
        document.getElementById("saludo").innerText = "El nombre debe tener al menos 3 letras. Inténtalo de nuevo.";
        return;
    }

    if (isNaN(edad) || edad <= 0) {
        document.getElementById("saludo").innerText = "Por favor, ingresá una edad válida.";
        return;
    }

    document.getElementById("saludo").innerText = `Hola ${nombre}😊, bienvenido/a al cuestionario!`;
    iniciarQuiz(nombre, edad);
});

function iniciarQuiz(nombre, edad) {
    let intentos = 0;
    let puntaje;

    const quiz = () => {
        intentos++;
        puntaje = 0;
        let preguntasIncorrectas = [];
        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 6 },
            { pregunta: "¿Cuántos lados tiene un hexágono??", respuestaCorrecta: 6 },
            { pregunta: "¿Cuánto es 7 * 7?", respuestaCorrecta: 49 },
            { pregunta: "¿Cuáles son los colores secundarios?", respuestaCorrecta: 2 },
        ];

        const preguntasContainer = document.getElementById("preguntas");
        preguntasContainer.innerHTML = "";

        preguntas.forEach((pregunta, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${pregunta.pregunta}</p>
                <input type="number" id="respuesta${index}">
            `;
            preguntasContainer.appendChild(div);
        });

        const submitButton = document.createElement("button");
        submitButton.innerText = "Enviar Respuestas";
        submitButton.addEventListener("click", function () {
            preguntas.forEach((pregunta, index) => {
                const respuestaUsuario = Number(document.getElementById(`respuesta${index}`).value);
                if (respuestaUsuario === pregunta.respuestaCorrecta) {
                    puntaje += 2;
                } else {
                    preguntasIncorrectas.push(pregunta.pregunta);
                }
            });

            mostrarResultados(puntaje, preguntasIncorrectas);
        });

        preguntasContainer.appendChild(submitButton);
    };

    const mostrarResultados = (puntaje, preguntasIncorrectas) => {
        let resultado = `Tu puntaje final es: ${puntaje}/10\n`;

        if (preguntasIncorrectas.length > 0) {
            resultado += "Ups!😵Respondiste incorrectamente algunas preguntas:\n";
            preguntasIncorrectas.forEach(pregunta => {
                resultado += `- ${pregunta}\n`;
            });
        } else {
            resultado += "¡Excelente!😃😃😃Respondiste todas las preguntas correctamente.";
        }

        document.getElementById("resultado").innerText = resultado;

        const intentarDeNuevoContainer = document.getElementById("intentarDeNuevo");
        intentarDeNuevoContainer.innerHTML = ""; // Limpiar cualquier contenido previo

        if (puntaje < 10) {
            const retryButton = document.createElement("button");
            retryButton.innerText = "Intentar de Nuevo";
            retryButton.addEventListener("click", quiz);

            intentarDeNuevoContainer.appendChild(retryButton);
        } else {
            const nuevoJugador = new Jugador(nombre, edad, intentos, puntaje);
            jugadores.push(nuevoJugador);
            localStorage.setItem('jugadores', JSON.stringify(jugadores));
            mostrarJugadoresOrdenados();
        }
    };

    quiz();
}

function mostrarJugadoresOrdenados() {
    jugadores = jugadores.map(jugador => {
        if (jugador.puntaje < 4) {
            jugador.puntaje += 2;
        }
        return jugador;
    });

    jugadores.sort((a, b) => {
        if (b.puntaje === a.puntaje) {
            return a.intentos - b.intentos;
        }
        return b.puntaje - a.puntaje;
    });

    console.log("Jugadores ordenados:", jugadores);
}
*/










/*
const valorTitulo = "MALY QUIZ";

function cargarDOM() {
    const titulo = document.getElementById("titulo");
    titulo.innerText = valorTitulo;
}

cargarDOM();

class Jugador {
    constructor(nombre, edad, intentos, puntaje) {
        this.nombre = nombre;
        this.edad = edad;
        this.intentos = intentos;
        this.puntaje = puntaje;
    }
}

let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [
    new Jugador("Juan", 25, 4, 10),
    new Jugador("María", 30, 2, 8),
    new Jugador("Carlos", 22, 3, 6),
    new Jugador("Lucía", 27, 1, 4),
];

jugadores = jugadores.map(jugador => new Jugador(jugador.nombre, jugador.edad, jugador.intentos, jugador.puntaje));

document.getElementById("formularioJugador").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);

    if (!/^[A-Za-z]{3,}$/.test(nombre)) {
        document.getElementById("saludo").innerText = "El nombre debe tener al menos 3 letras. Inténtalo de nuevo.";
        return;
    }

    if (isNaN(edad) || edad <= 0) {
        document.getElementById("saludo").innerText = "Por favor, ingresá una edad válida.";
        return;
    }

    document.getElementById("saludo").innerText = `Hola ${nombre}😊, bienvenido/a al cuestionario!`;
    iniciarQuiz(nombre, edad);
});

function iniciarQuiz(nombre, edad) {
    let intentos = 0;
    let puntaje;
    let intentarDeNuevo;

    const quiz = () => {
        intentos++;
        puntaje = 0;
        let preguntasIncorrectas = [];
        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 6 },
            { pregunta: "Un hexágono tiene 6 lados", respuestaCorrecta: 1 },
            { pregunta: "¿Cuánto es 7 * 7?", respuestaCorrecta: 49 },
            { pregunta: "¿Cuáles son los colores secundarios?", respuestaCorrecta: 2 },
        ];

        const preguntasContainer = document.getElementById("preguntas");
        preguntasContainer.innerHTML = "";

        preguntas.forEach((pregunta, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${pregunta.pregunta}</p>
                <input type="number" id="respuesta${index}">
            `;
            preguntasContainer.appendChild(div);
        });

        const submitButton = document.createElement("button");
        submitButton.innerText = "Enviar Respuestas";
        submitButton.addEventListener("click", function () {
            preguntas.forEach((pregunta, index) => {
                const respuestaUsuario = Number(document.getElementById(`respuesta${index}`).value);
                if (respuestaUsuario === pregunta.respuestaCorrecta) {
                    puntaje += 2;
                } else {
                    preguntasIncorrectas.push(pregunta.pregunta);
                }
            });

            mostrarResultados(puntaje, preguntasIncorrectas);
        });

        preguntasContainer.appendChild(submitButton);
    };

    const mostrarResultados = (puntaje, preguntasIncorrectas) => {
        let resultado = `Tu puntaje final es: ${puntaje}/10\n`;

        if (preguntasIncorrectas.length > 0) {
            resultado += "Ups!😵Respondiste incorrectamente algunas preguntas:\n";
            preguntasIncorrectas.forEach(pregunta => {
                resultado += `- ${pregunta}\n`;
            });
        } else {
            resultado += "¡Excelente!😃😃😃Respondiste todas las preguntas correctamente.";
        }

        document.getElementById("resultado").innerText = resultado;

        if (puntaje < 10) {
            intentarDeNuevo = confirm("Tu puntaje es menor a 10 🥲 ¿Quieres intentarlo de nuevo?");
            if (intentarDeNuevo) {
                quiz();
            }
        } else {
            const nuevoJugador = new Jugador(nombre, edad, intentos, puntaje);
            jugadores.push(nuevoJugador);
            localStorage.setItem('jugadores', JSON.stringify(jugadores));
            mostrarJugadoresOrdenados();
        }
    };

    quiz();
}

function mostrarJugadoresOrdenados() {
    jugadores = jugadores.map(jugador => {
        if (jugador.puntaje < 4) {
            jugador.puntaje += 2;
        }
        return jugador;
    });

    jugadores.sort((a, b) => {
        if (b.puntaje === a.puntaje) {
            return a.intentos - b.intentos;
        }
        return b.puntaje - a.puntaje;
    });

    console.log("Jugadores ordenados:", jugadores);
}
*/




/*
const valorTitulo = "MALY QUIZ"

function cargarDOM() {
    const titulo = document.getElementById("titulo")
    titulo.innerText = valorTitulo
}

cargarDOM()

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


*/











