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

/* Encuestas CL, columna P y Q. Una ficha puede aportar a más de un nivel.
   Los tramos de dificultad son del prototipo previo; no son datos validados.
   Las coordenadas son diagramáticas, no geográficas. */
const EMOTIONS = [
  {
    "id": "cl-4-1",
    "sourceRow": 4,
    "level": 1,
    "label": "Comodidad",
    "difficulty": 5,
    "place": "Serrano y Prat",
    "kind": "sin punto único",
    "quote": "Prefiere caminar desde Serrano a Prat, incluso pasando por Sotomayor, antes que hacer un viaje corto por Cochrane o Blanco."
  },
  {
    "id": "cl-5-1",
    "sourceRow": 5,
    "level": 1,
    "label": "Confianza",
    "difficulty": 4,
    "place": "Sin calle única",
    "kind": "sin punto único",
    "quote": "Prefiere cruces declarados que adivinar por dónde cruzar."
  },
  {
    "id": "cl-6-2",
    "sourceRow": 6,
    "level": 2,
    "label": "Molestia",
    "difficulty": 4,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "Le molesta que las bancas para descansar estén ocupadas por vendedores.",
    "anchor": [
      570,
      245
    ]
  },
  {
    "id": "cl-7-2",
    "sourceRow": 7,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 2,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "Vivió aquí en su juventud y le apenan las condiciones en que se encuentra el Barrio Puerto.",
    "anchor": [
      570,
      365
    ]
  },
  {
    "id": "cl-8-3",
    "sourceRow": 8,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 4,
    "place": "Blanco, Clave, Cochrane y Echaurren",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-9-2",
    "sourceRow": 9,
    "level": 2,
    "label": "Molestia y cansancio",
    "difficulty": 3,
    "place": "Almte. Goñi y Clave",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-10-2",
    "sourceRow": 10,
    "level": 2,
    "label": "Cansancio",
    "difficulty": 4,
    "place": "Almte. Goñi, Clave, Blanco y Cochrane",
    "kind": "sin punto único",
    "quote": "Menciona pocos lugares para descansar"
  },
  {
    "id": "cl-11-3",
    "sourceRow": 11,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 2,
    "place": "Cruces de Sotomayor con Cochrane, Blanco y Serrano",
    "kind": "sin punto único",
    "quote": "Sobre todo se siente insegura al cruzar las calles"
  },
  {
    "id": "cl-12-3",
    "sourceRow": 12,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 3,
    "place": "Almte. Goñi, Clave, Blanco y Cochrane",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-13-3",
    "sourceRow": 13,
    "level": 3,
    "label": "Pena por su estado",
    "difficulty": 1,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      400,
      245
    ]
  },
  {
    "id": "cl-14-3",
    "sourceRow": 14,
    "level": 3,
    "label": "Pena por su estado",
    "difficulty": 2,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      400,
      365
    ]
  },
  {
    "id": "cl-15-1",
    "sourceRow": 15,
    "level": 1,
    "label": "Encanto",
    "difficulty": 1,
    "place": "Serrano",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      400,
      485
    ]
  },
  {
    "id": "cl-16-1",
    "sourceRow": 16,
    "level": 1,
    "label": "Agrado",
    "difficulty": 2,
    "place": "Serrano",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      520,
      485
    ]
  },
  {
    "id": "cl-17-2",
    "sourceRow": 17,
    "level": 2,
    "label": "Costumbre",
    "difficulty": 2,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      720,
      245
    ]
  },
  {
    "id": "cl-18-1",
    "sourceRow": 18,
    "level": 1,
    "label": "Encanto",
    "difficulty": 1,
    "place": "Barrio Puerto",
    "kind": "sin punto único",
    "quote": "Salgo todos los días, me encanta, camino por todas las calles, conozco a los malandrines."
  },
  {
    "id": "cl-19-2",
    "sourceRow": 19,
    "level": 2,
    "label": "Nostalgia y ambivalencia",
    "difficulty": 1,
    "place": "Barrio Puerto · día y noche",
    "kind": "sin punto único",
    "quote": "Me es cómodo, yo bajo del cerro y voy caminando al centro, me voy tranquilo.",
    "interpretation": true
  },
  {
    "id": "cl-20-3",
    "sourceRow": 20,
    "level": 3,
    "label": "Disconformidad y decepción",
    "difficulty": 5,
    "place": "Barrio Puerto",
    "kind": "sin punto único",
    "quote": "Soy un argentino que viene de turista, está todo mal señalizado, las calles están sucias y dejan mucho que desear."
  },
  {
    "id": "cl-21-1",
    "sourceRow": 21,
    "level": 1,
    "label": "Interés por conversar",
    "difficulty": 3,
    "place": "Contexto de entrevista",
    "kind": "contexto",
    "quote": "“En las calles no caben las sillas de rueda.” “Hace falta lugar adecuado para la gente mayor.”"
  },
  {
    "id": "cl-27-2",
    "sourceRow": 27,
    "level": 2,
    "label": "Preocupación",
    "difficulty": 5,
    "place": "Blanco",
    "kind": "mencionada",
    "quote": "“Todas las calles están rotas, Blanco está abandonado, todo destruido, no hay propuestas para el escándalo del patrimonio.”",
    "anchor": [
      730,
      365
    ]
  },
  {
    "id": "cl-29-1",
    "sourceRow": 29,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Serrano",
    "kind": "referencial",
    "quote": "“No tengo ninguna discapacidad, soy buena para caminar, me encanta el Barrio Puerto, en Viña me desespero porque no conozco, soy nacida y criada en Valparaíso.”",
    "anchor": [
      720,
      485
    ]
  },
  {
    "id": "cl-30-1",
    "sourceRow": 30,
    "level": 1,
    "label": "Confianza al conversar",
    "difficulty": 1,
    "place": "Contexto de entrevista",
    "kind": "contexto",
    "quote": "“Serrano es la más fácil de caminar.”"
  },
  {
    "id": "cl-32-3",
    "sourceRow": 32,
    "level": 3,
    "label": "Enojo con el mundo",
    "difficulty": 2,
    "place": "Contexto de entrevista · Plaza Echaurren",
    "kind": "contexto",
    "quote": "“Me da nostalgia el barrio puerto, yo soy de toda la vida de aquí.” “No te confíes de nadie.”"
  },
  {
    "id": "cl-33-2",
    "sourceRow": 33,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 1,
    "place": "Barrio Puerto · plaza no identificada",
    "kind": "sin punto único",
    "quote": "“Muy lindo el recuerdo, siempre te encuentras con la misma gente, aquí en la plaza nos cuidamos.” “Es pacífico, nos conocemos.”",
    "contextNote": "La disposición a conversar se registra como actitud durante la entrevista."
  },
  {
    "id": "cl-35-1",
    "sourceRow": 35,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 5,
    "place": "Plaza Echaurren",
    "kind": "mencionada",
    "quote": "“Es difícil caminar porque las raíces de los árboles levantan el suelo y eso lo hace irregular, están llenas de hoyos las calles, está abandonado, dejado.”",
    "anchor": [
      900,
      190
    ]
  },
  {
    "id": "cl-37-2",
    "sourceRow": 37,
    "level": 2,
    "label": "Costumbre",
    "difficulty": 2,
    "place": "Barrio Puerto · mercado y Cochrane",
    "kind": "sin punto único",
    "quote": "Baja todos los sábados al mercado a comprar pescado. “En Cochrane las micros pasan pegadas a la vereda.”"
  },
  {
    "id": "cl-37-1",
    "sourceRow": 37,
    "level": 1,
    "label": "Cariño",
    "difficulty": 2,
    "place": "Barrio Puerto · mercado y Cochrane",
    "kind": "sin punto único",
    "quote": "Baja todos los sábados al mercado a comprar pescado. “En Cochrane las micros pasan pegadas a la vereda.”"
  },
  {
    "id": "cl-38-3",
    "sourceRow": 38,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 4,
    "place": "Blanco y Clave",
    "kind": "sin punto único",
    "quote": "“Las baldosas sueltas son una trampa, uno pisa y salta el agua sucia.” “Para sentarse hay que irse a la plaza y casi siempre está llena.”"
  },
  {
    "id": "cl-38-2",
    "sourceRow": 38,
    "level": 2,
    "label": "Cansancio",
    "difficulty": 4,
    "place": "Blanco y Clave",
    "kind": "sin punto único",
    "quote": "“Las baldosas sueltas son una trampa, uno pisa y salta el agua sucia.” “Para sentarse hay que irse a la plaza y casi siempre está llena.”"
  },
  {
    "id": "cl-39-2",
    "sourceRow": 39,
    "level": 2,
    "label": "Preocupación por las caídas",
    "difficulty": 4,
    "place": "Cochrane y Almte. Goñi",
    "kind": "sin punto único",
    "quote": "“Por Sotomayor se puede ir más tranquila porque es ancha, pero para cruzar hay que esperar harto.”"
  },
  {
    "id": "cl-40-3",
    "sourceRow": 40,
    "level": 3,
    "label": "Miedo y rabia",
    "difficulty": 5,
    "place": "Barrio Puerto · especialmente Cochrane y Blanco",
    "kind": "sin punto único",
    "quote": "“Me operaron hace tres meses y salir al centro es una pesadilla, el semáforo dura nada y con la muleta no alcanzo a cruzar.”"
  },
  {
    "id": "cl-41-2",
    "sourceRow": 41,
    "level": 2,
    "label": "Desorientación",
    "difficulty": 3,
    "place": "Cochrane y Almte. Muñoz",
    "kind": "sin punto único",
    "quote": "“Hace años que no venía, el barrio es lindo pero está muy descuidado.”"
  },
  {
    "id": "cl-42-2",
    "sourceRow": 42,
    "level": 2,
    "label": "Resignación",
    "difficulty": 2,
    "place": "Serrano",
    "kind": "mencionada",
    "quote": "“Una ya se acostumbró, pero los sábados se llena de gente y la vereda no da.” “Los parlantes de los locales a veces no dejan ni conversar.”",
    "anchor": [
      875,
      485
    ]
  },
  {
    "id": "cl-43-1",
    "sourceRow": 43,
    "level": 1,
    "label": "Tranquilidad, me siento en casa",
    "difficulty": 1,
    "place": "Plaza Echaurren",
    "kind": "mencionada",
    "quote": "Se junta con amigos en la plaza Echaurren los sábados. “Uno ya sabe por dónde ir, el que viene de afuera se pierde.”",
    "anchor": [
      900,
      190
    ]
  },
  {
    "id": "cl-44-3",
    "sourceRow": 44,
    "level": 3,
    "label": "Miedo e impotencia",
    "difficulty": 5,
    "place": "Barrio Puerto",
    "kind": "sin punto único",
    "quote": "“Antes caminaba solo hasta el puerto, ahora ni a la esquina me atrevo.”"
  },
  {
    "id": "cl-45-2",
    "sourceRow": 45,
    "level": 2,
    "label": "Cansancio y calor",
    "difficulty": 3,
    "place": "Clave y Almte. Goñi",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-46-2",
    "sourceRow": 46,
    "level": 2,
    "label": "Molestia",
    "difficulty": 4,
    "place": "Cruce Cochrane con Sotomayor y Blanco",
    "kind": "sin punto único",
    "quote": "“Las micros no paran donde uno les hace la seña, hay que subirse casi corriendo.” “No hay paradero con techo ni dónde sentarse.”"
  },
  {
    "id": "cl-46-3",
    "sourceRow": 46,
    "level": 3,
    "label": "Ansiedad",
    "difficulty": 4,
    "place": "Cruce Cochrane con Sotomayor y Blanco",
    "kind": "sin punto único",
    "quote": "“Las micros no paran donde uno les hace la seña, hay que subirse casi corriendo.” “No hay paradero con techo ni dónde sentarse.”"
  },
  {
    "id": "cl-47-2",
    "sourceRow": 47,
    "level": 2,
    "label": "Preocupación",
    "difficulty": 3,
    "place": "Cochrane y Errázuriz",
    "kind": "sin punto único",
    "quote": "“En Serrano por lo menos se puede andar.”"
  },
  {
    "id": "cl-48-2",
    "sourceRow": 48,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 1,
    "place": "Barrio Puerto · menciona Blanco de noche",
    "kind": "sin punto único",
    "quote": "“Antes esto era otra cosa, había movimiento de verdad, ahora está botado.” “De día no tengo problema, de noche no ando ni loco por Blanco.”"
  },
  {
    "id": "cl-48-3",
    "sourceRow": 48,
    "level": 3,
    "label": "Pena",
    "difficulty": 1,
    "place": "Barrio Puerto · menciona Blanco de noche",
    "kind": "sin punto único",
    "quote": "“Antes esto era otra cosa, había movimiento de verdad, ahora está botado.” “De día no tengo problema, de noche no ando ni loco por Blanco.”"
  },
  {
    "id": "cl-49-3",
    "sourceRow": 49,
    "level": 3,
    "label": "Frustración e impotencia",
    "difficulty": 5,
    "place": "Sotomayor",
    "kind": "mencionada",
    "quote": "“Solo se puede por Sotomayor y aun así hay que esquivar hoyos.” Su cuidadora señala que no salen los días de lluvia.",
    "anchor": [
      315,
      430
    ]
  },
  {
    "id": "cl-50-2",
    "sourceRow": 50,
    "level": 2,
    "label": "Sorpresa y atención",
    "difficulty": 4,
    "place": "Prat, Sotomayor y Serrano",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-51-2",
    "sourceRow": 51,
    "level": 2,
    "label": "Desorientación y atención",
    "difficulty": 3,
    "place": "Cochrane y Sotomayor",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-52-3",
    "sourceRow": 52,
    "level": 3,
    "label": "Miedo",
    "difficulty": 2,
    "place": "Prat, Errázuriz y Blanco",
    "kind": "sin punto único",
    "quote": "En general, busca comodidad"
  },
  {
    "id": "cl-53-2",
    "sourceRow": 53,
    "level": 2,
    "label": "Desagrado",
    "difficulty": 2,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "Menciona veredas con excremento de perro",
    "anchor": [
      890,
      365
    ]
  },
  {
    "id": "cl-54-3",
    "sourceRow": 54,
    "level": 3,
    "label": "Inseguridad al cruzar",
    "difficulty": 4,
    "place": "Cruce Cochrane con Sotomayor",
    "kind": "mencionada",
    "quote": "No alcanza a distinguir bien el color del semáforo; cruza siguiendo a la gente que va adelante.",
    "anchor": [
      315,
      245
    ]
  },
  {
    "id": "cl-55-3",
    "sourceRow": 55,
    "level": 3,
    "label": "Agobio",
    "difficulty": 3,
    "place": "Almte. Goñi y Clave",
    "kind": "sin punto único",
    "quote": "Sin comentario extra registrado."
  },
  {
    "id": "cl-56-1",
    "sourceRow": 56,
    "level": 1,
    "label": "Orgullo de poder salir solo",
    "difficulty": 2,
    "place": "Barrio Puerto · Sotomayor, Serrano y Prat",
    "kind": "sin punto único",
    "quote": "Dice que claramente sería más fácil si las calles estuvieran mejor cuidadas."
  },
  {
    "id": "cl-57-3",
    "sourceRow": 57,
    "level": 3,
    "label": "Temor",
    "difficulty": 5,
    "place": "Barrio Puerto",
    "kind": "sin punto único",
    "quote": "Sin su hijo, no sale a la calle, dice que los autos pasan muy rápido"
  },
  {
    "id": "cl-58-1",
    "sourceRow": 58,
    "level": 1,
    "label": "Pertenencia y orgullo",
    "difficulty": 1,
    "place": "Barrio Puerto · Plaza Echaurren, Sotomayor y Cochrane",
    "kind": "sin punto único",
    "quote": "Siempre ha vivido aquí, entonces no se le hace difícil movilizarse",
    "agePending": true
  },
  {
    "id": "cl-59-3",
    "sourceRow": 59,
    "level": 3,
    "label": "Miedo",
    "difficulty": 3,
    "place": "Almte. Goñi, Almte. Pérez y Almte. Muñoz",
    "kind": "sin punto único",
    "quote": "Evita lo más posible, los pasajes pequeños, sobre todo después de las cinco de la tarde"
  }
];
const LEVEL_COLORS = {1:"#00D6C8",2:"#FF8A1F",3:"#9F2148"};
const LEVEL_LABELS = {1:"Sensaciones positivas",2:"Sensaciones intermedias",3:"Emociones intensas"};
const MAP_VIEWBOX = "0 0 1200 950";
// Preserve source locations: exact street or reference; never assign an arbitrary street.
function layoutEmotions() {
  const occupied=[];
  const unlocated={1:0,2:0,3:0};
  EMOTIONS.forEach(item=>{
    if(item.anchor){
      const [ax,ay]=item.anchor;
      const candidates=[[0,0],[24,0],[-24,0],[0,-24],[0,24],[24,-24],[-24,-24],[24,24],[-24,24],[48,0],[-48,0]];
      const off=candidates.find(([dx,dy])=>occupied.every(([x,y])=>Math.hypot(ax+dx-x,ay+dy-y)>=23))||[0,48];
      item.x=ax+off[0];item.y=ay+off[1];occupied.push([item.x,item.y]);
    }else{
      const i=unlocated[item.level]++;
      item.x=60+(item.level-1)*390+(i%9)*40;
      item.y=815+Math.floor(i/9)*39;
    }
  });
}
layoutEmotions();
function drawUnlocatedPanel(svg){
  const g=svgEl("g");g.setAttribute("class","unlocated-panel");
  const rect=svgEl("rect");Object.entries({x:22,y:750,width:1156,height:185,rx:12,fill:"#0a2234",stroke:"#294253"}).forEach(([k,v])=>rect.setAttribute(k,v));g.append(rect);
  const label=(x,y,txt,cls)=>{const t=svgEl("text");t.setAttribute("x",x);t.setAttribute("y",y);t.setAttribute("class",cls);t.textContent=txt;g.append(t);};
  label(43,775,"REGISTROS SIN UBICACIÓN ÚNICA · BARRIO PUERTO / VARIAS CALLES / CONTEXTO DE ENTREVISTA","unlocated-title");
  [1,2,3].forEach(l=>label(43+(l-1)*390,797,"Nivel "+l+" · "+LEVEL_LABELS[l],"unlocated-label"));
  svg.append(g);
}


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
let showEmotions = true;

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

function emotionFill(level) { return LEVEL_COLORS[level]; }

function difficultyLabel(level) {
  if (level === "alta") return "Dificultad alta";
  if (level === "media") return "Dificultad media";
  return "Sin dificultad";
}

function createEmotionPoint(item, context = "emotion") {
  const group=svgEl("g");
  group.setAttribute("class","emotion-point");
  group.dataset.level=item.level;
  group.dataset.id=item.id;
  group.setAttribute("tabindex","0");
  group.setAttribute("role","button");
  group.setAttribute("aria-label",item.label+", "+item.place+", nivel "+item.level);
  if(item.anchor && (item.x!==item.anchor[0]||item.y!==item.anchor[1])){
    const leader=svgEl("line");
    Object.entries({x1:item.anchor[0],y1:item.anchor[1],x2:item.x,y2:item.y,class:"emotion-leader"}).forEach(([k,v])=>leader.setAttribute(k,v));group.append(leader);
  }
  for(const [cls,r] of [["emotion-hit",11],["emotion-halo",[0,19,30,43][item.level]],["emotion-core",9]]){
    const circle=svgEl("circle");
    Object.entries({cx:item.x,cy:item.y,r,class:cls,fill:cls==="emotion-hit"?"transparent":emotionFill(item.level)}).forEach(([k,v])=>circle.setAttribute(k,v));
    if(cls==="emotion-core"&&item.kind==="referencial")circle.classList.add("is-reference");
    group.append(circle);
  }
  const stage=context==="emotion"?emotionStage:difficultyStage;
  const tip=context==="emotion"?emotionTooltip:mapTooltip;
  const show=e=>{group.classList.add("is-engaged"); showPointTooltip(e,item,stage,tip);};
  const hide=()=>{group.classList.remove("is-engaged");tip.classList.remove("is-visible");};
  group.addEventListener("mouseenter",show);
  group.addEventListener("mousemove",e=>moveTooltip(stage,tip,e));
  group.addEventListener("mouseleave",hide);
  group.addEventListener("focus",show);
  group.addEventListener("blur",hide);
  group.addEventListener("keydown",e=>{if(e.key==="Escape"){hide();group.blur();}});
  return group;
}
function showPointTooltip(event,item,stage,tip){
  tip.classList.add("point-detail");
  const place=tip.querySelector(".point-location");
  place.textContent="VALPARAÍSO · "+item.place.toLocaleUpperCase("es");
  tip.querySelector(".tooltip-dot").style.background=emotionFill(item.level);
  tip.querySelector(".point-title").textContent=item.label.toLocaleUpperCase("es");
  tip.querySelector(".point-meta").textContent="Nivel "+item.level+" · Dificultad percibida: "+item.difficulty+"/5";
  tip.querySelector(".point-comment").textContent=item.quote;
  const note=tip.querySelector(".point-note");
  note.textContent=[item.kind==="referencial"?"Ubicación referencial (según dificultad indicada)":item.kind==="sin punto único"?"Sin ubicación emocional única":item.kind==="contexto"?"Actitud registrada durante la entrevista, no emoción atribuida a la calle":"Lugar mencionado en la ficha; posición esquemática",item.agePending?"Edad pendiente de confirmar":"",item.interpretation?"Etiqueta interpretativa de una respuesta ambivalente":"",item.contextNote||""].filter(Boolean).join(" · ");
  tip.classList.add("is-visible");
  moveTooltip(stage,tip,event);
}

function renderEmotionMap() {
  emotionMap.innerHTML = "";
  emotionMap.setAttribute("viewBox", MAP_VIEWBOX);
  drawBaseMap(emotionMap);
  drawUnlocatedPanel(emotionMap);

  const pointsLayer = svgEl("g");
  pointsLayer.setAttribute("class", "emotion-layer");

  EMOTIONS.forEach(item => {
    pointsLayer.appendChild(createEmotionPoint(item, "emotion"));
  });

  emotionMap.appendChild(pointsLayer);
}

function moveTooltip(stage, tip, event) {
  const bounds=stage.getBoundingClientRect();
  const target=event.currentTarget?.getBoundingClientRect();
  const x=Number.isFinite(event.clientX)?event.clientX:target?target.left+target.width/2:bounds.left+bounds.width/2;
  const y=Number.isFinite(event.clientY)?event.clientY:target?target.top+target.height/2:bounds.top+bounds.height/2;
  const w=tip.offsetWidth,h=tip.offsetHeight;
  let left=x-bounds.left+16,top=y-bounds.top+16;
  if(left+w>bounds.width-8)left=x-bounds.left-w-16;
  if(top+h>bounds.height-8)top=y-bounds.top-h-16;
  tip.style.left=Math.max(8,Math.min(left,bounds.width-w-8))+"px";
  tip.style.top=Math.max(8,Math.min(top,bounds.height-h-8))+"px";
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

function showDifficultyTooltip(event,item){
  mapTooltip.classList.remove("point-detail");
  mapTooltip.querySelector(".point-location").textContent="VALPARAÍSO · "+item.place.toLocaleUpperCase("es");
  mapTooltip.querySelector(".tooltip-dot").style.background=DIFFICULTY_COLORS[item.level];
  mapTooltip.querySelector(".point-title").textContent=item.categoryLabel;
  mapTooltip.querySelector(".point-meta").textContent=difficultyLabel(item.level);
  mapTooltip.querySelector(".point-comment").textContent=item.detail;
  mapTooltip.querySelector(".point-note").textContent="Tramo ilustrativo del prototipo; pendiente de validación.";
  mapTooltip.classList.add("is-visible");
  moveTooltip(difficultyStage,mapTooltip,event);
}

function hideMapTooltip() {
  mapTooltip.classList.remove("is-visible");
}

function renderDifficultyMap() {
  difficultyMap.innerHTML = "";
  difficultyMap.setAttribute("viewBox", MAP_VIEWBOX);
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
    drawUnlocatedPanel(difficultyMap);
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
