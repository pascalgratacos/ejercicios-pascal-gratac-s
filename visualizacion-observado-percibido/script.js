const COLORS = {
  verde: "#6f9a67",
  amarillo: "#e2bd45",
  rojo: "#c94c42"
};

/*
  EDITA AQUÍ LAS COORDENADAS DE LAS FRANJAS.

  x1, y1 = inicio
  x2, y2 = final

  El SVG usa un sistema de 1000 x 620.
  Cada franja se dibuja desde ambos extremos hacia el centro.
*/
const bands = {
  observado: [
    { x1: 92,  y1: 105, x2: 360, y2: 105, nivel: "verde",    categoria: "pavimento",    titulo: "Pavimento continuo", detalle: "Desplazamiento observado sin interrupciones." },
    { x1: 360, y1: 105, x2: 610, y2: 105, nivel: "amarillo", categoria: "pavimento",    titulo: "Superficie irregular", detalle: "Requiere mayor atención durante el avance." },
    { x1: 610, y1: 105, x2: 905, y2: 105, nivel: "rojo",     categoria: "pavimento",    titulo: "Deterioro visible", detalle: "Se observan interrupciones y cambios de trayectoria." },

    { x1: 72,  y1: 195, x2: 300, y2: 195, nivel: "amarillo", categoria: "obstaculos",   titulo: "Obstáculos aislados", detalle: "El espacio útil de circulación disminuye." },
    { x1: 300, y1: 195, x2: 580, y2: 195, nivel: "rojo",     categoria: "obstaculos",   titulo: "Obstáculos frecuentes", detalle: "La continuidad del recorrido se ve afectada." },
    { x1: 580, y1: 195, x2: 930, y2: 195, nivel: "verde",    categoria: "obstaculos",   titulo: "Paso despejado", detalle: "Se mantiene una trayectoria directa." },

    { x1: 105, y1: 288, x2: 405, y2: 288, nivel: "rojo",     categoria: "cruces",       titulo: "Cruce complejo", detalle: "Mayor exposición y dificultad para completar el cruce." },
    { x1: 405, y1: 288, x2: 645, y2: 288, nivel: "amarillo", categoria: "cruces",       titulo: "Cruce intermedio", detalle: "Exige atención adicional." },
    { x1: 645, y1: 288, x2: 890, y2: 288, nivel: "verde",    categoria: "cruces",       titulo: "Cruce legible", detalle: "Condiciones más claras para continuar." },

    { x1: 118, y1: 492, x2: 390, y2: 492, nivel: "amarillo", categoria: "senalizacion", titulo: "Orientación parcial", detalle: "Las referencias existen, pero no son siempre claras." },
    { x1: 390, y1: 492, x2: 640, y2: 492, nivel: "rojo",     categoria: "senalizacion", titulo: "Poca referencia", detalle: "Se dificulta anticipar o comprender el recorrido." },
    { x1: 640, y1: 492, x2: 875, y2: 492, nivel: "verde",    categoria: "senalizacion", titulo: "Referencia clara", detalle: "La información facilita la orientación." }
  ],

  percibido: [
    { x1: 210, y1: 58,  x2: 210, y2: 270, nivel: "verde",    categoria: "pavimento",    titulo: "Se percibe fácil", detalle: "El recorrido fue descrito como continuo o cómodo." },
    { x1: 210, y1: 270, x2: 210, y2: 558, nivel: "amarillo", categoria: "pavimento",    titulo: "Dificultad media percibida", detalle: "El recorrido exige atención, pero sigue siendo transitable." },

    { x1: 365, y1: 72,  x2: 365, y2: 300, nivel: "rojo",     categoria: "obstaculos",   titulo: "Se percibe difícil", detalle: "La experiencia declarada indica alta dificultad." },
    { x1: 365, y1: 300, x2: 365, y2: 566, nivel: "amarillo", categoria: "obstaculos",   titulo: "Dificultad media percibida", detalle: "La percepción cambia a lo largo del recorrido." },

    { x1: 520, y1: 52,  x2: 520, y2: 250, nivel: "amarillo", categoria: "cruces",       titulo: "Cruce percibido con cautela", detalle: "Se reporta atención adicional." },
    { x1: 520, y1: 250, x2: 520, y2: 570, nivel: "rojo",     categoria: "cruces",       titulo: "Cruce percibido como difícil", detalle: "Aumenta la sensación de dificultad." },

    { x1: 820, y1: 62,  x2: 820, y2: 285, nivel: "amarillo", categoria: "senalizacion", titulo: "Orientación intermedia", detalle: "La lectura del espacio no es completamente clara." },
    { x1: 820, y1: 285, x2: 820, y2: 540, nivel: "verde",    categoria: "senalizacion", titulo: "Orientación favorable", detalle: "Se percibe claridad suficiente para continuar." }
  ]
};

const modeContent = {
  observado: {
    kicker: "Capa 01",
    title: "Condiciones observadas",
    description: "Registros visibles del entorno levantados durante el recorrido.",
    reading: "Lo observado reúne condiciones físicas y sensoriales registradas en terreno. Las franjas muestran dónde el entorno facilita, exige atención o dificulta el tránsito."
  },
  percibido: {
    kicker: "Capa 02",
    title: "Experiencia percibida",
    description: "Cómo las personas interpretan y valoran esas mismas calles.",
    reading: "Lo percibido muestra la experiencia declarada por las personas. Una calle puede sentirse distinta a lo que sus condiciones físicas sugieren."
  },
  superponer: {
    kicker: "Capa 03",
    title: "Coincidencias y diferencias",
    description: "Dos lecturas del mismo territorio aparecen al mismo tiempo.",
    reading: "Al superponer ambas capas aparecen coincidencias, contradicciones y zonas donde la dificultad se acumula. La superposición es el argumento principal de esta visualización."
  }
};

const observedLayer = document.querySelector("#observedLayer");
const perceivedLayer = document.querySelector("#perceivedLayer");
const mapFrame = document.querySelector("#mapFrame");
const tooltip = document.querySelector("#tooltip");

let activeView = "observado";
let activeFilter = "todos";

function createLineHalf(x1, y1, x2, y2, item, layerName, delay) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("pathLength", "100");
  line.setAttribute("class", "data-band");
  line.style.animationDelay = `${delay}ms`;

  line.dataset.level = item.nivel;
  line.dataset.category = item.categoria;
  line.dataset.layer = layerName;
  line.dataset.title = item.titulo;
  line.dataset.detail = item.detalle;

  line.addEventListener("mouseenter", showTooltip);
  line.addEventListener("mousemove", moveTooltip);
  line.addEventListener("mouseleave", hideTooltip);

  return line;
}

function createBand(item, layerName, index) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("class", "band-pair");

  const midX = (item.x1 + item.x2) / 2;
  const midY = (item.y1 + item.y2) / 2;
  const delay = Math.min(index * 55, 420);

  const firstHalf = createLineHalf(
    item.x1, item.y1,
    midX, midY,
    item, layerName, delay
  );

  const secondHalf = createLineHalf(
    item.x2, item.y2,
    midX, midY,
    item, layerName, delay
  );

  group.appendChild(firstHalf);
  group.appendChild(secondHalf);

  return group;
}

function renderBands() {
  observedLayer.innerHTML = "";
  perceivedLayer.innerHTML = "";

  bands.observado
    .filter(matchesFilter)
    .forEach((item, index) => observedLayer.appendChild(createBand(item, "observado", index)));

  bands.percibido
    .filter(matchesFilter)
    .forEach((item, index) => perceivedLayer.appendChild(createBand(item, "percibido", index)));

  observedLayer.setAttribute("class", "layer-observado");
  perceivedLayer.setAttribute("class", "layer-percibido");

  const showObserved = activeView === "observado" || activeView === "superponer";
  const showPerceived = activeView === "percibido" || activeView === "superponer";

  observedLayer.style.display = showObserved ? "block" : "none";
  perceivedLayer.style.display = showPerceived ? "block" : "none";

  mapFrame.classList.toggle("is-superposed", activeView === "superponer");
}

function matchesFilter(item) {
  return activeFilter === "todos" || item.categoria === activeFilter;
}

function setView(view) {
  activeView = view;

  document.querySelectorAll(".view-button").forEach(button => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });

  const content = modeContent[view];
  document.querySelector("#modeKicker").textContent = content.kicker;
  document.querySelector("#modeTitle").textContent = content.title;
  document.querySelector("#modeDescription").textContent = content.description;
  document.querySelector("#readingText").textContent = content.reading;

  renderBands();
}

function setFilter(filter) {
  activeFilter = filter;

  document.querySelectorAll(".filter-button").forEach(button => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  renderBands();
}

function showTooltip(event) {
  const target = event.currentTarget;
  tooltip.innerHTML = `<strong>${target.dataset.title}</strong><br>${target.dataset.detail}`;
  tooltip.classList.add("is-visible");
}

function moveTooltip(event) {
  const bounds = mapFrame.getBoundingClientRect();
  tooltip.style.left = `${event.clientX - bounds.left}px`;
  tooltip.style.top = `${event.clientY - bounds.top}px`;
}

function hideTooltip() {
  tooltip.classList.remove("is-visible");
}

document.querySelectorAll(".view-button").forEach(button => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

renderBands();
