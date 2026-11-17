const LEVELS = {
  verde: { label: "Fácil", value: 1 },
  amarillo: { label: "Media", value: 2 },
  rojo: { label: "Alta", value: 3 }
};

const cases = [
  {
    id: "t1-pavimento",
    place: "Tramo 1 · Errázuriz / Sotomayor",
    category: "pavimento",
    observed: "rojo",
    perceived: "amarillo",
    geometry: { x1: 90, y1: 110, x2: 420, y2: 110 },
    observedReason: "Baldosas faltantes, fragmentos rotos y pausas en el recorrido; se registraron tropiezos y pequeñas aglomeraciones.",
    perceivedReason: "En el tramo 1 se declaró dificultad media y cansancio; también se mencionó suciedad y falta de lugares limpios para descansar."
  },
  {
    id: "t1-cruce",
    place: "Tramo 1 · Urriola / Blanco",
    category: "cruces",
    observed: "rojo",
    perceived: "amarillo",
    geometry: { x1: 420, y1: 110, x2: 900, y2: 110 },
    observedReason: "Un bache ocupa el cruce peatonal completo; se registraron tropiezos y microfilas durante las luces verdes.",
    perceivedReason: "En este tramo la dificultad declarada fue media y la seguridad baja, lo que obliga a prestar mayor atención al desplazamiento."
  },
  {
    id: "t2-pavimento",
    place: "Tramo 2 · Cochrane / Sotomayor",
    category: "pavimento",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 105, y1: 245, x2: 510, y2: 245 },
    observedReason: "Hoyos, barro y agua interrumpen la superficie; peatones y vehículos modifican su trayectoria para evitarlos.",
    perceivedReason: "Las respuestas del tramo 2 mencionan superficies irregulares, calles en mal estado y una dificultad de 4 sobre 5."
  },
  {
    id: "t2-obstaculos",
    place: "Tramo 2 · Cochrane",
    category: "obstaculos",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 510, y1: 245, x2: 900, y2: 245 },
    observedReason: "La vereda estrecha y los vehículos ocupando el espacio obligan a formar filas o bajar a la calle.",
    perceivedReason: "En el tramo 2 se declaró inseguridad y preocupación por el entorno, junto con dificultad alta para desplazarse."
  },
  {
    id: "t2-cruces",
    place: "Tramo 2 · Cochrane / Sotomayor",
    category: "cruces",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 90, y1: 380, x2: 500, y2: 380 },
    observedReason: "Cruce sin semáforo y poca señalización; las personas deben intuir cuándo cruzar y mantenerse atentas al tránsito.",
    perceivedReason: "Se mencionaron tránsito rápido y pocos cruces peatonales como factores de dificultad y menor seguridad."
  },
  {
    id: "t4-pavimento",
    place: "Tramo 4 · Bustamante / Cochrane",
    category: "pavimento",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 500, y1: 380, x2: 900, y2: 380 },
    observedReason: "Baches con agua hacen que las personas crucen mirando constantemente el piso y avancen con mayor cuidado.",
    perceivedReason: "En el tramo 4 se declaró dificultad 4 sobre 5, baja seguridad y miedo."
  },
  {
    id: "t4-senalizacion",
    place: "Tramo 4 · Cochrane / Clave",
    category: "senalizacion",
    observed: "rojo",
    perceived: "rojo",
    geometry: { x1: 160, y1: 515, x2: 840, y2: 515 },
    observedReason: "El paso peatonal está borroso y se registraron dificultades para orientarse, especialmente en personas mayores con bastón.",
    perceivedReason: "Las respuestas del tramo 4 asocian la experiencia con miedo, ruido, ocupación del espacio y baja seguridad."
  }
];

const observedSvg = document.querySelector("#observedSvg");
const perceivedSvg = document.querySelector("#perceivedSvg");
const overlayObserved = document.querySelector("#overlayObserved");
const overlayPerceived = document.querySelector("#overlayPerceived");
const detailPlace = document.querySelector("#detailPlace");
const observedReason = document.querySelector("#observedReason");
const perceivedReason = document.querySelector("#perceivedReason");
const blendRange = document.querySelector("#blendRange");

let activeFilter = "todos";

function makeSvgLine(item, side, className = "band") {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const g = item.geometry;

  line.setAttribute("x1", g.x1);
  line.setAttribute("y1", g.y1);
  line.setAttribute("x2", g.x2);
  line.setAttribute("y2", g.y2);
  line.setAttribute("class", className);
  line.dataset.id = item.id;
  line.dataset.category = item.category;
  line.dataset.level = item[side];

  return line;
}

function addLabels(svg) {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", "70");
  label.setAttribute("y", "70");
  label.setAttribute("class", "map-label");
  label.textContent = "Barrio Puerto · zona de estudio";
  svg.appendChild(label);
}

function renderPanel(svg, side, interactive = true) {
  svg.innerHTML = "";
  addLabels(svg);

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

  detailPlace.textContent = item.place;
  observedReason.textContent = item.observedReason;
  perceivedReason.textContent = item.perceivedReason;
}

function clearHighlight() {
  document.querySelectorAll(".band").forEach(line => {
    line.classList.remove("is-muted", "is-related", "is-hovered");
  });
  applyFilter();
}

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

function comparisonType(item) {
  const delta = Math.abs(LEVELS[item.observed].value - LEVELS[item.perceived].value);
  if (delta === 0) return "same";
  if (delta === 1) return "near";
  return "far";
}

function renderComparison() {
  const filtered = cases.filter(item => activeFilter === "todos" || item.category === activeFilter);
  const counts = { same: 0, near: 0, far: 0 };

  filtered.forEach(item => counts[comparisonType(item)] += 1);

  document.querySelector("#sameCount").textContent = counts.same;
  document.querySelector("#nearCount").textContent = counts.near;
  document.querySelector("#farCount").textContent = counts.far;

  const list = document.querySelector("#comparisonList");
  list.innerHTML = "";

  filtered.forEach(item => {
    const row = document.createElement("div");
    row.className = "comparison-row";

    const delta = comparisonType(item);
    const deltaText = delta === "same"
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

function updateBlend() {
  const value = Number(blendRange.value);
  const observedOpacity = (100 - value) / 100;
  const perceivedOpacity = value / 100;

  overlayObserved.style.opacity = Math.max(.12, observedOpacity);
  overlayPerceived.style.opacity = Math.max(.12, perceivedOpacity);
}

blendRange.addEventListener("input", updateBlend);

renderPanel(observedSvg, "observed");
renderPanel(perceivedSvg, "perceived");
renderOverlay();
renderComparison();
