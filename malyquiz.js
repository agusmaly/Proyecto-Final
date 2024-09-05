// Variable del titulo
const valorTitulo = "MALY QUIZ";

// Función que carga el DOM con la variable del título
function cargarDOM() {
    const titulo = document.getElementById("titulo");
    titulo.innerText = valorTitulo;
}

cargarDOM();

// Clase que representa un jugador
class Jugador {
    constructor(nombre, edad, intentos, puntaje) {
        this.nombre = nombre;
        this.edad = edad;
        this.intentos = intentos;
        this.puntaje = puntaje;
    }
}

//Recupera datos de jugadores almacenados en el localStorage o inicia con algunos jugadores predeterminados
let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [
    new Jugador("Messi", 37, 4, 10),
    new Jugador("Maradona", 63, 2, 8),
    new Jugador("Sabatini", 54, 3, 6),
    new Jugador("Lucía", 27, 1, 4),
];

//Convierte los jugadores recuperados en instancias de Jugador
jugadores = jugadores.map(jugador => new Jugador(jugador.nombre, jugador.edad, jugador.intentos, jugador.puntaje));

// Función que muestra el top 10 por puntaje e intentos
function mostrarJugadoresOrdenados() {
    // Genera una copia del array de jugadores para trabajar sin modificar el original
    const jugadoresAjustados = jugadores.map(jugador => {
        let puntajeAjustado = jugador.puntaje < 4 ? jugador.puntaje + 2 : jugador.puntaje;
        return { ...jugador, puntaje: puntajeAjustado };
    });

    // Ordena los jugadores ajustados por puntaje y luego por intentos
    jugadoresAjustados.sort((a, b) => {
        if (b.puntaje === a.puntaje) {
            return a.intentos - b.intentos; // Ordena por menor cantidad de intentos si el puntaje es igual
        }
        return b.puntaje - a.puntaje; // Ordena por mayor puntaje primero
    });

    const top10Jugadores = jugadoresAjustados.slice(0, 10); // Obtener los 10 mejores jugadores

    let listaJugadores = "Top 10 Jugadores:\n";
    top10Jugadores.forEach((jugador, index) => {
        listaJugadores += `${index + 1}. ${jugador.nombre} - Puntaje: ${jugador.puntaje}, Intentos: ${jugador.intentos}\n`;
    });

    document.getElementById("mejoresJugadores").innerText = listaJugadores; // Mostrar la lista en el DOM
}

// Función que inicia el cuestionario
function iniciarQuiz(nombre, edad) {
    let intentos = 0;  // Inicia los intentos en 0
    let puntaje; // Variable que almacenará el puntaje obtenido

    // Función que maneja el cuestionario
    const quiz = () => {
        intentos++; // Incrementa los intentos en cada intento
        puntaje = 0; // Inicia el puntaje en 0
        let preguntasIncorrectas = []; // Array que almacena ls preguntas incorrectas

        // Array de las preguntas y sus respuestas 
        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 4 },
            { pregunta: "¿Cuántos lados tiene un hexágono?", respuestaCorrecta: 6 },
            { pregunta: "¿Cuánto es 7 * 7?", respuestaCorrecta: 49 },
            { pregunta: "¿Cuántas Copas del Mundo tiene Argentina?", respuestaCorrecta: 3 },
        ];

        const preguntasContainer = document.getElementById("preguntas"); // Obtiene el div de las preguntas
        preguntasContainer.innerHTML = ""; // Limpia contenido previo

        // Crea input para cada pregunta
        preguntas.forEach((pregunta, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${pregunta.pregunta}</p>
                <input type="number" id="respuesta${index}">
            `;
            preguntasContainer.appendChild(div); // Agrega el div(hijo) al div de preguntas
        });

        // Crea botón para enviar las respuestas
        const submitButton = document.createElement("button");
        submitButton.innerText = "Enviar Respuestas"; // Texto del botón
        submitButton.addEventListener("click", function () {
            // Verifica respuesta usuario
            preguntas.forEach((pregunta, index) => {
                const respuestaUsuario = Number(document.getElementById(`respuesta${index}`).value); // Convierte la respuesta a número
                if (respuestaUsuario === pregunta.respuestaCorrecta) {
                    puntaje += 2; // Incrementa 2 puntos si la pregunta es correcta
                } else {
                    preguntasIncorrectas.push(pregunta.pregunta); // Almacena la pregunta si la respuesta es incorrecta
                }
            });

            // Muestra los resultados al usuario
            mostrarResultados(puntaje, preguntasIncorrectas);
        });

        preguntasContainer.appendChild(submitButton); // Agrega el botón al div de preguntas 
    };

    // Función que muestra los resultados del cuestionario
    const mostrarResultados = (puntaje, preguntasIncorrectas) => {
        let resultado = `Tu puntaje final es: ${puntaje}/10\n`; // Muestra el puntaje obtenido

        // Verifica si hubo preguntas incorrectas y muestra cuáles
        if (preguntasIncorrectas.length > 0) {
            resultado += "Ups!😵Respondiste incorrectamente algunas preguntas:\n";
            preguntasIncorrectas.forEach(pregunta => {
                resultado += `- ${pregunta}\n`; // Lista de preguntas incorrectas
            });
        } else {
            resultado += "¡Excelente!😃😃😃Respondiste todas las preguntas correctamente.";
        }

        document.getElementById("resultado").innerText = resultado; // Muestra el resultado en el DOM

        const intentarDeNuevoContainer = document.getElementById("intentarDeNuevo");
        intentarDeNuevoContainer.innerHTML = ""; // Limpiar cualquier contenido previo

        // Crea un nuevo jugador con los datos ingresados
        const nuevoJugador = new Jugador(nombre, edad, intentos, puntaje);
        jugadores.push(nuevoJugador); // Agrega el nuevo jugador al Array de jugadores
        localStorage.setItem('jugadores', JSON.stringify(jugadores)); // Guarda los jugadoes en localStorage

        // Si el puntaje es menor a 10 te da la opción (botón) de intentar de nuevo
        if (puntaje < 10) {
            const retryButton = document.createElement("button");
            retryButton.innerText = "Intentar de Nuevo"; // Botón intentar de nuevo
            retryButton.addEventListener("click", quiz); // Asigna la función quiz al botón

            intentarDeNuevoContainer.appendChild(retryButton); // Agrega el botón al contenedor
        }

        mostrarJugadoresOrdenados(); // Muestra lista mejores jugadores
    };

    quiz(); // Llama la función que maneja el cuestionario
}

// Evento para procesar la información enviada a través del formulario
document.getElementById("formularioJugador").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario de envíe de manera tradicional

    const nombre = document.getElementById("nombre").value.trim(); // Obtiene el nombre
    const edad = parseInt(document.getElementById("edad").value.trim(), 10); // Convierte la edad a número

    // Verifica que el nombre cumpla con el patrón: al menos 3 letras y que solo contenga caracteres alfabético, si la validación falla arroja error (ID "saludo") y detiene la función
    if (!/^[A-Za-z]{3,}$/.test(nombre)) {
        document.getElementById("saludo").innerText = "El nombre debe tener al menos 3 letras. Inténtalo de nuevo.";
        return;
    }

    // Verifica que la edad sea mayor a 0 y que sea un N° entero, también arroja error y detiene la función
    if (isNaN(edad) || edad <= 0) {
        document.getElementById("saludo").innerText = "Por favor, ingresá una edad válida. Debe ser un número entero positivo.";
        return;
    }

    // Mensaje de Bienvenida 
    document.getElementById("saludo").innerText = `Hola ${nombre}😊, bienvenido/a al cuestionario!`;
    iniciarQuiz(nombre, edad); // Llama a la función iniciarQuiz
});















