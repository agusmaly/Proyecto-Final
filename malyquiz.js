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

// Recupera datos de jugadores almacenados en el localStorage o inicia con algunos jugadores predeterminados
let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [
    new Jugador("Messi", 37, 4, 10),
    new Jugador("Maradona", 63, 2, 8),
    new Jugador("Sabatini", 54, 3, 6),
    new Jugador("Lucía", 27, 1, 4),
];

// Convierte los jugadores recuperados en instancias de Jugador
jugadores = jugadores.map(jugador => new Jugador(jugador.nombre, jugador.edad, jugador.intentos, jugador.puntaje));

// Función que muestra el top 10 por puntaje e intentos
function mostrarJugadoresOrdenados() {
    const jugadoresAjustados = jugadores.map(jugador => {
        return { ...jugador }; // Elimina los 2 puntos de regalo
    });

    // Ordena los jugadores ajustados por puntaje y luego por intentos
    jugadoresAjustados.sort((a, b) => {
        if (b.puntaje === a.puntaje) {
            return a.intentos - b.intentos;
        }
        return b.puntaje - a.puntaje;
    });

    const top10Jugadores = jugadoresAjustados.slice(0, 10); // Obtener los 10 mejores jugadores

    let listaJugadores = "Top 10 Jugadores:\n";
    top10Jugadores.forEach((jugador, index) => {
        listaJugadores += `${index + 1}. ${jugador.nombre} - Puntaje: ${jugador.puntaje}, Intentos: ${jugador.intentos}\n`;
    });

    document.getElementById("mejoresJugadores").innerText = listaJugadores; // Mostrar la lista en el DOM
}

// Función que obtiene el personaje de la API de Rick and Morty según el puntaje
function obtenerPersonaje(puntaje) {
    let personajeId;

    // Asocia el puntaje al ID del personaje en la API
    switch (puntaje) {
        case 10:
            personajeId = 1; // Rick Sanchez
            break;
        case 8:
            personajeId = 4; // Beth Smith
            break;
        case 6:
            personajeId = 3; // Summer Smith
            break;
        case 4:
            personajeId = 2; // Morty Smith
            break;
        case 2:
            personajeId = 5; // Jerry Smith
            break;
        default:
            personajeId = 20; // Ants in my Eyes Johnson
            break;
    }

    // Realiza la solicitud a la API de Rick and Morty
    return fetch(`https://rickandmortyapi.com/api/character/${personajeId}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error al obtener el personaje:', error);
        });
}

// Función que inicia el cuestionario
function iniciarQuiz(nombre, edad) {
    let jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre && jugador.edad === edad);

    // Si el jugador existe, utilizamos sus intentos actuales
    let intentos = jugadorExistente ? jugadorExistente.intentos : 0;
    let puntaje; // Variable que almacenará el puntaje obtenido

    // Función que maneja el cuestionario
    const quiz = () => {
        intentos++; // Incrementa los intentos en cada intento
        puntaje = 0; // Inicia el puntaje en 0
        let preguntasIncorrectas = []; // Array que almacena las preguntas incorrectas

        // Array de las preguntas y sus respuestas 
        const preguntas = [
            { pregunta: "¿Cuántas letras tiene la palabra 'Australopithecus'?", respuestaCorrecta: 16 },
            { pregunta: "¿Cuántos colores tiene la bandera de Sudáfrica?", respuestaCorrecta: 4 }, //la respuesta era 6. contaba ByN como colores.
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
            mostrarResultados(puntaje, preguntasIncorrectas, nombre, edad, intentos);
        });

        preguntasContainer.appendChild(submitButton); // Agrega el botón al div de preguntas 
    };

    quiz(); // Llama la función que maneja el cuestionario
}

// Función que muestra los resultados del cuestionario
const mostrarResultados = (puntaje, preguntasIncorrectas, nombre, edad, intentos) => {
    let resultado = `Tu puntaje final es: ${puntaje}/10\n`; // Muestra el puntaje obtenido

    // Verifica si hubo preguntas incorrectas y muestra cuáles
    if (preguntasIncorrectas.length > 0) {
        resultado += "Respondiste incorrectamente algunas preguntas:\n";
        preguntasIncorrectas.forEach(pregunta => {
            resultado += `- ${pregunta}\n`; // Lista de preguntas incorrectas
        });
    } else {
        resultado += "¡Excelente!😃😃😃 Respondiste todas las preguntas correctamente.\n";
    }

    document.getElementById("resultado").innerText = resultado; // Muestra el resultado en el DOM

    // Obtener el personaje de acuerdo con el puntaje
    obtenerPersonaje(puntaje).then(personaje => {
        // Mostrar la información del personaje en el DOM
        if (personaje) {
            const personajeInfo = `
                Si fueras un personaje de Rick & Morty, serías ${personaje.name}.
                <img src="${personaje.image}" alt="${personaje.name}">
            `;
            document.getElementById("personaje").innerHTML = personajeInfo; // Muestra la info del personaje
        }
    });

    const intentarDeNuevoContainer = document.getElementById("intentarDeNuevo");
    intentarDeNuevoContainer.innerHTML = ""; // Limpia cualquier contenido previo

    // Si el jugador existe, actualizamos sus intentos y puntaje, si no, creamos uno nuevo
    let jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre && jugador.edad === edad);

    if (jugadorExistente) {
        jugadorExistente.intentos = intentos; // Actualiza los intentos del jugador existente
        jugadorExistente.puntaje = puntaje; // Actualiza el puntaje
    } else {
        const nuevoJugador = new Jugador(nombre, edad, intentos, puntaje);
        jugadores.push(nuevoJugador); // Agrega el nuevo jugador al array de jugadores
    }

    localStorage.setItem('jugadores', JSON.stringify(jugadores)); // Guarda los jugadores en localStorage

    // Si el puntaje es menor a 10 te da la opción (botón) de intentar de nuevo
    if (puntaje < 10) {
        const retryButton = document.createElement("button");
        retryButton.innerText = "Intentar de Nuevo"; // Botón intentar de nuevo
        retryButton.addEventListener("click", iniciarQuiz.bind(null, nombre, edad)); // Asigna la función quiz al botón

        intentarDeNuevoContainer.appendChild(retryButton); // Agrega el botón al contenedor
    }

    mostrarJugadoresOrdenados(); // Muestra la lista de mejores jugadores
};


/// Evento para procesar la información enviada a través del formulario
document.getElementById("formularioJugador").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario de envíe de manera tradicional

    const nombre = document.getElementById("nombre").value.trim(); // Obtiene el nombre
    const edad = parseInt(document.getElementById("edad").value.trim(), 10); // Convierte la edad a número

    // Verifica que el nombre tenga al menos 3 letras
    if (nombre.length < 3) {
        Swal.fire({
            imageUrl: 'assets/images.jpeg',
            imageWidth: 300,
            imageHeight: 300,
            title: "nope",
            text: "Tu nombre debe tener al menos 3 letras.",
            background: '#000000',
            color: '#FFFFFF',
            confirmButtonColor: '#FFA500',
        });
        return;
    }

    // Verifica que la edad sea mayor a 0 y que sea un número entero
    if (isNaN(edad) || edad <= 0) {
        Swal.fire({
            imageUrl: 'assets/michaelScott.jpg',
            imageWidth: 300,
            imageHeight: 300,
            title: "upsis",
            text: "Ingresá una edad válida. Debe ser un número entero positivo.",
            background: '#000000',
            color: '#FFFFFF',
            confirmButtonColor: '#FFA500',
        });
        return;
    }

    Swal.fire({
        imageUrl: 'assets/diego.jpg',
        imageWidth: 300,
        imageHeight: 300,
        title: `¡Bienvenido/a ${nombre}!`,
        text: "Estás listo/a para comenzar el cuestionario?",
        background: '#000000',
        color: '#FFFFFF',
        confirmButtonColor: '#FFA500',
    }).then(() => {
        iniciarQuiz(nombre, edad); // Llama a la función iniciarQuiz después de la bienvenida
    });
});


