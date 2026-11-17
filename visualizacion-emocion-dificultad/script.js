const COLORS = {
  frustracion: "#ff665c",
  preocupacion: "#ffbd4a",
  neutralidad: "#9baeb9",
  satisfaccion: "#4dd0bb",
  entusiasmo: "#8deb60"
};

const points = [
  {
    id: "p1",
    place: "Sotomayor / Blanco",
    x: 250,
    y: 180,
    emotion: "preocupacion",
    emotionLabel: "Preocupación",
    emotionFace: "2",
    difficulty: 4,
    difficultyClass: "alta",
    voice: "“Es muy oscuro, me da miedo.”"
  },
  {
    id: "p2",
    place: "Serrano / Clave",
    x: 530,
    y: 180,
    emotion: "frustracion",
    emotionLabel: "Frustración",
    emotionFace: "1",
    difficulty: 5,
    difficultyClass: "alta",
    voice: "“Acá roban mucho.”"
  },
  {
    id: "p3",
    place: "Cochrane / Sotomayor",
    x: 250,
    y: 360,
    emotion: "neutralidad",
    emotionLabel: "Neutralidad",
    emotionFace: "3",
    difficulty: 3,
    difficultyClass: "media",
    voice: "“Acá por el día no hay problema.”"
  },
  {
    id: "p4",
    place: "Cochrane / Clave",
    x: 530,
    y: 360,
    emotion: "preocupacion",
    emotionLabel: "Preocupación",
    emotionFace: "2",
    difficulty: 4,
    difficultyClass: "alta",
    voice: "“Hay que andar con más cuidado por acá.”"
  },
  {
    id: "p5",
    place: "Blanco / Urriola",
    x: 820,
    y: 360,
    emotion: "satisfaccion",
    emotionLabel: "Satisfacción",
    emotionFace: "4",
    difficulty: 2,
    difficultyClass: "facil",
    voice: "“Por acá camino más tranquila.”"
  },
  {
    id: "p6",
    place: "Errázuriz / Sotomayor",
    x: 250,
    y: 545,
    emotion: "neutralidad",
    emotionLabel: "Neutralidad",
    emotionFace: "3",
    difficulty: 3,
    difficultyClass: "media",
    voice: "“Se puede pasar, pero hay que mirar bien.”"
  }
];

const streets = [
  { name: "Blanco", x1: 90, y1: 180, x2: 1100, y2: 180 },
  { name: "Cochrane", x1: 90, y1: 360, x2: 1100, y2: 360 },
  { name: "Errázuriz", x1: 90, y1: 545, x2: 1100, y2: 545 },
  { name: "Sotomayor", x1: 250, y1: 90, x2: 250, y2: 620 },
  { name: "Clave", x1: 530, y1: 90, x2: 530, y2: 620 },
  { name: "Urriola", x1: 820, y1: 90, x2: 820, y2: 620 }
];

const segments = [
  { pointId: "p1", x1: 250, y1: 110, x2: 250, y2: 300 },
  { pointId: "p2", x1: 530, y1: 110, x2: 530, y2: 300 },
  { pointId: "p3", x1: 120, y1: 360, x2: 400, y2: 360 },
  { pointId: "p4", x1: 400, y1: 360, x2: 665, y2: 360 },
  { pointId: "p5", x1: 665, y1: 360, x2: 1030, y2: 360 },
  { pointId: "p6", x1: 120, y1: 545, x2: 410, y2: 545 }
];

function svgEl(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function drawBaseMap(svg) {
  streets.forEach(street => {
    const line = svgEl("line");
    line.setAttribute("x1", street.x1);
    line.setAttribute("y1", street.y1);
    line.setAttribute("x2", street.x2);
    line.setAttribute("y2", street.y2);
    line.setAttribute("class", "base-street");
    svg.appendChild(line);

    const text = svgEl("text");
    const vertical = street.x1 === street.x2;

    text.setAttribute("class", "map-street-label");

    if (vertical) {
      text.setAttribute("x", street.x1 + 16);
      text.setAttribute("y", 650);
      text.setAttribute("transform", `rotate(-90 ${street.x1 + 16} 650)`);
    } else {
      text.setAttribute("x", 95);
      text.setAttribute("y", street.y1 - 15);
    }

    text.textContent = street.name;
    svg.appendChild(text);
  });
}

function showEmotionPoint(point) {
  document.querySelector("#emotionFace").textContent = point.emotionFace;
  document.querySelector("#emotionName").textContent = point.emotionLabel;
  document.querySelector("#emotionName").style.color = COLORS[point.emotion];
  document.querySelector("#emotionLocation").textContent = point.place;
  document.querySelector("#emotionDifficulty").textContent = `${point.difficulty} / 5`;
  document.querySelector("#emotionVoice").textContent = point.voice;
}

function renderEmotionMap() {
  const svg = document.querySelector("#emotionMap");
  svg.innerHTML = "";
  drawBaseMap(svg);

  points.forEach((point, index) => {
    const group = svgEl("g");
    group.setAttribute("class", "emotion-point");
    group.style.animationDelay = `${index * 90}ms`;

    const halo = svgEl("circle");
    const radius = 18 + point.difficulty * 9;
    halo.setAttribute("cx", point.x);
    halo.setAttribute("cy", point.y);
    halo.setAttribute("r", radius);
    halo.setAttribute("class", "emotion-halo");
    halo.setAttribute("fill", COLORS[point.emotion]);

    const core = svgEl("circle");
    core.setAttribute("cx", point.x);
    core.setAttribute("cy", point.y);
    core.setAttribute("r", 9 + point.difficulty * 2.2);
    core.setAttribute("class", "emotion-core");
    core.setAttribute("fill", COLORS[point.emotion]);

    group.appendChild(halo);
    group.appendChild(core);

    group.addEventListener("mouseenter", () => showEmotionPoint(point));
    group.addEventListener("click", () => showEmotionPoint(point));

    svg.appendChild(group);
  });
}

function showVoice(point) {
  const dot = document.querySelector("#voiceEmotionDot");
  dot.style.background = COLORS[point.emotion];

  document.querySelector("#voiceEmotion").textContent = point.emotionLabel;
  document.querySelector("#voiceQuote").textContent = point.voice;
  document.querySelector("#voicePlace").textContent = point.place;
  document.querySelector("#voiceDifficulty").textContent = `${point.difficulty} / 5`;
}

function renderDifficultyMap() {
  const svg = document.querySelector("#difficultyMap");
  svg.innerHTML = "";
  drawBaseMap(svg);

  segments.forEach(segment => {
    const point = points.find(item => item.id === segment.pointId);
    const line = svgEl("line");

    line.setAttribute("x1", segment.x1);
    line.setAttribute("y1", segment.y1);
    line.setAttribute("x2", segment.x2);
    line.setAttribute("y2", segment.y2);
    line.setAttribute("class", "street-data");
    line.dataset.difficulty = point.difficultyClass;

    line.addEventListener("mouseenter", () => showVoice(point));
    line.addEventListener("click", () => showVoice(point));

    svg.appendChild(line);
  });
}

renderEmotionMap();
renderDifficultyMap();
