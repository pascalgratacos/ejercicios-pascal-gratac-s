const NS = "http://www.w3.org/2000/svg";

const EMOTION_COLORS = {
  entusiasmo: "#00d6c8",
  preocupacion: "#ff8a1f",
  frustracion: "#9f2148"
};

const DIFFICULTY_COLORS = {
  alta: "#ff493f",
  media: "#ffd42c",
  facil: "#4ee66c"
};

const EMOTION_LEVEL = {
  entusiasmo: "Baja",
  preocupacion: "Media",
  frustracion: "Alta"
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
   Solo tres categorías: Entusiasmo / Preocupación / Frustración.
   No se inventa un punto de entusiasmo hasta incorporar una ficha real.
   ========================================================= */

const EMOTIONS = [
  {
    id: "e1",
    x: 315, y: 245,
    emotion: "preocupacion",
    label: "Preocupación",
    difficulty: 4,
    place: "Sotomayor / Cochrane",
    quote: "“Es muy oscuro, me da miedo.”"
  },
  {
    id: "e2",
    x: 640, y: 485,
    emotion: "frustracion",
    label: "Frustración",
    difficulty: 5,
    place: "Serrano / Clave",
    quote: "“Acá roban mucho.”"
  },
  {
    id: "e3",
    x: 805, y: 485,
    emotion: "preocupacion",
    label: "Preocupación",
    difficulty: 4,
    place: "Serrano / San Martín",
    quote: "“Me da miedo.”"
  }
];

/* =========================================================
   PARTE 2 — DIFICULTAD FÍSICA
   Cantidades exactas por filtro.
   ========================================================= */

const DIFFICULTY_SEGMENTS = [
  // PAVIMENTO — 3 rojas, 2 amarillas, 1 verde
  { id:"pav-r1", category:"pavimento", categoryLabel:"Pavimento", level:"alta", place:"Errázuriz · Bustamante–Sotomayor", detail:"Superficie deteriorada que obliga a aumentar la atención al avanzar.", x1:145,y1:615,x2:315,y2:615 },
  { id:"pav-r2", category:"pavimento", categoryLabel:"Pavimento", level:"alta", place:"Blanco · Sotomayor–Urriola", detail:"Pavimento irregular con dificultad alta para mantener un desplazamiento continuo.", x1:315,y1:365,x2:470,y2:365 },
  { id:"pav-r3", category:"pavimento", categoryLabel:"Pavimento", level:"alta", place:"Serrano · Clave–San Martín", detail:"Superficie deteriorada que exige modificar o ralentizar el paso.", x1:640,y1:485,x2:805,y2:485 },
  { id:"pav-y1", category:"pavimento", categoryLabel:"Pavimento", level:"media", place:"Cochrane · Urriola–Clave", detail:"Irregularidades moderadas: el tramo sigue siendo transitable, pero exige atención.", x1:470,y1:245,x2:640,y2:245 },
  { id:"pav-y2", category:"pavimento", categoryLabel:"Pavimento", level:"media", place:"Blanco · San Martín–Almte. Goñi", detail:"Condición intermedia del pavimento, con pequeñas interrupciones en el avance.", x1:805,y1:365,x2:965,y2:365 },
  { id:"pav-g1", category:"pavimento", categoryLabel:"Pavimento", level:"facil", place:"Errázuriz · Almte. Goñi–Almte. Pérez", detail:"Superficie continua y sin dificultad física relevante para el tránsito.", x1:965,y1:615,x2:1080,y2:615 },

  // OBSTÁCULOS — 4 rojas en sector Plaza Sotomayor
  { id:"obs-r1", category:"obstaculos", categoryLabel:"Obstáculos", level:"alta", place:"Plaza Sotomayor · eje norte", detail:"Obstáculos reducen el espacio útil de paso y obligan a ajustar la trayectoria.", x1:315,y1:365,x2:315,y2:245 },
  { id:"obs-r2", category:"obstaculos", categoryLabel:"Obstáculos", level:"alta", place:"Plaza Sotomayor · borde Blanco", detail:"Interferencia alta en el recorrido peatonal dentro del sector de Plaza Sotomayor.", x1:245,y1:365,x2:385,y2:365 },
  { id:"obs-r3", category:"obstaculos", categoryLabel:"Obstáculos", level:"alta", place:"Plaza Sotomayor · eje sur", detail:"Obstáculos obligan a desviarse o reducir significativamente el espacio de circulación.", x1:315,y1:485,x2:315,y2:365 },
  { id:"obs-r4", category:"obstaculos", categoryLabel:"Obstáculos", level:"alta", place:"Plaza Sotomayor · borde Serrano", detail:"Alta presencia de elementos que interrumpen la continuidad del trayecto.", x1:245,y1:485,x2:385,y2:485 },
  { id:"obs-y1", category:"obstaculos", categoryLabel:"Obstáculos", level:"media", place:"Urriola · Blanco–Serrano", detail:"Interferencia parcial: el paso se mantiene, aunque con menor continuidad.", x1:470,y1:485,x2:470,y2:365 },
  { id:"obs-y2", category:"obstaculos", categoryLabel:"Obstáculos", level:"media", place:"Almte. Goñi · Cochrane–Blanco", detail:"Presencia moderada de obstáculos en el espacio de circulación.", x1:965,y1:365,x2:965,y2:245 },
  { id:"obs-g1", category:"obstaculos", categoryLabel:"Obstáculos", level:"facil", place:"Serrano · Clave hacia San Martín", detail:"Tramo despejado, sin obstáculos relevantes para el desplazamiento.", x1:640,y1:485,x2:760,y2:485 },
  { id:"obs-g2", category:"obstaculos", categoryLabel:"Obstáculos", level:"facil", place:"Serrano · San Martín hacia Almte. Goñi", detail:"Paso continuo y despejado en este tramo de calle Serrano.", x1:820,y1:485,x2:950,y2:485 },

  // SEÑALIZACIÓN — 3 rojas, 3 amarillas, 2 verdes
  { id:"sig-r1", category:"senalizacion", categoryLabel:"Señalización", level:"alta", place:"Clave · Blanco–Serrano", detail:"Señalización insuficiente o poco legible para anticipar el recorrido.", x1:640,y1:485,x2:640,y2:365 },
  { id:"sig-r2", category:"senalizacion", categoryLabel:"Señalización", level:"alta", place:"San Martín · Cochrane–Blanco", detail:"Falta de referencias claras para orientar el desplazamiento.", x1:805,y1:365,x2:805,y2:245 },
  { id:"sig-r3", category:"senalizacion", categoryLabel:"Señalización", level:"alta", place:"Almte. Goñi · Serrano–Errázuriz", detail:"Baja legibilidad de la información del entorno en este tramo.", x1:965,y1:615,x2:965,y2:485 },
  { id:"sig-y1", category:"senalizacion", categoryLabel:"Señalización", level:"media", place:"Bustamante · Cochrane–Blanco", detail:"La orientación es posible, aunque requiere mayor atención.", x1:145,y1:365,x2:145,y2:245 },
  { id:"sig-y2", category:"senalizacion", categoryLabel:"Señalización", level:"media", place:"Urriola · Prat–Cochrane", detail:"Referencias parciales: la información existe, pero no es completamente clara.", x1:470,y1:245,x2:470,y2:120 },
  { id:"sig-y3", category:"senalizacion", categoryLabel:"Señalización", level:"media", place:"San Martín · Serrano–Errázuriz", detail:"Señalización intermedia que permite continuar con atención adicional.", x1:805,y1:615,x2:805,y2:485 },
  { id:"sig-g1", category:"senalizacion", categoryLabel:"Señalización", level:"facil", place:"Prat · Almte. Goñi–Almte. Pérez", detail:"Información clara y legible para orientar el tránsito.", x1:965,y1:120,x2:1080,y2:120 },
  { id:"sig-g2", category:"senalizacion", categoryLabel:"Señalización", level:"facil", place:"Errázuriz · Urriola–Clave", detail:"Referencias suficientes para comprender y continuar el recorrido.", x1:470,y1:615,x2:640,y2:615 }
];

let activeFilter = "todas";
let showDifficulty = true;
let showEmotions = false;

const emotionMap = document.querySelector("#emotionMap");
const difficultyMap = document.querySelector("#difficultyMap");
const emotionStage = document.querySelector("#emotionStage");
const difficultyStage = document.querySelector("#difficultyStage");

const emotionTooltip = document.querySelector("#emotionTooltip");
const mapTooltip = document.querySelector("#mapTooltip");

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

function difficultyLabel(level) {
  if (level === "alta") return "Dificultad alta";
  if (level === "media") return "Dificultad media";
  return "Sin dificultad";
}

function createEmotionPoint(item, context = "emotion") {
  const group = svgEl("g");
  group.setAttribute("class", "emotion-point");
  group.dataset.emotion = item.emotion;
  group.dataset.id = item.id;

  const hit = svgEl("circle");
  hit.setAttribute("cx", item.x);
  hit.setAttribute("cy", item.y);
  hit.setAttribute("r", "24");
  hit.setAttribute("class", "emotion-hit");

  const halo = svgEl("circle");
  halo.setAttribute("cx", item.x);
  halo.setAttribute("cy", item.y);
  halo.setAttribute("r", "30");
  halo.setAttribute("class", "emotion-halo");
  halo.setAttribute("fill", emotionFill(item.emotion));

  // Todos parten exactamente con el mismo tamaño base.
  const core = svgEl("circle");
  core.setAttribute("cx", item.x);
  core.setAttribute("cy", item.y);
  core.setAttribute("r", "10");
  core.setAttribute("class", "emotion-core");
  core.setAttribute("fill", emotionFill(item.emotion));

  group.appendChild(hit);
  group.appendChild(halo);
  group.appendChild(core);

  if (context === "emotion") {
    group.addEventListener("mouseenter", event => showEmotionTooltip(event, item));
    group.addEventListener("mousemove", event => moveTooltip(emotionStage, emotionTooltip, event, 250, 150));
    group.addEventListener("mouseleave", () => emotionTooltip.classList.remove("is-visible"));
  } else {
    group.addEventListener("mouseenter", event => showMapEmotionTooltip(event, item));
    group.addEventListener("mousemove", event => moveTooltip(difficultyStage, mapTooltip, event, 250, 150));
    group.addEventListener("mouseleave", hideMapTooltip);
  }

  return group;
}

function renderEmotionMap() {
  emotionMap.innerHTML = "";
  drawBaseMap(emotionMap);

  const pointsLayer = svgEl("g");
  pointsLayer.setAttribute("class", "emotion-layer");

  EMOTIONS.forEach(item => {
    pointsLayer.appendChild(createEmotionPoint(item, "emotion"));
  });

  emotionMap.appendChild(pointsLayer);
}

function showEmotionTooltip(event, item) {
  document.querySelector("#tooltipDot").style.background = emotionFill(item.emotion);
  document.querySelector("#tooltipEmotion").textContent = item.label;
  document.querySelector("#tooltipLevel").textContent = `Intensidad ${EMOTION_LEVEL[item.emotion]}`;
  document.querySelector("#tooltipPlace").textContent = item.place;
  document.querySelector("#tooltipDifficulty").textContent = `Dificultad ${item.difficulty} / 5`;
  document.querySelector("#tooltipQuote").textContent = item.quote;

  emotionTooltip.classList.add("is-visible");
  moveTooltip(emotionStage, emotionTooltip, event, 250, 150);
}

function moveTooltip(stage, tooltipEl, event, tooltipWidth = 250, tooltipHeight = 150) {
  const bounds = stage.getBoundingClientRect();

  let left = event.clientX - bounds.left + 14;
  let top = event.clientY - bounds.top + 14;

  if (left + tooltipWidth > bounds.width - 10) {
    left = event.clientX - bounds.left - tooltipWidth - 14;
  }

  if (top + tooltipHeight > bounds.height - 10) {
    top = event.clientY - bounds.top - tooltipHeight - 14;
  }

  tooltipEl.style.left = `${Math.max(8, left)}px`;
  tooltipEl.style.top = `${Math.max(8, top)}px`;
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

  line.addEventListener("mouseenter", event => showDifficultyTooltip(event, item));
  line.addEventListener("mousemove", event => moveTooltip(difficultyStage, mapTooltip, event, 250, 150));
  line.addEventListener("mouseleave", hideMapTooltip);

  group.appendChild(line);
  return group;
}

function showMapEmotionTooltip(event, item) {
  document.querySelector("#mapTooltipDot").style.background = emotionFill(item.emotion);
  document.querySelector("#mapTooltipTitle").textContent = item.label;
  document.querySelector("#mapTooltipType").textContent = "Emoción";
  document.querySelector("#mapTooltipPlace").textContent = item.place;
  document.querySelector("#mapTooltipLevel").textContent = `Intensidad ${EMOTION_LEVEL[item.emotion]}`;
  document.querySelector("#mapTooltipText").textContent = item.quote;

  mapTooltip.classList.add("is-visible");
  moveTooltip(difficultyStage, mapTooltip, event, 250, 150);
}

function showDifficultyTooltip(event, item) {
  document.querySelector("#mapTooltipDot").style.background = DIFFICULTY_COLORS[item.level];
  document.querySelector("#mapTooltipTitle").textContent = item.categoryLabel;
  document.querySelector("#mapTooltipType").textContent = "Dificultad física";
  document.querySelector("#mapTooltipPlace").textContent = item.place;
  document.querySelector("#mapTooltipLevel").textContent = difficultyLabel(item.level);
  document.querySelector("#mapTooltipText").textContent = item.detail;

  mapTooltip.classList.add("is-visible");
  moveTooltip(difficultyStage, mapTooltip, event, 250, 150);
}

function hideMapTooltip() {
  mapTooltip.classList.remove("is-visible");
}

function renderDifficultyMap() {
  difficultyMap.innerHTML = "";
  drawBaseMap(difficultyMap);

  // Capa 1: dificultad física.
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

  // Capa 2: emociones. Siempre se agrega al final para quedar por encima.
  if (showEmotions) {
    const emotionLayer = svgEl("g");
    emotionLayer.setAttribute("class", "emotion-layer");

    EMOTIONS.forEach(item => {
      emotionLayer.appendChild(createEmotionPoint(item, "combined"));
    });

    difficultyMap.appendChild(emotionLayer);
  }
}

function setFilter(filter) {
  activeFilter = filter;

  document.querySelectorAll(".filter-link").forEach(button => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  hideMapTooltip();
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

    hideMapTooltip();
    renderDifficultyMap();
  });
});

renderEmotionMap();
renderDifficultyMap();
