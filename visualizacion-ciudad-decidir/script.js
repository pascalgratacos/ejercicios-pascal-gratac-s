const steps = [
  {
    index: "01",
    kicker: "PAUSAR",
    title: "El recorrido se detiene.",
    text: "En Sotomayor con Blanco, el deterioro del pavimento obliga a interrumpir el ritmo antes de continuar.",
    value: "2 de 3",
    label: "personas pausaron su recorrido en el punto observado.",
    type: "pause",
    path: "M120 340 H300 Q340 340 350 300 Q360 260 410 260 H480 Q510 260 525 300 Q540 340 590 340 H1080",
    node: { x: 350, y: 300 },
    titlePos: { x: 300, y: 220 },
    caption: "PAUSA"
  },
  {
    index: "02",
    kicker: "ELEGIR",
    title: "La vereda deja de ser una opción.",
    text: "En Serrano, barricadas de hormigón bloquean el paso. Quien avanza debe decidir entre bajar a la calle o cambiar de vereda.",
    value: "60",
    label: "personas en 10 minutos tuvieron que tomar una decisión.",
    type: "detour",
    path: "M120 340 H270 Q310 340 325 385 Q340 430 400 430 H610 Q665 430 690 385 Q715 340 770 340 H1080",
    node: { x: 400, y: 430 },
    titlePos: { x: 300, y: 500 },
    caption: "DESVÍO"
  },
  {
    index: "03",
    kicker: "DUDAR",
    title: "Cruzar exige interpretar.",
    text: "En Serrano con Clave, el paso de cebra casi imperceptible genera incertidumbre sobre dónde cruzar.",
    value: "4 de 15",
    label: "personas esperaron o miraron confundidas dónde cruzar.",
    type: "doubt",
    path: "M120 340 H270 Q310 340 340 305 Q370 270 410 300 Q450 330 485 295 Q520 260 560 300 Q600 340 650 340 H1080",
    node: { x: 485, y: 295 },
    titlePos: { x: 405, y: 220 },
    caption: "DUDA"
  },
  {
    index: "04",
    kicker: "ABANDONAR LA VEREDA",
    title: "El espacio expulsa al peatón.",
    text: "En San Martín con Cochrane, una zanja entre la vereda y la calle hace que algunas personas prefieran seguir por la calzada.",
    value: "2 de 4",
    label: "personas evitaron subir a la vereda y continuaron por la calle.",
    type: "street",
    path: "M120 340 H300 Q350 340 375 390 Q400 440 465 440 H720 Q770 440 795 390 Q820 340 870 340 H1080",
    node: { x: 465, y: 440 },
    titlePos: { x: 410, y: 515 },
    caption: "CALZADA"
  }
];

let currentStep = 0;
let started = false;

const experience = document.querySelector("#experience");
const startButton = document.querySelector("#startButton");
const nextButton = document.querySelector("#nextButton");
const prevButton = document.querySelector("#prevButton");

const storyIndex = document.querySelector("#storyIndex");
const storyKicker = document.querySelector("#storyKicker");
const storyTitle = document.querySelector("#storyTitle");
const storyText = document.querySelector("#storyText");
const dataValue = document.querySelector("#dataValue");
const dataLabel = document.querySelector("#dataLabel");
const stepCounter = document.querySelector("#stepCounter");
const routeMessage = document.querySelector("#routeMessage");
const decisionLayer = document.querySelector("#decisionLayer");

function createSvg(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function renderStep(stepIndex) {
  const step = steps[stepIndex];
  decisionLayer.innerHTML = "";

  const path = createSvg("path");
  path.setAttribute("d", step.path);
  path.setAttribute("class", `decision-path ${step.type}`);
  decisionLayer.appendChild(path);

  const node = createSvg("circle");
  node.setAttribute("cx", step.node.x);
  node.setAttribute("cy", step.node.y);
  node.setAttribute("r", "12");
  node.setAttribute("class", `decision-node ${step.type}`);
  decisionLayer.appendChild(node);

  const title = createSvg("text");
  title.setAttribute("x", step.titlePos.x);
  title.setAttribute("y", step.titlePos.y);
  title.setAttribute("class", "decision-label");
  title.textContent = step.caption;
  decisionLayer.appendChild(title);

  const caption = createSvg("text");
  caption.setAttribute("x", step.titlePos.x);
  caption.setAttribute("y", step.titlePos.y + 24);
  caption.setAttribute("class", "decision-caption");
  caption.textContent = step.kicker.toLowerCase();
  decisionLayer.appendChild(caption);

  storyIndex.textContent = step.index;
  storyKicker.textContent = step.kicker;
  storyTitle.textContent = step.title;
  storyText.textContent = step.text;
  dataValue.textContent = step.value;
  dataLabel.textContent = step.label;

  stepCounter.textContent = `${String(stepIndex + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
  routeMessage.textContent = stepIndex === steps.length - 1
    ? "Avanzar exigió decisiones adicionales."
    : "La trayectoria cambia cuando aparece una nueva condición.";

  prevButton.disabled = stepIndex === 0;
  nextButton.textContent = stepIndex === steps.length - 1
    ? "Volver al inicio ↺"
    : "Siguiente decisión →";
}

function startExperience() {
  started = true;
  currentStep = 0;
  renderStep(currentStep);
  experience.scrollIntoView({ behavior: "smooth", block: "start" });
}

startButton.addEventListener("click", startExperience);

nextButton.addEventListener("click", () => {
  if (!started) {
    startExperience();
    return;
  }

  if (currentStep === steps.length - 1) {
    currentStep = 0;
  } else {
    currentStep += 1;
  }

  renderStep(currentStep);
});

prevButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep(currentStep);
  }
});

document.addEventListener("keydown", event => {
  if (!started) return;

  if (event.key === "ArrowRight") {
    nextButton.click();
  }

  if (event.key === "ArrowLeft") {
    prevButton.click();
  }
});
