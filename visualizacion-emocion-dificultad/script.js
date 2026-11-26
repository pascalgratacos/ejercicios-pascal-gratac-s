const NS = "http://www.w3.org/2000/svg";
const MAP_SCRIPT_URL=document.currentScript.src;

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
  {
    "name": "Prat",
    "x1": 11.9,
    "y1": 112.5,
    "x2": 197.7,
    "y2": 112.5,
    "major": true
  },
  {
    "name": "Sotomayor",
    "x1": 197.7,
    "y1": 112.5,
    "x2": 427.8,
    "y2": 112.5,
    "major": true
  },
  {
    "name": "Serrano",
    "x1": 427.8,
    "y1": 112.5,
    "x2": 1188.1,
    "y2": 112.5,
    "major": true
  },
  {
    "name": "Cochrane",
    "x1": 11.9,
    "y1": 320.5,
    "x2": 1188.1,
    "y2": 320.5,
    "major": true
  },
  {
    "name": "Blanco",
    "x1": 11.9,
    "y1": 539.5,
    "x2": 1188.1,
    "y2": 539.5,
    "major": true
  },
  {
    "name": "Errázuriz",
    "x1": 11.9,
    "y1": 742.3,
    "x2": 1188.1,
    "y2": 742.3,
    "major": true
  },
  {
    "name": "Sotomayor",
    "x1": 197.7,
    "y1": 112.5,
    "x2": 197.7,
    "y2": 742.3,
    "major": false
  },
  {
    "name": "Sotomayor",
    "x1": 427.8,
    "y1": 112.5,
    "x2": 427.8,
    "y2": 742.3,
    "major": false
  },
  {
    "name": "Almte. Muñoz",
    "x1": 653.7,
    "y1": 112.5,
    "x2": 653.7,
    "y2": 742.3,
    "major": false
  },
  {
    "name": "Almte. Goñi",
    "x1": 778.1,
    "y1": 112.5,
    "x2": 778.1,
    "y2": 539.5,
    "major": false
  },
  {
    "name": "Almte. Pérez",
    "x1": 888.9,
    "y1": 112.5,
    "x2": 888.9,
    "y2": 539.5,
    "major": false
  },
  {
    "name": "Clave",
    "x1": 1003.1,
    "y1": 320.5,
    "x2": 1003.1,
    "y2": 742.3,
    "major": false
  },
  {
    "name": "San Martín",
    "x1": 1150.6,
    "y1": 320.5,
    "x2": 1150.6,
    "y2": 742.3,
    "major": false
  }
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
    "place": "Serrano",
    "kind": "referencial",
    "quote": "Prefiere caminar desde Serrano a Prat, incluso pasando por Sotomayor, antes que hacer un viaje corto por Cochrane o Blanco.",
    "originalPlace": "Serrano y Prat",
    "anchor": [
      485.8,
      112.5
    ],
    "locationNote": "Prefiere Serrano y Prat; posición representativa en Serrano."
  },
  {
    "id": "cl-5-1",
    "sourceRow": 5,
    "level": 1,
    "label": "Confianza",
    "difficulty": 4,
    "place": "Sotomayor",
    "kind": "referencial",
    "quote": "Prefiere cruces declarados que adivinar por dónde cruzar.",
    "originalPlace": "Sin calle única",
    "anchor": [
      197.7,
      368.2
    ],
    "locationNote": "Sotomayor figura como lugar de mayor dificultad; el comentario habla de cruces, sin asociar la confianza a un cruce exacto."
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
      485.8,
      320.5
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
      485.8,
      539.5
    ]
  },
  {
    "id": "cl-8-3",
    "sourceRow": 8,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 4,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalPlace": "Blanco, Clave, Cochrane y Echaurren",
    "anchor": [
      153.4,
      539.5
    ],
    "locationNote": "También menciona Clave, Cochrane y Echaurren."
  },
  {
    "id": "cl-9-2",
    "sourceRow": 9,
    "level": 2,
    "label": "Molestia",
    "difficulty": 3,
    "place": "Clave",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalLabel": "Molestia y cansancio",
    "originalPlace": "Almte. Goñi y Clave",
    "anchor": [
      1003.1,
      376.7
    ],
    "locationNote": "También indica Almte. Goñi."
  },
  {
    "id": "cl-10-2",
    "sourceRow": 10,
    "level": 2,
    "label": "Cansancio",
    "difficulty": 4,
    "place": "Almte. Goñi",
    "kind": "referencial",
    "quote": "Menciona pocos lugares para descansar",
    "originalPlace": "Almte. Goñi, Clave, Blanco y Cochrane",
    "anchor": [
      778.1,
      378.4
    ],
    "locationNote": "También indica Clave, Blanco y Cochrane."
  },
  {
    "id": "cl-11-3",
    "sourceRow": 11,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 2,
    "place": "Cruces de Sotomayor",
    "kind": "referencial",
    "quote": "Sobre todo se siente insegura al cruzar las calles",
    "originalPlace": "Cruces de Sotomayor con Cochrane, Blanco y Serrano",
    "anchor": [
      427.8,
      112.5
    ],
    "locationNote": "Menciona los cruces con Cochrane, Blanco y Serrano; punto representativo en el cruce esquemático con Serrano."
  },
  {
    "id": "cl-12-3",
    "sourceRow": 12,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 3,
    "place": "Almte. Goñi",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalPlace": "Almte. Goñi, Clave, Blanco y Cochrane",
    "anchor": [
      778.1,
      504.5
    ],
    "locationNote": "También indica Clave, Blanco y Cochrane."
  },
  {
    "id": "cl-13-3",
    "sourceRow": 13,
    "level": 3,
    "label": "Pena",
    "difficulty": 1,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      340.9,
      320.5
    ],
    "originalLabel": "Pena por su estado"
  },
  {
    "id": "cl-14-3",
    "sourceRow": 14,
    "level": 3,
    "label": "Pena",
    "difficulty": 2,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "anchor": [
      340.9,
      539.5
    ],
    "originalLabel": "Pena por su estado"
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
      519.9,
      112.5
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
      690.3,
      112.5
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
      681.8,
      320.5
    ]
  },
  {
    "id": "cl-18-1",
    "sourceRow": 18,
    "level": 1,
    "label": "Encanto",
    "difficulty": 1,
    "place": "Barrio Puerto",
    "kind": "general",
    "quote": "Salgo todos los días, me encanta, camino por todas las calles, conozco a los malandrines.",
    "originalPlace": "Barrio Puerto",
    "anchor": [
      78.4,
      221.6
    ],
    "locationNote": "Experiencia del barrio completo; posición gráfica sin calle atribuida."
  },
  {
    "id": "cl-19-2",
    "sourceRow": 19,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 1,
    "place": "Barrio Puerto",
    "kind": "general",
    "quote": "Me es cómodo, yo bajo del cerro y voy caminando al centro, me voy tranquilo.",
    "interpretation": true,
    "originalLabel": "Nostalgia y ambivalencia",
    "originalPlace": "Barrio Puerto · día y noche",
    "anchor": [
      481.5,
      253.1
    ],
    "locationNote": "Experiencia general de día y noche; posición gráfica sin calle atribuida."
  },
  {
    "id": "cl-20-3",
    "sourceRow": 20,
    "level": 3,
    "label": "Disconformidad",
    "difficulty": 5,
    "place": "Barrio Puerto",
    "kind": "general",
    "quote": "Soy un argentino que viene de turista, está todo mal señalizado, las calles están sucias y dejan mucho que desear.",
    "originalLabel": "Disconformidad y decepción",
    "originalPlace": "Barrio Puerto",
    "anchor": [
      835.2,
      226.7
    ],
    "locationNote": "Se refiere a todas las calles; posición gráfica sin calle atribuida."
  },
  {
    "id": "cl-21-1",
    "sourceRow": 21,
    "level": 1,
    "label": "Interés",
    "difficulty": 3,
    "place": "Barrio Puerto",
    "kind": "contexto",
    "quote": "“En las calles no caben las sillas de rueda.” “Hace falta lugar adecuado para la gente mayor.”",
    "originalLabel": "Interés por conversar",
    "originalPlace": "Contexto de entrevista",
    "anchor": [
      501.1,
      669.9
    ],
    "locationNote": "Actitud durante la entrevista; posición gráfica sin calle atribuida."
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
      622.2,
      539.5
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
      733,
      112.5
    ]
  },
  {
    "id": "cl-30-1",
    "sourceRow": 30,
    "level": 1,
    "label": "Confianza",
    "difficulty": 1,
    "place": "Serrano",
    "kind": "inferida",
    "quote": "“Serrano es la más fácil de caminar.”",
    "originalLabel": "Confianza al conversar",
    "originalPlace": "Contexto de entrevista",
    "anchor": [
      792.6,
      112.5
    ],
    "locationNote": "El comentario menciona Serrano como la calle más fácil; la confianza se observó durante la conversación."
  },
  {
    "id": "cl-32-3",
    "sourceRow": 32,
    "level": 3,
    "label": "Enojo",
    "difficulty": 2,
    "place": "Plaza Echaurren",
    "kind": "contexto",
    "quote": "“Me da nostalgia el barrio puerto, yo soy de toda la vida de aquí.” “No te confíes de nadie.”",
    "originalLabel": "Enojo con el mundo",
    "originalPlace": "Contexto de entrevista · Plaza Echaurren",
    "anchor": [
      1046.6,
      197.7
    ],
    "locationNote": "Lugar de la entrevista; el enojo no se atribuye a una calle concreta."
  },
  {
    "id": "cl-33-2",
    "sourceRow": 33,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 1,
    "place": "Barrio Puerto",
    "kind": "general",
    "quote": "“Muy lindo el recuerdo, siempre te encuentras con la misma gente, aquí en la plaza nos cuidamos.” “Es pacífico, nos conocemos.”",
    "contextNote": "La disposición a conversar se registra como actitud durante la entrevista.",
    "originalPlace": "Barrio Puerto · plaza no identificada",
    "anchor": [
      673.3,
      242.9
    ],
    "locationNote": "Menciona una plaza sin identificarla; posición gráfica sin calle atribuida."
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
      1129.3,
      200.3
    ]
  },
  {
    "id": "cl-37-2",
    "sourceRow": 37,
    "level": 2,
    "label": "Costumbre",
    "difficulty": 2,
    "place": "Cochrane",
    "kind": "inferida",
    "quote": "Baja todos los sábados al mercado a comprar pescado. “En Cochrane las micros pasan pegadas a la vereda.”",
    "originalPlace": "Barrio Puerto · mercado y Cochrane",
    "anchor": [
      758.5,
      320.5
    ],
    "locationNote": "El comentario menciona Cochrane y la visita habitual al mercado; la emoción no tiene coordenada exacta."
  },
  {
    "id": "cl-37-1",
    "sourceRow": 37,
    "level": 1,
    "label": "Cariño",
    "difficulty": 2,
    "place": "Serrano",
    "kind": "referencial",
    "quote": "Baja todos los sábados al mercado a comprar pescado. “En Cochrane las micros pasan pegadas a la vereda.”",
    "originalPlace": "Barrio Puerto · mercado y Cochrane",
    "anchor": [
      869.3,
      112.5
    ],
    "locationNote": "Serrano y Prat son lugares de menor dificultad; el comentario sobre Cochrane describe el tránsito de micros."
  },
  {
    "id": "cl-38-3",
    "sourceRow": 38,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 4,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "“Las baldosas sueltas son una trampa, uno pisa y salta el agua sucia.” “Para sentarse hay que irse a la plaza y casi siempre está llena.”",
    "originalPlace": "Blanco y Clave",
    "anchor": [
      750,
      539.5
    ],
    "locationNote": "También indica Clave; no identifica la baldosa exacta."
  },
  {
    "id": "cl-38-2",
    "sourceRow": 38,
    "level": 2,
    "label": "Cansancio",
    "difficulty": 4,
    "place": "Clave",
    "kind": "referencial",
    "quote": "“Las baldosas sueltas son una trampa, uno pisa y salta el agua sucia.” “Para sentarse hay que irse a la plaza y casi siempre está llena.”",
    "originalPlace": "Blanco y Clave",
    "anchor": [
      1003.1,
      588.1
    ],
    "locationNote": "También indica Blanco; no identifica un punto exacto de descanso."
  },
  {
    "id": "cl-39-2",
    "sourceRow": 39,
    "level": 2,
    "label": "Preocupación",
    "difficulty": 4,
    "place": "Sotomayor",
    "kind": "inferida",
    "quote": "“Por Sotomayor se puede ir más tranquila porque es ancha, pero para cruzar hay que esperar harto.”",
    "originalLabel": "Preocupación por las caídas",
    "originalPlace": "Cochrane y Almte. Goñi",
    "anchor": [
      427.8,
      390.3
    ],
    "locationNote": "El comentario menciona Sotomayor y la espera al cruzar; también señala Cochrane y Almte. Goñi como difíciles."
  },
  {
    "id": "cl-40-3",
    "sourceRow": 40,
    "level": 3,
    "label": "Miedo",
    "difficulty": 5,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "“Me operaron hace tres meses y salir al centro es una pesadilla, el semáforo dura nada y con la muleta no alcanzo a cruzar.”",
    "originalLabel": "Miedo y rabia",
    "originalPlace": "Barrio Puerto · especialmente Cochrane y Blanco",
    "anchor": [
      417.6,
      320.5
    ],
    "locationNote": "Señala todas las calles, en especial Cochrane y Blanco."
  },
  {
    "id": "cl-41-2",
    "sourceRow": 41,
    "level": 2,
    "label": "Desorientación",
    "difficulty": 3,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "“Hace años que no venía, el barrio es lindo pero está muy descuidado.”",
    "originalPlace": "Cochrane y Almte. Muñoz",
    "anchor": [
      954.5,
      320.5
    ],
    "locationNote": "También señala Almte. Muñoz."
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
      937.5,
      112.5
    ]
  },
  {
    "id": "cl-43-1",
    "sourceRow": 43,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Plaza Echaurren",
    "kind": "mencionada",
    "quote": "Se junta con amigos en la plaza Echaurren los sábados. “Uno ya sabe por dónde ir, el que viene de afuera se pierde.”",
    "anchor": [
      1142,
      289.8
    ],
    "originalLabel": "Tranquilidad, me siento en casa"
  },
  {
    "id": "cl-44-3",
    "sourceRow": 44,
    "level": 3,
    "label": "Miedo",
    "difficulty": 5,
    "place": "Puerto",
    "kind": "inferida",
    "quote": "“Antes caminaba solo hasta el puerto, ahora ni a la esquina me atrevo.”",
    "originalLabel": "Miedo e impotencia",
    "originalPlace": "Barrio Puerto",
    "anchor": [
      737.2,
      792.6
    ],
    "locationNote": "El puerto aparece como destino anterior; no se conoce dónde se experimentó el miedo."
  },
  {
    "id": "cl-45-2",
    "sourceRow": 45,
    "level": 2,
    "label": "Cansancio",
    "difficulty": 3,
    "place": "Almte. Goñi",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalLabel": "Cansancio y calor",
    "originalPlace": "Clave y Almte. Goñi",
    "anchor": [
      778.1,
      415.9
    ],
    "locationNote": "También señala Clave."
  },
  {
    "id": "cl-46-2",
    "sourceRow": 46,
    "level": 2,
    "label": "Molestia",
    "difficulty": 4,
    "place": "Cruce Cochrane con Sotomayor",
    "kind": "referencial",
    "quote": "“Las micros no paran donde uno les hace la seña, hay que subirse casi corriendo.” “No hay paradero con techo ni dónde sentarse.”",
    "originalPlace": "Cruce Cochrane con Sotomayor y Blanco",
    "anchor": [
      197.7,
      320.5
    ],
    "locationNote": "También indica Blanco; el comentario habla del transporte y la falta de descanso."
  },
  {
    "id": "cl-46-3",
    "sourceRow": 46,
    "level": 3,
    "label": "Ansiedad",
    "difficulty": 4,
    "place": "Cruce Cochrane con Sotomayor",
    "kind": "referencial",
    "quote": "“Las micros no paran donde uno les hace la seña, hay que subirse casi corriendo.” “No hay paradero con techo ni dónde sentarse.”",
    "originalPlace": "Cruce Cochrane con Sotomayor y Blanco",
    "anchor": [
      427.8,
      320.5
    ],
    "locationNote": "También indica Blanco; el comentario habla del transporte y la falta de descanso."
  },
  {
    "id": "cl-47-2",
    "sourceRow": 47,
    "level": 2,
    "label": "Preocupación",
    "difficulty": 3,
    "place": "Serrano",
    "kind": "inferida",
    "quote": "“En Serrano por lo menos se puede andar.”",
    "originalPlace": "Cochrane y Errázuriz",
    "anchor": [
      1031.3,
      112.5
    ],
    "locationNote": "Menciona Serrano como alternativa transitable; las calles difíciles señaladas son Cochrane y Errázuriz."
  },
  {
    "id": "cl-48-2",
    "sourceRow": 48,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 1,
    "place": "Blanco",
    "kind": "inferida",
    "quote": "“Antes esto era otra cosa, había movimiento de verdad, ahora está botado.” “De día no tengo problema, de noche no ando ni loco por Blanco.”",
    "originalPlace": "Barrio Puerto · menciona Blanco de noche",
    "anchor": [
      409.1,
      539.5
    ],
    "locationNote": "El testimonio menciona Blanco de noche y el deterioro general del barrio."
  },
  {
    "id": "cl-48-3",
    "sourceRow": 48,
    "level": 3,
    "label": "Pena",
    "difficulty": 1,
    "place": "Blanco",
    "kind": "inferida",
    "quote": "“Antes esto era otra cosa, había movimiento de verdad, ahora está botado.” “De día no tengo problema, de noche no ando ni loco por Blanco.”",
    "originalPlace": "Barrio Puerto · menciona Blanco de noche",
    "anchor": [
      447.4,
      539.5
    ],
    "locationNote": "El testimonio menciona Blanco de noche y el deterioro general del barrio."
  },
  {
    "id": "cl-49-3",
    "sourceRow": 49,
    "level": 3,
    "label": "Frustración",
    "difficulty": 5,
    "place": "Sotomayor",
    "kind": "mencionada",
    "quote": "“Solo se puede por Sotomayor y aun así hay que esquivar hoyos.” Su cuidadora señala que no salen los días de lluvia.",
    "anchor": [
      427.8,
      600.9
    ],
    "originalLabel": "Frustración e impotencia"
  },
  {
    "id": "cl-50-2",
    "sourceRow": 50,
    "level": 2,
    "label": "Sorpresa",
    "difficulty": 4,
    "place": "Prat",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalLabel": "Sorpresa y atención",
    "originalPlace": "Prat, Sotomayor y Serrano",
    "anchor": [
      51.1,
      112.5
    ],
    "locationNote": "También indica Sotomayor y Serrano."
  },
  {
    "id": "cl-51-2",
    "sourceRow": 51,
    "level": 2,
    "label": "Desorientación",
    "difficulty": 3,
    "place": "Cochrane",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalLabel": "Desorientación y atención",
    "originalPlace": "Cochrane y Sotomayor",
    "anchor": [
      221.6,
      320.5
    ],
    "locationNote": "También indica Sotomayor."
  },
  {
    "id": "cl-52-3",
    "sourceRow": 52,
    "level": 3,
    "label": "Miedo",
    "difficulty": 2,
    "place": "Blanco",
    "kind": "referencial",
    "quote": "En general, busca comodidad",
    "originalPlace": "Prat, Errázuriz y Blanco",
    "anchor": [
      1090.9,
      539.5
    ],
    "locationNote": "También indica Prat y Errázuriz."
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
      835.2,
      539.5
    ]
  },
  {
    "id": "cl-54-3",
    "sourceRow": 54,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 4,
    "place": "Cruce Cochrane con Sotomayor",
    "kind": "mencionada",
    "quote": "No alcanza a distinguir bien el color del semáforo; cruza siguiendo a la gente que va adelante.",
    "anchor": [
      427.8,
      320.5
    ],
    "originalLabel": "Inseguridad al cruzar"
  },
  {
    "id": "cl-55-3",
    "sourceRow": 55,
    "level": 3,
    "label": "Agobio",
    "difficulty": 3,
    "place": "Clave",
    "kind": "referencial",
    "quote": "Sin comentario extra registrado.",
    "originalPlace": "Almte. Goñi y Clave",
    "anchor": [
      1003.1,
      673.3
    ],
    "locationNote": "También indica Almte. Goñi."
  },
  {
    "id": "cl-56-1",
    "sourceRow": 56,
    "level": 1,
    "label": "Orgullo",
    "difficulty": 2,
    "place": "Serrano",
    "kind": "referencial",
    "quote": "Dice que claramente sería más fácil si las calles estuvieran mejor cuidadas.",
    "originalLabel": "Orgullo de poder salir solo",
    "originalPlace": "Barrio Puerto · Sotomayor, Serrano y Prat",
    "anchor": [
      1133.5,
      112.5
    ],
    "locationNote": "También indica Sotomayor y Prat como lugares de menor dificultad."
  },
  {
    "id": "cl-57-3",
    "sourceRow": 57,
    "level": 3,
    "label": "Temor",
    "difficulty": 5,
    "place": "Barrio Puerto",
    "kind": "general",
    "quote": "Sin su hijo, no sale a la calle, dice que los autos pasan muy rápido",
    "originalPlace": "Barrio Puerto",
    "anchor": [
      1048.3,
      669
    ],
    "locationNote": "Se refiere a todas las calles y a la velocidad de los autos; posición gráfica sin calle atribuida."
  },
  {
    "id": "cl-58-1",
    "sourceRow": 58,
    "level": 1,
    "label": "Pertenencia",
    "difficulty": 1,
    "place": "Plaza Echaurren",
    "kind": "referencial",
    "quote": "Siempre ha vivido aquí, entonces no se le hace difícil movilizarse",
    "agePending": true,
    "originalLabel": "Pertenencia y orgullo",
    "originalPlace": "Barrio Puerto · Plaza Echaurren, Sotomayor y Cochrane",
    "anchor": [
      1035.5,
      292.3
    ],
    "locationNote": "También indica Sotomayor y Cochrane; edad pendiente de confirmar."
  },
  {
    "id": "cl-59-3",
    "sourceRow": 59,
    "level": 3,
    "label": "Miedo",
    "difficulty": 3,
    "place": "Almte. Goñi",
    "kind": "referencial",
    "quote": "Evita lo más posible, los pasajes pequeños, sobre todo después de las cinco de la tarde",
    "originalPlace": "Almte. Goñi, Almte. Pérez y Almte. Muñoz",
    "anchor": [
      778.1,
      341.8
    ],
    "locationNote": "También indica Almte. Pérez y Almte. Muñoz; menciona pasajes pequeños sin identificarlos."
  }
];
const LEVEL_COLORS = {1:"#00D6C8",2:"#FF8A1F",3:"#9F2148"};
const LEVEL_LABELS = {1:"Sensaciones positivas",2:"Sensaciones intermedias",3:"Emociones intensas"};
const MAP_VIEWBOX = "-150 -65 1500 1030";
// Positions are schematic. General experiences remain inside the map without a street attribution.
const LABEL_ZONES = [{"name":"Prat","x":95.45454545454545,"y":112.5,"w":42.61363636363637,"h":14.204403409090908},{"name":"Sotomayor","x":312.78409090909093,"y":112.5,"w":73.29545454545455,"h":14.204403409090908},{"name":"Serrano","x":586.3636363636364,"y":112.5,"w":52.84090909090909,"h":14.204403409090908},{"name":"Cochrane","x":576.1363636363636,"y":320.45454545454544,"w":62.64204545454545,"h":14.204403409090908},{"name":"Blanco","x":569.3181818181819,"y":539.4886363636364,"w":49.00568181818182,"h":14.204403409090908},{"name":"Errázuriz","x":873.5795454545455,"y":742.3295454545455,"w":66.9034090909091,"h":14.204403409090908},{"name":"Sotomayor","x":197.72727272727272,"y":429.97159090909093,"w":47.72727272727273,"h":10.7953125},{"name":"Sotomayor","x":427.8409090909091,"y":429.97159090909093,"w":47.72727272727273,"h":10.7953125},{"name":"Almirante Goñi","x":778.125,"y":429.97159090909093,"w":65.625,"h":10.7953125},{"name":"Almirante Pérez","x":888.9204545454546,"y":345.17045454545456,"w":68.18181818181819,"h":10.7953125},{"name":"Clave","x":1003.125,"y":429.97159090909093,"w":29.829545454545457,"h":10.7953125},{"name":"San Martín","x":1150.5681818181818,"y":429.97159090909093,"w":49.43181818181818,"h":10.7953125},{"name":"Almirante Muñoz","x":653.6931818181819,"y":575.2840909090909,"w":71.5909090909091,"h":10.7953125}];
function layoutEmotions() {
  const occupied=[];
  const legal=(x,y)=>x>=18&&x<=1186&&y>=40&&y<=845&&
    LABEL_ZONES.every(z=>Math.abs(x-z.x)>z.w+28||Math.abs(y-z.y)>z.h+28)&&
    occupied.every(([px,py])=>Math.hypot(x-px,y-py)>=23);
  EMOTIONS.forEach(item=>{
    const [ax,ay]=item.anchor;
    const matching=STREETS.filter(s=>s.x1===s.x2 ? Math.abs(ax-s.x1)<.2&&ay>=s.y1-.2&&ay<=s.y2+.2 : Math.abs(ay-s.y1)<.2&&ax>=s.x1-.2&&ax<=s.x2+.2);
    const normalized=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    const road=matching.find(s=>normalized(item.place).includes(normalized(s.name)))||matching[0];
    const options=[[ax,ay]];
    for(let n=1;n<=100;n++){
      const delta=12*n;
      if(road){
        if(road.x1===road.x2)options.push([ax,ay+delta],[ax,ay-delta]);
        else options.push([ax+delta,ay],[ax-delta,ay]);
      }else options.push([ax+delta,ay],[ax-delta,ay],[ax,ay+delta],[ax,ay-delta],[ax+delta,ay+delta],[ax-delta,ay-delta]);
    }
    const within=(x,y)=>!road||(x>=Math.min(road.x1,road.x2)-.2&&x<=Math.max(road.x1,road.x2)+.2&&y>=Math.min(road.y1,road.y2)-.2&&y<=Math.max(road.y1,road.y2)+.2);
    let p=options.find(([x,y])=>within(x,y)&&legal(x,y));
    if(!p){
      // A very short/crowded segment may need a nearby offset. Its original reference is retained.
      const candidates=[];
      for(let r=12;r<=240;r+=12)for(let a=0;a<16;a++)candidates.push([ax+Math.cos(a*Math.PI/8)*r,ay+Math.sin(a*Math.PI/8)*r]);
      p=candidates.find(([x,y])=>legal(x,y));
    }
    if(!p)throw Error("No hay posición libre para "+item.id);
    [item.x,item.y]=p;
    occupied.push(p);
  });
}
layoutEmotions();

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

// Remap legacy schematic physical segments onto the new drawing; unavailable street geometry is not fabricated.
const NIGHT_SEGMENTS = {"pav-r1":[90,871,232,871],"pav-r2":[502,633,640,633],"pav-r3":[1177,132,1350,132],"pav-y1":[640,376,1177,376],"pav-y2":[913,633,1350,633],"pav-g1":[913,871,1043,871],"obs-r1":[232,633,232,376],"obs-r2":[232,633,502,633],"obs-r3":[502,871,502,633],"obs-r4":[215,132,565,132],"obs-y1":null,"obs-y2":[913,633,913,376],"obs-g1":[1177,132,1258,132],"obs-g2":[1258,132,1350,132],"sig-r1":[1177,633,1177,376],"sig-r2":[1350,633,1350,376],"sig-r3":[913,633,913,376],"sig-y1":null,"sig-y2":null,"sig-y3":[1350,871,1350,633],"sig-g1":[27,132,204,132],"sig-g2":[640,871,1177,871]};
DIFFICULTY_SEGMENTS.forEach(item=>{const coords=NIGHT_SEGMENTS[item.id];if(!coords){item.offMap=true;return;}[item.x1,item.y1,item.x2,item.y2]=coords.map(v=>v*1200/1408);});

let activeFilter = "todas";
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
  const image=svgEl("image");
  image.setAttribute("href", new URL("./mapa-valparaiso-nocturno.svg?v=05",document.currentScript?.src || MAP_SCRIPT_URL).href);
  image.setAttribute("x",0);image.setAttribute("y",0);
  image.setAttribute("width",1200);image.setAttribute("height",900);
  image.setAttribute("preserveAspectRatio","xMidYMid meet");
  image.setAttribute("pointer-events","none");
  image.setAttribute("class","night-map-base");
  svg.append(image);
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
  for(const [cls,r] of [["emotion-hit",11],["emotion-halo",[0,19,30,43][item.level]],["emotion-core",9]]){
    const circle=svgEl("circle");
    Object.entries({cx:item.x,cy:item.y,r,class:cls,fill:cls==="emotion-hit"?"transparent":emotionFill(item.level)}).forEach(([k,v])=>circle.setAttribute(k,v));
    if(cls==="emotion-core"||cls==="emotion-halo")circle.setAttribute("stroke","none");
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
  note.textContent=[item.locationNote||(item.kind==="referencial"?"Ubicación referencial (según dificultad indicada)":"Lugar mencionado en la ficha; posición esquemática"),item.agePending?"Edad pendiente de confirmar":"",item.interpretation?"Etiqueta interpretativa de una respuesta ambivalente":"",item.contextNote||""].filter(Boolean).join(" · ");
  tip.classList.add("is-visible");
  moveTooltip(stage,tip,event);
}

function renderEmotionMap() {
  emotionMap.innerHTML = "";
  emotionMap.setAttribute("viewBox", MAP_VIEWBOX);
  drawBaseMap(emotionMap);


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

  const filtered = DIFFICULTY_SEGMENTS.filter(item => {
    return !item.offMap && (activeFilter === "todas" || item.category === activeFilter);
  });

  filtered.forEach((item, index) => {
    difficultyLayer.appendChild(createDifficultyLine(item, index));
  });

  difficultyMap.appendChild(difficultyLayer);

  // Capa 2: emociones. Siempre se agrega al final para quedar por encima.
  {

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
    const selected = button.dataset.filter === filter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  hideMapTooltip();
  renderDifficultyMap();
}

document.querySelectorAll(".filter-link").forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

renderEmotionMap();
renderDifficultyMap();
