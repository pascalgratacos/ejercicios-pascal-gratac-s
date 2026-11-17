const NS = "http://www.w3.org/2000/svg";

const EMOTION_COLORS = {
  frustracion: "#ff645b",
  preocupacion: "#ffbd45",
  neutralidad: "#9eafba",
  satisfaccion: "#43d0b5",
  entusiasmo: "#8bea62"
};

/* =========================================================
   MAPA BASE — MISMA GEOMETRÍA EN AMBAS PARTES
   ========================================================= */

const STREETS = [
  { name: "Prat", x1: 70, y1: 120, x2: 1125, y2: 120, major: true },
  { name: "Cochrane", x1: 70, y1: 245, x2: 1125, y2: 245, major: true },
  { name: "Blanco", x1: 70, y1: 365, x2: 1125, y2: 365, major: true },
  { name: "Serrano", x1: 70, y1: 485, x2: 1125, y2: 485, major: true },
  { name: "Errázuriz", x1: 70, y1: 615, x2: 1125, y2: 615, major: true },

  { name: "Bustamante", x1: 145, y1: 70, x2: 145, y2: 665, major: false },
  { name: "Sotomayor", x1: 315, y1: 70, x2: 315, y2: 665, major: true },
  { name: "Urriola", x1: 470, y1: 70, x2: 470, y2: 665, major: false },
  { name: "Clave", x1: 640, y1: 70, x2: 640, y2: 665, major: true },
  { name: "San Martín", x1: 805, y1: 70, x2: 805, y2: 665, major: false },
  { name: "Almte. Goñi", x1: 965, y1: 70, x2: 965, y2: 665, major: false },
  { name: "Almte. Pérez", x1: 1080, y1: 70, x2: 1080, y2: 665, major: false },

  { name: "Pasaje Ross", x1: 225, y1: 180, x2: 405, y2: 180, major: false },
  { name: "Lord Cochrane", x1: 730, y1: 305, x2: 1035, y2: 305, major: false },
  { name: "Carampangue", x1: 860, y1: 545, x2: 1120, y2: 545, major: false }
];

const LANDMARKS = [
  { name: "Armada de Chile", x: 255, y: 80 },
  { name: "Plaza Sotomayor", x: 335, y: 325 },
  { name: "Monumento a los Héroes de Iquique", x: 335, y: 405 },
  { name: "Ascensor Cordillera", x: 655, y: 86 },
  { name: "Plaza Echaurren", x: 900, y: 190 },
  { name: "Estación Puerto", x: 175, y: 690 },
  { name: "Puerto", x: 565, y: 700 }
];

/* =========================================================
   PARTE 1 — EMOCIONALIDAD
   Citas: solo se muestran al hacer hover.
   ========================================================= */

const EMOTIONS = [
  {
    id: "e1",
    x: 315, y: 245,
    emotion: "preocupacion",
    label: "Preocupación",
    intensity: 3,
    difficulty: 4,
    place: "Sotomayor / Cochrane",
    quote: "“Es muy oscuro, me da miedo.”"
  },
  {
    id: "e2",
    x: 640, y: 485,
    emotion: "frustracion",
    label: "Frustración",
    intensity: 3,
    difficulty: 5,
    place: "Serrano / Clave",
    quote: "“Acá roban mucho.”"
  },
  {
    id: "e3",
    x: 470, y: 365,
    emotion: "neutralidad",
    label: "Neutralidad",
    intensity: 1,
    difficulty: 2,
    place: "Blanco / Urriola",
    quote: "“Acá por el día no hay problema.”"
  },
  {
    id: "e4",
    x: 805, y: 485,
    emotion: "preocupacion",
    label: "Preocupación",
    intensity: 2,
    difficulty: 4,
    place: "Serrano / San Martín",
    quote: "“Me da miedo.”"
  }
];

/* =========================================================
   PARTE 2 — DIFICULTAD FÍSICA
   Cantidades exactas por filtro según especificación.
   ========================================================= */

const DIFFICULTY_SEGMENTS = [
  // PAVIMENTO — 3 rojas, 2 amarillas, 1 verde
  { id:"pav-r1", category:"pavimento", level:"alta", x1:145,y1:615,x2:315,y2:615 },
  { id:"pav-r2", category:"pavimento", level:"alta", x1:315,y1:365,x2:470,y2:365 },
  { id:"pav-r3", category:"pavimento", level:"alta", x1:640,y1:485,x2:805,y2:485 },
  { id:"pav-y1", category:"pavimento", level:"media", x1:470,y1:245,x2:640,y2:245 },
  { id:"pav-y2", category:"pavimento", level:"media", x1:805,y1:365,x2:965,y2:365 },
  { id:"pav-g1", category:"pavimento", level:"facil", x1:965,y1:615,x2:1080,y2:615 },

  // OBSTÁCULOS — 4 rojas en sector Plaza Sotomayor
  { id:"obs-r1", category:"obstaculos", level:"alta", x1:315,y1:245,x2:315,y2:365 },
  { id:"obs-r2", category:"obstaculos", level:"alta", x1:245,y1:365,x2:385,y2:365 },
  { id:"obs-r3", category:"obstaculos", level:"alta", x1:315,y1:365,x2:315,y2:485 },
  { id:"obs-r4", category:"obstaculos", level:"alta", x1:245,y1:485,x2:385,y2:485 },
  // 2 amarillas
  { id:"obs-y1", category:"obstaculos", level:"media", x1:470,y1:365,x2:470,y2:485 },
  { id:"obs-y2", category:"obstaculos", level:"media", x1:965,y1:245,x2:965,y2:365 },
  // 2 verdes ubicadas en calle Serrano
  { id:"obs-g1", category:"obstaculos", level:"facil", x1:640,y1:485,x2:760,y2:485 },
  { id:"obs-g2", category:"obstaculos", level:"facil", x1:820,y1:485,x2:950,y2:485 },

  // SEÑALIZACIÓN — 3 rojas, 3 amarillas, 2 verdes
  { id:"sig-r1", category:"senalizacion", level:"alta", x1:640,y1:365,x2:640,y2:485 },
  { id:"sig-r2", category:"senalizacion", level:"alta", x1:805,y1:245,x2:805,y2:365 },
  { id:"sig-r3", category:"senalizacion", level:"alta", x1:965,y1:485,x2:965,y2:615 },
  { id:"sig-y1", category:"senalizacion", level:"media", x1:145,y1:245,x2:145,y2:365 },
  { id:"sig-y2", category:"senalizacion", level:"media", x1:470,y1:120,x2:470,y2:245 },
  { id:"sig-y3", category:"senalizacion", level:"media", x1:805,y1:485,x2:805,y2:615 },
  { id:"sig-g1", category:"senalizacion", level:"facil", x1:965,y1:120,x2:1080,y2:120 },
  { id:"sig-g2", category:"senalizacion", level:"facil", x1:470,y1:615,x2:640,y2:615 }
];

let activeFilter = "todas";
let showDifficulty = true;
let showEmotions = false;

const emotionMap = document.querySelector("#emotionMap");
const difficultyMap = document.querySelector("#difficultyMap");
const emotionStage = document.querySelector("#emotionStage");
const tooltip = document.querySelector("#emotionTooltip");

function svgEl(tag) {
  return document.createElementNS(NS, tag);
}

function drawBaseMap(svg) {
  const streetGroup = svgEl("g");
  streetGroup.setAttribute("class", "street-base-layer");

  STREETS.forEach(street => {
    const line = svgEl("line");
    line.setAttribute("x1", street.x1);
    line.setAttribute("y1", street.y1);
    line.setAttribute("x2", street.x2);
    line.setAttribute("y2", street.y2);
    line.setAttribute("class", street.major ? "base-street" : "base-street secondary");
    streetGroup.appendChild(line);

    const text = svgEl("text");
    text.setAttribute("class", "street-label");

    const vertical = street.x1 === street.x2;
    if (vertical) {
      const tx = street.x1 + 13;
      const ty = 650;
      text.setAttribute("x", tx);
      text.setAttribute("y", ty);
      text.setAttribute("transform", `rotate(-90 ${tx} ${ty})`);
    } else {
      text.setAttribute("x", street.x1 + 8);
      text.setAttribute("y", street.y1 - 12);
    }

    text.textContent = street.name;
    streetGroup.appendChild(text);
  });

  svg.appendChild(streetGroup);

  const landmarkGroup = svgEl("g");
  landmarkGroup.setAttribute("class", "landmark-layer");

  LANDMARKS.forEach(mark => {
    const circle = svgEl("circle");
    circle.setAttribute("cx", mark.x);
    circle.setAttribute("cy", mark.y);
    circle.setAttribute("r", "3.5");
    circle.setAttribute("class", "landmark-mark");
    landmarkGroup.appendChild(circle);

    const text = svgEl("text");
    text.setAttribute("x", mark.x + 8);
    text.setAttribute("y", mark.y - 7);
    text.setAttribute("class", "landmark-label");
    text.textContent = mark.name;
    landmarkGroup.appendChild(text);
  });

  svg.appendChild(landmarkGroup);
}

function emotionFill(emotion) {
  return EMOTION_COLORS[emotion] || "#ffffff";
}

function createEmotionPoint(item, compact = false) {
  const group = svgEl("g");
  group.setAttribute("class", "emotion-point");
  group.dataset.intensity = String(item.intensity);
  group.dataset.id = item.id;

  const halo = svgEl("circle");
  halo.setAttribute("cx", item.x);
  halo.setAttribute("cy", item.y);
  halo.setAttribute("r", item.intensity === 1 ? 24 : item.intensity === 2 ? 32 : 42);
  halo.setAttribute("class", "emotion-halo");
  halo.setAttribute("fill", emotionFill(item.emotion));

  const core = svgEl("circle");
  core.setAttribute("cx", item.x);
  core.setAttribute("cy", item.y);
  core.setAttribute("r", compact ? "8" : "10");
  core.setAttribute("class", "emotion-core");
  core.setAttribute("fill", emotionFill(item.emotion));

  group.appendChild(halo);
  group.appendChild(core);

  if (!compact) {
    group.addEventListener("mouseenter", event => showEmotionTooltip(event, item));
    group.addEventListener("mousemove", moveEmotionTooltip);
    group.addEventListener("mouseleave", hideEmotionTooltip);
  }

  return group;
}

function renderEmotionMap() {
  emotionMap.innerHTML = "";
  drawBaseMap(emotionMap);

  const pointsLayer = svgEl("g");
  pointsLayer.setAttribute("class", "emotion-layer");

  EMOTIONS.forEach(item => {
    pointsLayer.appendChild(createEmotionPoint(item));
  });

  emotionMap.appendChild(pointsLayer);
}

function showEmotionTooltip(event, item) {
  document.querySelector("#tooltipDot").style.background = emotionFill(item.emotion);
  document.querySelector("#tooltipEmotion").textContent = item.label;
  document.querySelector("#tooltipLevel").textContent = `Nivel ${item.intensity}`;
  document.querySelector("#tooltipPlace").textContent = item.place;
  document.querySelector("#tooltipDifficulty").textContent = `Dificultad ${item.difficulty} / 5`;
  document.querySelector("#tooltipQuote").textContent = item.quote;

  tooltip.classList.add("is-visible");
  moveEmotionTooltip(event);
}

function moveEmotionTooltip(event) {
  const bounds = emotionStage.getBoundingClientRect();
  const tooltipWidth = 250;
  const tooltipHeight = 150;

  let left = event.clientX - bounds.left + 14;
  let top = event.clientY - bounds.top + 14;

  if (left + tooltipWidth > bounds.width - 10) {
    left = event.clientX - bounds.left - tooltipWidth - 14;
  }

  if (top + tooltipHeight > bounds.height - 10) {
    top = event.clientY - bounds.top - tooltipHeight - 14;
  }

  tooltip.style.left = `${Math.max(8, left)}px`;
  tooltip.style.top = `${Math.max(8, top)}px`;
}

function hideEmotionTooltip() {
  tooltip.classList.remove("is-visible");
}

function segmentLength(segment) {
  return Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1);
}

function createDifficultyLine(item, index) {
  const group = svgEl("g");
  group.setAttribute("class", "difficulty-line-group");
  group.dataset.category = item.category;

  const line = svgEl("line");
  line.setAttribute("x1", item.x1);
  line.setAttribute("y1", item.y1);
  line.setAttribute("x2", item.x2);
  line.setAttribute("y2", item.y2);
  line.setAttribute("class", "difficulty-line");
  line.dataset.level = item.level;

  const length = segmentLength(item);
  line.style.setProperty("--segment-length", length);
  line.style.animationDelay = `${Math.min(index * 55, 480)}ms`;

  group.appendChild(line);
  return group;
}

function renderDifficultyMap() {
  difficultyMap.innerHTML = "";
  drawBaseMap(difficultyMap);

  // Capa 1: dificultad. Siempre se dibuja antes.
  const difficultyLayer = svgEl("g");
  difficultyLayer.setAttribute("class", "difficulty-layer");
  difficultyLayer.style.display = showDifficulty ? "" : "none";

  const filtered = DIFFICULTY_SEGMENTS.filter(item => {
    return activeFilter === "todas" || item.category === activeFilter;
  });

  filtered.forEach((item, index) => {
    difficultyLayer.appendChild(createDifficultyLine(item, index));
  });

  difficultyMap.appendChild(difficultyLayer);

  // Capa 2: emociones. Se agrega después para asegurar que siempre quede arriba.
  if (showEmotions) {
    const emotionLayer = svgEl("g");
    emotionLayer.setAttribute("class", "emotion-layer");

    EMOTIONS.forEach(item => {
      emotionLayer.appendChild(createEmotionPoint(item, true));
    });

    difficultyMap.appendChild(emotionLayer);
  }
}

function setFilter(filter) {
  activeFilter = filter;

  document.querySelectorAll(".filter-link").forEach(button => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  renderDifficultyMap();
}

document.querySelectorAll(".filter-link").forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelectorAll(".layer-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const layer = button.dataset.layer;

    if (layer === "difficulty") {
      showDifficulty = !showDifficulty;
      button.classList.toggle("is-active", showDifficulty);
    }

    if (layer === "emotion") {
      showEmotions = !showEmotions;
      button.classList.toggle("is-active", showEmotions);
    }

    renderDifficultyMap();
  });
});

renderEmotionMap();
renderDifficultyMap();
