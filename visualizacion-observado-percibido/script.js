const LEVELS = {
  verde: { label: "Fácil", value: 1 },
  amarillo: { label: "Media", value: 2 },
  rojo: { label: "Alta", value: 3 }
};

/* =========================================================
   MAPA BASE · solo calles y referencias sutiles
   ========================================================= */

const MAP_VIEWBOX = "0 0 1040 700";

const STREET_MAP = {
  horizontals: [
    { name: "Prat", y: 120, x1: 40, x2: 1000, labelX: 70, labelY: 102 },
    { name: "Cochrane", y: 290, x1: 40, x2: 1000, labelX: 470, labelY: 272 },
    { name: "Blanco", y: 450, x1: 40, x2: 1000, labelX: 470, labelY: 432 },
    { name: "Errázuriz", y: 610, x1: 40, x2: 1000, labelX: 710, labelY: 642 }
  ],
  verticals: [
    { name: "Sotomayor", x: 250, y1: 60, y2: 620, labelX: 235, labelY: 385, rotate: -90 },
    { name: "Sotomayor", x: 405, y1: 60, y2: 620, labelX: 390, labelY: 385, rotate: -90 },
    { name: "Almte. Pérez", x: 590, y1: 60, y2: 620, labelX: 575, labelY: 360, rotate: -90 },
    { name: "Clave", x: 770, y1: 60, y2: 620, labelX: 755, labelY: 390, rotate: -90 },
    { name: "San Martín", x: 950, y1: 60, y2: 620, labelX: 965, labelY: 395, rotate: -90 }
  ],
  landmarks: [
    { name: "Armada de Chile", x: 300, y: 60 },
    { name: "Ascensor Cordillera", x: 690, y: 60 },
    { name: "Plaza Echaurren", x: 915, y: 175 },
    { name: "Monumento Los Héroes", x: 270, y: 520 },
    { name: "Puerto", x: 560, y: 650 },
    { name: "Estación Puerto", x: 110, y: 650 }
  ]
};

/* =========================================================
   DATOS · ahora vinculados a calles reales del mapa
   - growFrom: "start" = desde x1/y1
   - growFrom: "end"   = desde x2/y2
   ========================================================= */

const cases = [
  {
    id: "t1-pavimento",
    place: "Tramo 1 · Errázuriz / Sotomayor",
    category: "pavimento",
    observed: "rojo",
    perceived: "amarillo",
    geometry: { x1: 95, y1: 610, x2: 325, y2: 610, growFrom: "start" },
    observedReason: "Baldosas faltantes, fragmentos rotos y pausas en el recorrido; se registraron tropiezos y pequeñas aglomeraciones.",
    perceivedReason: "En el tramo 1 se declaró dificultad media y cansancio; también se mencionó suciedad y falta de lugares limpios para descansar."
  },
  {
    id: "t1-cruce",
    place: "Tramo 1 · Cruce Sotomayor / Blanco",
    category: "cruces",
    observed: "rojo",
    perceived: "amarillo",
    geometry: { x1: 405, y1: 610, x2: 405, y2: 450, growFrom: "start" },
    observedReason: "Un bache ocupa parte del cruce peatonal; se registraron tropiezos y detenciones antes de cruzar.",
    perceivedReason: "En este tramo la dificultad declarada fue media y la seguridad baja, lo que obliga a prestar mayor atención al desplazamiento."
  },
  {
    id: "t2-pavimento",
    place: "Tramo 2 · Cochrane / Sotomayor",
    category: "pavimento",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 115, y1: 290, x2: 455, y2: 290, growFrom: "start" },
    observedReason: "Hoyos, barro y agua interrumpen la superficie; peatones y vehículos modifican su trayectoria para evitarlos.",
    perceivedReason: "Las respuestas del tramo 2 mencionan superficies irregulares, calles en mal estado y una dificultad de 4 sobre 5."
  },
  {
    id: "t2-obstaculos",
    place: "Tramo 2 · Eje Almte. Pérez",
    category: "obstaculos",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 590, y1: 450, x2: 590, y2: 255, growFrom: "start" },
    observedReason: "La vereda estrecha y los vehículos ocupando el espacio obligan a formar filas o bajar a la calle.",
    perceivedReason: "En el tramo 2 se declaró inseguridad y preocupación por el entorno, junto con dificultad alta para desplazarse."
  },
  {
    id: "t2-cruces",
    place: "Tramo 2 · Cruce Cochrane / Clave",
    category: "cruces",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 770, y1: 450, x2: 770, y2: 290, growFrom: "start" },
    observedReason: "Cruce sin semáforo y con poca señalización; las personas deben intuir cuándo cruzar y mantenerse atentas al tránsito.",
    perceivedReason: "Se mencionaron tránsito rápido y pocos cruces peatonales como factores de dificultad y menor seguridad."
  },
  {
    id: "t4-pavimento",
    place: "Tramo 4 · Blanco / Clave",
    category: "pavimento",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 500, y1: 450, x2: 910, y2: 450, growFrom: "start" },
    observedReason: "Baches con agua hacen que las personas crucen mirando constantemente el piso y avancen con mayor cuidado.",
    perceivedReason: "En el tramo 4 se declaró dificultad 4 sobre 5, baja seguridad y miedo."
  },
  {
    id: "t4-senalizacion",
    place: "Tramo 4 · Errázuriz / Clave",
    category: "senalizacion",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 500, y1: 610, x2: 880, y2: 610, growFrom: "end" },
    observedReason: "El paso peatonal está borroso y se registraron dificultades para orientarse, especialmente en personas mayores con bastón.",
    perceivedReason: "Las respuestas del tramo 4 asocian la experiencia con miedo, ruido, ocupación del espacio y baja seguridad."
  }
];

/* =========================================================
   SELECTORES
   ========================================================= */

const observedSvg = document.querySelector("#observedSvg");
const perceivedSvg = document.querySelector("#perceivedSvg");
const overlayObserved = document.querySelector("#overlayObserved");
const overlayPerceived = document.querySelector("#overlayPerceived");

const detailPlace = document.querySelector("#detailPlace");
const observedReason = document.querySelector("#observedReason");
const perceivedReason = document.querySelector("#perceivedReason");
const blendRange = document.querySelector("#blendRange");

let activeFilter = "todos";

/* =========================================================
   HELPERS SVG
   ========================================================= */

function createSvgElement(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function setSvgBase(svg) {
  svg.setAttribute("viewBox", MAP_VIEWBOX);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
}

function lineLength(g) {
  return Math.hypot(g.x2 - g.x1, g.y2 - g.y1);
}

function normalizedGeometry(geometry) {
  const { x1, y1, x2, y2, growFrom = "start" } = geometry;

  if (growFrom === "end") {
    return { x1: x2, y1: y2, x2: x1, y2: y1 };
  }

  return { x1, y1, x2, y2 };
}

/* =========================================================
   MAPA SUTIL DE FONDO
   ========================================================= */

function drawStreetMap(svg) {
  const group = createSvgElement("g");
  group.setAttribute("class", "street-map");

  STREET_MAP.horizontals.forEach(street => {
    const line = createSvgElement("line");
    line.setAttribute("x1", street.x1);
    line.setAttribute("y1", street.y);
    line.setAttribute("x2", street.x2);
    line.setAttribute("y2", street.y);
    line.setAttribute("class", "street-base");
    group.appendChild(line);

    const text = createSvgElement("text");
    text.setAttribute("x", street.labelX);
    text.setAttribute("y", street.labelY);
    text.setAttribute("class", "street-name");
    text.textContent = street.name;
    group.appendChild(text);
  });

  STREET_MAP.verticals.forEach(street => {
    const line = createSvgElement("line");
    line.setAttribute("x1", street.x);
    line.setAttribute("y1", street.y1);
    line.setAttribute("x2", street.x);
    line.setAttribute("y2", street.y2);
    line.setAttribute("class", "street-base");
    group.appendChild(line);

    const text = createSvgElement("text");
    text.setAttribute("x", street.labelX);
    text.setAttribute("y", street.labelY);
    text.setAttribute("class", "street-name street-name-vertical");
    text.setAttribute("transform", `rotate(${street.rotate}, ${street.labelX}, ${street.labelY})`);
    text.textContent = street.name;
    group.appendChild(text);
  });

  STREET_MAP.landmarks.forEach(point => {
    const text = createSvgElement("text");
    text.setAttribute("x", point.x);
    text.setAttribute("y", point.y);
    text.setAttribute("class", "landmark-label");
    text.textContent = point.name;
    group.appendChild(text);
  });

  svg.appendChild(group);
}

function addAreaLabel(svg) {
  const label = createSvgElement("text");
  label.setAttribute("x", "70");
  label.setAttribute("y", "80");
  label.setAttribute("class", "map-label");
  label.textContent = "Barrio Puerto · zona de estudio";
  svg.appendChild(label);
}

/* =========================================================
   BANDAS DE COLOR
   ========================================================= */

function makeSvgLine(item, side, className = "band") {
  const line = createSvgElement("line");
  const g = normalizedGeometry(item.geometry);
  const length = lineLength(g);

  line.setAttribute("x1", g.x1);
  line.setAttribute("y1", g.y1);
  line.setAttribute("x2", g.x2);
  line.setAttribute("y2", g.y2);
  line.setAttribute("class", className);

  line.dataset.id = item.id;
  line.dataset.category = item.category;
  line.dataset.level = item[side];

  line.style.setProperty("--line-length", length);
  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;
  line.style.animationDelay = "0.15s";

  return line;
}

/* =========================================================
   RENDER PRINCIPAL
   ========================================================= */

function renderPanel(svg, side, interactive = true) {
  svg.innerHTML = "";
  setSvgBase(svg);
  drawStreetMap(svg);
  addAreaLabel(svg);

  cases.forEach(item => {
    const line = makeSvgLine(item, side);
    svg.appendChild(line);

    if (interactive) {
      line.addEventListener("mouseenter", () => highlightCase(item.id));
      line.addEventListener("mouseleave", clearHighlight);
    }
  });

  applyFilter();
}

function renderOverlay() {
  renderPanel(overlayObserved, "observed", false);
  renderPanel(overlayPerceived, "perceived", false);
  updateBlend();
}

/* =========================================================
   HIGHLIGHT / DETALLE
   ========================================================= */

function highlightCase(id) {
  const item = cases.find(entry => entry.id === id);
  if (!item) return;

  document.querySelectorAll(".band").forEach(line => {
    if (line.dataset.id === id) {
      line.classList.add("is-related");
      line.classList.remove("is-muted");
    } else {
      line.classList.add("is-muted");
      line.classList.remove("is-related");
    }
  });

  if (detailPlace) detailPlace.textContent = item.place;
  if (observedReason) observedReason.textContent = item.observedReason;
  if (perceivedReason) perceivedReason.textContent = item.perceivedReason;
}

function clearHighlight() {
  document.querySelectorAll(".band").forEach(line => {
    line.classList.remove("is-muted", "is-related", "is-hovered");
  });
  applyFilter();
}

/* =========================================================
   FILTROS
   ========================================================= */

function applyFilter() {
  document.querySelectorAll(".band").forEach(line => {
    const match = activeFilter === "todos" || line.dataset.category === activeFilter;
    line.style.opacity = match ? "" : ".08";
  });
}

function setFilter(filter) {
  activeFilter = filter;

  document.querySelectorAll(".filter-link").forEach(link => {
    link.classList.toggle("is-active", link.dataset.filter === filter);
  });

  applyFilter();
  renderComparison();
}

document.querySelectorAll(".filter-link").forEach(link => {
  link.addEventListener("mouseenter", () => setFilter(link.dataset.filter));
  link.addEventListener("focus", () => setFilter(link.dataset.filter));
  link.addEventListener("click", () => setFilter(link.dataset.filter));
});

/* =========================================================
   COMPARACIÓN
   ========================================================= */

function comparisonType(item) {
  const delta = Math.abs(LEVELS[item.observed].value - LEVELS[item.perceived].value);
  if (delta === 0) return "same";
  if (delta === 1) return "near";
  return "far";
}

function renderComparison() {
  const filtered = cases.filter(item => activeFilter === "todos" || item.category === activeFilter);
  const counts = { same: 0, near: 0, far: 0 };

  filtered.forEach(item => {
    counts[comparisonType(item)] += 1;
  });

  const sameCount = document.querySelector("#sameCount");
  const nearCount = document.querySelector("#nearCount");
  const farCount = document.querySelector("#farCount");

  if (sameCount) sameCount.textContent = counts.same;
  if (nearCount) nearCount.textContent = counts.near;
  if (farCount) farCount.textContent = counts.far;

  const list = document.querySelector("#comparisonList");
  if (!list) return;

  list.innerHTML = "";

  filtered.forEach(item => {
    const row = document.createElement("div");
    row.className = "comparison-row";

    const delta = comparisonType(item);
    const deltaText =
      delta === "same"
        ? "Coinciden"
        : delta === "near"
        ? "Diferencia leve"
        : "Contraste fuerte";

    row.innerHTML = `
      <strong>${item.place}</strong>
      <span class="level-pill level-${item.observed}">${LEVELS[item.observed].label}</span>
      <span class="level-pill level-${item.perceived}">${LEVELS[item.perceived].label}</span>
      <span class="delta-label">${deltaText}</span>
    `;

    row.addEventListener("mouseenter", () => highlightCase(item.id));
    row.addEventListener("mouseleave", clearHighlight);

    list.appendChild(row);
  });
}

/* =========================================================
   SUPERPOSICIÓN
   ========================================================= */

function updateBlend() {
  if (!blendRange) return;

  const value = Number(blendRange.value);
  const observedOpacity = (100 - value) / 100;
  const perceivedOpacity = value / 100;

  overlayObserved.style.opacity = Math.max(0.12, observedOpacity);
  overlayPerceived.style.opacity = Math.max(0.12, perceivedOpacity);
}

if (blendRange) {
  blendRange.addEventListener("input", updateBlend);
}

/* =========================================================
   ESTADO INICIAL
   ========================================================= */

function setDefaultDetail() {
  if (detailPlace) detailPlace.textContent = "Pasa el cursor sobre una franja";
  if (observedReason) observedReason.textContent = "Aquí aparecerá la observación del entorno.";
  if (perceivedReason) perceivedReason.textContent = "Aquí aparecerá la percepción declarada por las personas.";
}

setDefaultDetail();
renderPanel(observedSvg, "observed");
renderPanel(perceivedSvg, "perceived");
renderOverlay();
renderComparison();
updateBlend();
