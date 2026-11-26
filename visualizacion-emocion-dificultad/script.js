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
   Los tramos de dificultad se basan en observaciones CL con clasificación interpretativa.
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
const LABEL_ZONES = [{"name":"Prat","x":95.45454545454545,"y":138.92045454545456,"w":35.79545454545455,"h":13.352130681818181},{"name":"Sotomayor","x":312.78409090909093,"y":138.92045454545456,"w":68.60795454545455,"h":13.352130681818181},{"name":"Serrano","x":586.3636363636364,"y":138.92045454545456,"w":49.43181818181818,"h":13.352130681818181},{"name":"Cochrane","x":576.1363636363636,"y":346.875,"w":58.38068181818182,"h":13.352130681818181},{"name":"Blanco","x":576.1363636363636,"y":565.9090909090909,"w":45.17045454545455,"h":13.352130681818181},{"name":"Errázuriz","x":576.1363636363636,"y":768.75,"w":60.51136363636364,"h":13.352130681818181},{"name":"Sotomayor","x":197.72727272727272,"y":429.97159090909093,"w":40.90909090909091,"h":9.161931818181818},{"name":"Sotomayor","x":427.8409090909091,"y":429.97159090909093,"w":40.90909090909091,"h":9.161931818181818},{"name":"Almirante Muñoz","x":653.6931818181819,"y":429.97159090909093,"w":59.23295454545455,"h":9.161931818181818},{"name":"Almirante Goñi","x":778.125,"y":429.97159090909093,"w":54.971590909090914,"h":9.161931818181818},{"name":"Almirante Pérez","x":888.9204545454546,"y":429.97159090909093,"w":57.52840909090909,"h":9.161931818181818},{"name":"Clave","x":1003.125,"y":429.97159090909093,"w":24.71590909090909,"h":9.161931818181818},{"name":"San Martín","x":1150.5681818181818,"y":429.97159090909093,"w":39.63068181818182,"h":9.161931818181818}];
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

// Clasificación interpretativa de observaciones CL. Cada franja representa una condición localizada; no una medición continua de la calle.
const DIFFICULTY_SEGMENTS = [{"id":"cl-M001-1","record":"M001","tanda":"T01","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M001","detail":"T01 · Horizontal · Completo · Amarillo. Registro M001.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M002-1","record":"M002","tanda":"T01","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M002","detail":"T01 · Horizontal · Derecha · Rojo. Registro M002.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":320.5,"x2":753.9000000000001,"y2":320.5,"stack":"cl3-3-0","displayPlace":"Cochrane · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M003-1","record":"M003","tanda":"T01","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M003","detail":"T01 · Horizontal · Derecha · Rojo. Registro M003.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":539.5,"x2":753.9000000000001,"y2":539.5,"stack":"cl4-3-0","displayPlace":"Blanco · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M004-1","record":"M004","tanda":"T01","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M004","detail":"T01 · Vertical · Completo · Amarillo. Registro M004.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M005-1","record":"M005","tanda":"T02","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M005","detail":"T02 · Horizontal · Completo · Amarillo. Registro M005.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":902.9,"y1":112.5,"x2":978.9,"y2":112.5,"stack":"cl2-3-0","displayPlace":"Serrano · sector Almte. Pérez"},{"id":"cl-M006-1","record":"M006","tanda":"T02","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Abarca ambos sectores","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M006","detail":"T02 · Horizontal · Abarca ambos sectores · Verde. Registro M006.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":331.7,"y1":112.5,"x2":407.7,"y2":112.5,"stack":"cl1-0-1","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M007-1","record":"M007","tanda":"T02","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":2,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M007","detail":"T02 · Horizontal · Derecha · Rojo. Registro M007 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":320.5,"x2":871.5,"y2":320.5,"stack":"cl3-4-0","displayPlace":"Cochrane · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M007-2","record":"M007","tanda":"T02","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":2,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M007","detail":"T02 · Horizontal · Derecha · Rojo. Registro M007 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":320.5,"x2":984,"y2":320.5,"stack":"cl3-5-0","displayPlace":"Cochrane · entre Almte. Pérez y Clave"},{"id":"cl-M008-1","record":"M008","tanda":"T02","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M008","detail":"T02 · Horizontal · Izquierda · Rojo. Registro M008.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M009-1","record":"M009","tanda":"T02","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M009","detail":"T02 · Horizontal · Derecha · Rojo. Registro M009.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":539.5,"x2":871.5,"y2":539.5,"stack":"cl4-4-0","displayPlace":"Blanco · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M010-1","record":"M010","tanda":"T02","orientation":"Horizontal","place":"Errázuriz","side":"Ambos lados","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M010","detail":"T02 · Horizontal · Ambos lados · Verde. Registro M010.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":446.8,"y1":742.3,"x2":522.8,"y2":742.3,"stack":"cl5-2-0","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M011-1","record":"M011","tanda":"T02","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Amarillo","quantity":1,"category":"descanso","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M011","detail":"T02 · Vertical · Completo · Amarillo. Registro M011.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M012-1","record":"M012","tanda":"T03","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M012","detail":"T03 · Horizontal · Completo · Verde. Registro M012.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M013-1","record":"M013","tanda":"T03","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M013","detail":"T03 · Horizontal · Derecha · Rojo. Registro M013.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":320.5,"x2":1114.85,"y2":320.5,"stack":"cl3-6-0","displayPlace":"Cochrane · entre Clave y San Martín"},{"id":"cl-M014-1","record":"M014","tanda":"T03","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M014","detail":"T03 · Horizontal · Derecha · Rojo. Registro M014.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M015-1","record":"M015","tanda":"T03","orientation":"Vertical","place":"Clave","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M015","detail":"T03 · Vertical · Completo · Amarillo. Registro M015.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M016-1","record":"M016","tanda":"T03","orientation":"Referencia vertical","place":"Echaurren","side":"Completo","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M016","detail":"T03 · Referencia vertical · Completo · Rojo. Registro M016.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1150.6,"y1":334.5,"x2":1150.6,"y2":410.5,"stack":"cl12-0-0","displayPlace":"San Martín · entre Cochrane y Blanco"},{"id":"cl-M017-1","record":"M017","tanda":"T04","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M017","detail":"T04 · Horizontal · Completo · Verde. Registro M017.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":902.9,"y1":112.5,"x2":978.9,"y2":112.5,"stack":"cl2-3-0","displayPlace":"Serrano · sector Almte. Pérez"},{"id":"cl-M018-1","record":"M018","tanda":"T04","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M018","detail":"T04 · Horizontal · Derecha · Rojo. Registro M018.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":320.5,"x2":753.9000000000001,"y2":320.5,"stack":"cl3-3-0","displayPlace":"Cochrane · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M019-1","record":"M019","tanda":"T04","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M019","detail":"T04 · Horizontal · Izquierda · Amarillo. Registro M019.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":216.7,"y1":320.5,"x2":292.7,"y2":320.5,"stack":"cl3-1-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M020-1","record":"M020","tanda":"T04","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M020","detail":"T04 · Horizontal · Derecha · Rojo. Registro M020.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M021-1","record":"M021","tanda":"T04","orientation":"Vertical","place":"Sotomayor 1","side":"Completo","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M021","detail":"T04 · Vertical · Completo · Verde. Registro M021.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":653.5,"x2":197.7,"y2":729.5,"stack":"cl6-2-1","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M022-1","record":"M022","tanda":"T04","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M022","detail":"T04 · Vertical · Completo · Rojo. Registro M022.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":126.5,"x2":427.8,"y2":202.5,"stack":"cl7-0-0","displayPlace":"Sotomayor · entre Sotomayor y Cochrane"},{"id":"cl-M023-1","record":"M023","tanda":"T04","orientation":"Vertical","place":"Clave","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M023","detail":"T04 · Vertical · Completo · Rojo. Registro M023.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M024-1","record":"M024","tanda":"T04","orientation":"Referencia vertical","place":"Echaurren","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M024","detail":"T04 · Referencia vertical · Completo · Rojo. Registro M024.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1150.6,"y1":334.5,"x2":1150.6,"y2":410.5,"stack":"cl12-0-0","displayPlace":"San Martín · entre Cochrane y Blanco"},{"id":"cl-M025-1","record":"M025","tanda":"T05","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M025","detail":"T05 · Horizontal · Completo · Verde. Registro M025.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M026-1","record":"M026","tanda":"T05","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M026","detail":"T05 · Horizontal · Derecha · Rojo. Registro M026.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":320.5,"x2":1114.85,"y2":320.5,"stack":"cl3-6-0","displayPlace":"Cochrane · entre Clave y San Martín"},{"id":"cl-M027-1","record":"M027","tanda":"T05","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M027","detail":"T05 · Horizontal · Derecha · Amarillo. Registro M027.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":539.5,"x2":1114.85,"y2":539.5,"stack":"cl4-6-0","displayPlace":"Blanco · entre Clave y San Martín"},{"id":"cl-M028-1","record":"M028","tanda":"T05","orientation":"Vertical","place":"Sotomayor 1","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M028","detail":"T05 · Vertical · Completo · Amarillo. Registro M028.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":653.5,"x2":197.7,"y2":729.5,"stack":"cl6-2-1","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M029-1","record":"M029","tanda":"T05","orientation":"Vertical","place":"Almirante Goñi","side":"Completo","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M029","detail":"T05 · Vertical · Completo · Amarillo. Registro M029.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":778.1,"y1":231.5,"x2":778.1,"y2":307.5,"stack":"cl9-0-1","displayPlace":"Almte. Goñi · entre Serrano y Cochrane"},{"id":"cl-M030-1","record":"M030","tanda":"T05","orientation":"Vertical","place":"Clave","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M030","detail":"T05 · Vertical · Completo · Rojo. Registro M030.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M031-1","record":"M031","tanda":"T05","orientation":"Intertramo vertical","place":"Entre Sotomayor y Almirante Goñi","side":"Entre ejes","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M031","detail":"T05 · Intertramo vertical · Entre ejes · Verde. Registro M031.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":334.5,"x2":653.7,"y2":410.5,"stack":"cl8-1-0","displayPlace":"Almte. Muñoz · entre Cochrane y Blanco"},{"id":"cl-M032-1","record":"M032","tanda":"T06","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Abarca ambos sectores","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M032","detail":"T06 · Horizontal · Abarca ambos sectores · Verde. Registro M032.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":331.7,"y1":112.5,"x2":407.7,"y2":112.5,"stack":"cl1-0-1","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M033-1","record":"M033","tanda":"T06","orientation":"Horizontal","place":"Cochrane","side":"Ambos lados","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M033","detail":"T06 · Horizontal · Ambos lados · Rojo. Registro M033.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M034-1","record":"M034","tanda":"T06","orientation":"Intertramo horizontal","place":"Entre Cochrane y Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M034","detail":"T06 · Intertramo horizontal · Izquierda · Rojo. Registro M034.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":539.5,"x2":142.8,"y2":539.5,"stack":"cl4-0-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M035-1","record":"M035","tanda":"T06","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M035","detail":"T06 · Horizontal · Izquierda · Rojo. Registro M035.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":539.5,"x2":142.8,"y2":539.5,"stack":"cl4-0-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M036-1","record":"M036","tanda":"T06","orientation":"Horizontal","place":"Errázuriz","side":"Ambos lados","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M036","detail":"T06 · Horizontal · Ambos lados · Amarillo. Registro M036.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":556.8,"y1":742.3,"x2":632.8,"y2":742.3,"stack":"cl5-2-1","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M037-1","record":"M037","tanda":"T07","orientation":"Horizontal","place":"Prat, Sotomayor y Serrano","side":"Izquierda","color":"Verde","quantity":2,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M037","detail":"T07 · Horizontal · Izquierda · Verde. Registro M037 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":331.7,"y1":112.5,"x2":407.7,"y2":112.5,"stack":"cl1-0-1","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M037-2","record":"M037","tanda":"T07","orientation":"Horizontal","place":"Prat, Sotomayor y Serrano","side":"Izquierda","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M037","detail":"T07 · Horizontal · Izquierda · Verde. Registro M037 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":331.7,"y1":112.5,"x2":407.7,"y2":112.5,"stack":"cl1-0-1","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M038-1","record":"M038","tanda":"T07","orientation":"Horizontal","place":"Prat, Sotomayor y Serrano","side":"Derecha","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M038","detail":"T07 · Horizontal · Derecha · Verde. Registro M038.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M039-1","record":"M039","tanda":"T07","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Amarillo","quantity":2,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M039","detail":"T07 · Horizontal · Izquierda · Amarillo. Registro M039 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":331.7,"y1":320.5,"x2":407.7,"y2":320.5,"stack":"cl3-1-1","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M039-2","record":"M039","tanda":"T07","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Amarillo","quantity":2,"category":"descanso","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M039","detail":"T07 · Horizontal · Izquierda · Amarillo. Registro M039 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M040-1","record":"M040","tanda":"T07","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M040","detail":"T07 · Horizontal · Izquierda · Rojo. Registro M040.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":539.5,"x2":292.7,"y2":539.5,"stack":"cl4-1-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M041-1","record":"M041","tanda":"T07","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M041","detail":"T07 · Horizontal · Izquierda · Amarillo. Registro M041.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":742.3,"x2":142.8,"y2":742.3,"stack":"cl5-0-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M042-1","record":"M042","tanda":"T07","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M042","detail":"T07 · Horizontal · Izquierda · Verde. Registro M042.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":742.3,"x2":292.7,"y2":742.3,"stack":"cl5-1-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M043-1","record":"M043","tanda":"T07","orientation":"Vertical","place":"Clave","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M043","detail":"T07 · Vertical · Completo · Rojo. Registro M043.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M044-1","record":"M044","tanda":"T07","orientation":"Referencia vertical","place":"Echaurren","side":"Completo","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M044","detail":"T07 · Referencia vertical · Completo · Rojo. Registro M044.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":334.5,"x2":1003.1,"y2":410.5,"stack":"cl11-0-0","displayPlace":"Clave · entre Cochrane y Blanco"},{"id":"cl-M045-1","record":"M045","tanda":"T08","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M045","detail":"T08 · Horizontal · Completo · Amarillo. Registro M045.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":112.5,"x2":142.8,"y2":112.5,"stack":"cl0-0-0","displayPlace":"Prat · sector Sotomayor"},{"id":"cl-M046-1","record":"M046","tanda":"T08","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M046","detail":"T08 · Horizontal · Completo · Verde. Registro M046.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":112.5,"x2":292.7,"y2":112.5,"stack":"cl1-0-0","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M047-1","record":"M047","tanda":"T08","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M047","detail":"T08 · Horizontal · Completo · Verde. Registro M047.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":902.9,"y1":112.5,"x2":978.9,"y2":112.5,"stack":"cl2-3-0","displayPlace":"Serrano · sector Almte. Pérez"},{"id":"cl-M048-1","record":"M048","tanda":"T08","orientation":"Horizontal","place":"Cochrane","side":"Ambos lados","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M048","detail":"T08 · Horizontal · Ambos lados · Rojo. Registro M048.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M049-1","record":"M049","tanda":"T08","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M049","detail":"T08 · Horizontal · Izquierda · Verde. Registro M049.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":539.5,"x2":142.8,"y2":539.5,"stack":"cl4-0-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M050-1","record":"M050","tanda":"T08","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M050","detail":"T08 · Horizontal · Izquierda · Amarillo. Registro M050.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":216.7,"y1":539.5,"x2":292.7,"y2":539.5,"stack":"cl4-1-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M051-1","record":"M051","tanda":"T08","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Amarillo","quantity":2,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M051","detail":"T08 · Horizontal · Derecha · Amarillo. Registro M051 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":539.5,"x2":871.5,"y2":539.5,"stack":"cl4-4-0","displayPlace":"Blanco · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M051-2","record":"M051","tanda":"T08","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Amarillo","quantity":2,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M051","detail":"T08 · Horizontal · Derecha · Amarillo. Registro M051 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M052-1","record":"M052","tanda":"T08","orientation":"Vertical","place":"Clave","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M052","detail":"T08 · Vertical · Completo · Rojo. Registro M052.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M053-1","record":"M053","tanda":"T09","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":3,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M053","detail":"T09 · Horizontal · Izquierda · Verde. Registro M053 (una de 3 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":446.8,"y1":742.3,"x2":522.8,"y2":742.3,"stack":"cl5-2-0","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M053-2","record":"M053","tanda":"T09","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":3,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M053","detail":"T09 · Horizontal · Izquierda · Verde. Registro M053 (una de 3 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":556.8,"y1":742.3,"x2":632.8,"y2":742.3,"stack":"cl5-2-1","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M053-3","record":"M053","tanda":"T09","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":3,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M053","detail":"T09 · Horizontal · Izquierda · Verde. Registro M053 (una de 3 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":742.3,"x2":142.8,"y2":742.3,"stack":"cl5-0-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M054-1","record":"M054","tanda":"T09","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M054","detail":"T09 · Horizontal · Izquierda · Amarillo. Registro M054.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":742.3,"x2":292.7,"y2":742.3,"stack":"cl5-1-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M055-1","record":"M055","tanda":"T09","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M055","detail":"T09 · Horizontal · Izquierda · Rojo. Registro M055.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":539.5,"x2":142.8,"y2":539.5,"stack":"cl4-0-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M056-1","record":"M056","tanda":"T09","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M056","detail":"T09 · Horizontal · Derecha · Rojo. Registro M056.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M057-1","record":"M057","tanda":"T09","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Amarillo","quantity":1,"category":"descanso","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M057","detail":"T09 · Horizontal · Derecha · Amarillo. Registro M057.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":539.5,"x2":1114.85,"y2":539.5,"stack":"cl4-6-0","displayPlace":"Blanco · entre Clave y San Martín"},{"id":"cl-M058-1","record":"M058","tanda":"T09","orientation":"Intertramo vertical","place":"Entre Sotomayor 1 y 2","side":"Entre ejes","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M058","detail":"T09 · Intertramo vertical · Entre ejes · Verde. Registro M058.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":231.5,"x2":197.7,"y2":307.5,"stack":"cl6-0-1","displayPlace":"Sotomayor · entre Prat y Cochrane"},{"id":"cl-M059-1","record":"M059","tanda":"T09","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M059","detail":"T09 · Vertical · Completo · Verde. Registro M059.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M060-1","record":"M060","tanda":"T09","orientation":"Vertical","place":"Almirante Muñoz","side":"Completo","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M060","detail":"T09 · Vertical · Completo · Rojo. Registro M060.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":334.5,"x2":653.7,"y2":410.5,"stack":"cl8-1-0","displayPlace":"Almte. Muñoz · entre Cochrane y Blanco"},{"id":"cl-M061-1","record":"M061","tanda":"T09","orientation":"Vertical","place":"Almirante Goñi","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M061","detail":"T09 · Vertical · Completo · Rojo. Registro M061.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":778.1,"y1":126.5,"x2":778.1,"y2":202.5,"stack":"cl9-0-0","displayPlace":"Almte. Goñi · entre Serrano y Cochrane"},{"id":"cl-M062-1","record":"M062","tanda":"T10","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Verde","quantity":2,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M062","detail":"T10 · Horizontal · Completo · Verde. Registro M062 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":112.5,"x2":142.8,"y2":112.5,"stack":"cl0-0-0","displayPlace":"Prat · sector Sotomayor"},{"id":"cl-M062-2","record":"M062","tanda":"T10","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M062","detail":"T10 · Horizontal · Completo · Verde. Registro M062 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":112.5,"x2":292.7,"y2":112.5,"stack":"cl1-0-0","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M063-1","record":"M063","tanda":"T10","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":2,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M063","detail":"T10 · Horizontal · Completo · Verde. Registro M063 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1097.9,"y1":112.5,"x2":1173.9,"y2":112.5,"stack":"cl2-3-2","displayPlace":"Serrano · sector Almte. Pérez"},{"id":"cl-M063-2","record":"M063","tanda":"T10","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M063","detail":"T10 · Horizontal · Completo · Verde. Registro M063 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M064-1","record":"M064","tanda":"T10","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M064","detail":"T10 · Horizontal · Completo · Amarillo. Registro M064.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":902.9,"y1":112.5,"x2":978.9,"y2":112.5,"stack":"cl2-3-0","displayPlace":"Serrano · sector Almte. Pérez"},{"id":"cl-M065-1","record":"M065","tanda":"T10","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M065","detail":"T10 · Horizontal · Izquierda · Rojo. Registro M065.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":320.5,"x2":292.7,"y2":320.5,"stack":"cl3-1-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M066-1","record":"M066","tanda":"T10","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M066","detail":"T10 · Horizontal · Derecha · Rojo. Registro M066.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":320.5,"x2":753.9000000000001,"y2":320.5,"stack":"cl3-3-0","displayPlace":"Cochrane · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M067-1","record":"M067","tanda":"T10","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M067","detail":"T10 · Horizontal · Derecha · Rojo. Registro M067.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":539.5,"x2":753.9000000000001,"y2":539.5,"stack":"cl4-3-0","displayPlace":"Blanco · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M068-1","record":"M068","tanda":"T10","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M068","detail":"T10 · Horizontal · Derecha · Amarillo. Registro M068.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":907.7,"y1":742.3,"x2":983.7,"y2":742.3,"stack":"cl5-3-2","displayPlace":"Errázuriz · entre Almte. Muñoz y Clave"},{"id":"cl-M069-1","record":"M069","tanda":"T10","orientation":"Intertramo vertical","place":"A la izquierda de Sotomayor 1","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M069","detail":"T10 · Intertramo vertical · Izquierda · Rojo. Registro M069.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":653.5,"x2":197.7,"y2":729.5,"stack":"cl6-2-1","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M070-1","record":"M070","tanda":"T10","orientation":"Vertical","place":"Sotomayor 1","side":"Completo","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M070","detail":"T10 · Vertical · Completo · Rojo. Registro M070.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":553.5,"x2":197.7,"y2":629.5,"stack":"cl6-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M071-1","record":"M071","tanda":"T10","orientation":"Vertical","place":"Clave","side":"Completo","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M071","detail":"T10 · Vertical · Completo · Amarillo. Registro M071.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M072-1","record":"M072","tanda":"T10","orientation":"Referencia vertical","place":"Echaurren","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M072","detail":"T10 · Referencia vertical · Completo · Amarillo. Registro M072.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":334.5,"x2":1003.1,"y2":410.5,"stack":"cl11-0-0","displayPlace":"Clave · entre Cochrane y Blanco"},{"id":"cl-M073-1","record":"M073","tanda":"T10","orientation":"Referencia vertical","place":"Echaurren","side":"Completo","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M073","detail":"T10 · Referencia vertical · Completo · Rojo. Registro M073.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1150.6,"y1":334.5,"x2":1150.6,"y2":410.5,"stack":"cl12-0-0","displayPlace":"San Martín · entre Cochrane y Blanco"},{"id":"cl-M074-1","record":"M074","tanda":"T11","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M074","detail":"T11 · Horizontal · Completo · Verde. Registro M074.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":112.5,"x2":142.8,"y2":112.5,"stack":"cl0-0-0","displayPlace":"Prat · sector Sotomayor"},{"id":"cl-M075-1","record":"M075","tanda":"T11","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M075","detail":"T11 · Horizontal · Completo · Amarillo. Registro M075.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":446.8,"y1":112.5,"x2":522.8,"y2":112.5,"stack":"cl2-0-0","displayPlace":"Serrano · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M076-1","record":"M076","tanda":"T11","orientation":"Intertramo horizontal","place":"Entre Sotomayor y Cochrane","side":"Izquierda","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M076","detail":"T11 · Intertramo horizontal · Izquierda · Verde. Registro M076.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":112.5,"x2":142.8,"y2":112.5,"stack":"cl0-0-0","displayPlace":"Prat · sector Sotomayor"},{"id":"cl-M077-1","record":"M077","tanda":"T11","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M077","detail":"T11 · Horizontal · Izquierda · Rojo. Registro M077.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":331.7,"y1":320.5,"x2":407.7,"y2":320.5,"stack":"cl3-1-1","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M078-1","record":"M078","tanda":"T11","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M078","detail":"T11 · Horizontal · Derecha · Rojo. Registro M078.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":320.5,"x2":871.5,"y2":320.5,"stack":"cl3-4-0","displayPlace":"Cochrane · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M079-1","record":"M079","tanda":"T11","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Amarillo","quantity":2,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M079","detail":"T11 · Horizontal · Derecha · Amarillo. Registro M079 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":320.5,"x2":984,"y2":320.5,"stack":"cl3-5-0","displayPlace":"Cochrane · entre Almte. Pérez y Clave"},{"id":"cl-M079-2","record":"M079","tanda":"T11","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Amarillo","quantity":2,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M079","detail":"T11 · Horizontal · Derecha · Amarillo. Registro M079 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":1038.85,"y1":320.5,"x2":1114.85,"y2":320.5,"stack":"cl3-6-0","displayPlace":"Cochrane · entre Clave y San Martín"},{"id":"cl-M080-1","record":"M080","tanda":"T11","orientation":"Intertramo horizontal","place":"Entre Cochrane y Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M080","detail":"T11 · Intertramo horizontal · Derecha · Rojo. Registro M080.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":539.5,"x2":753.9000000000001,"y2":539.5,"stack":"cl4-3-0","displayPlace":"Blanco · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M081-1","record":"M081","tanda":"T11","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Rojo","quantity":2,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M081","detail":"T11 · Horizontal · Izquierda · Rojo. Registro M081 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":539.5,"x2":292.7,"y2":539.5,"stack":"cl4-1-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M081-2","record":"M081","tanda":"T11","orientation":"Horizontal","place":"Blanco","side":"Izquierda","color":"Rojo","quantity":2,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M081","detail":"T11 · Horizontal · Izquierda · Rojo. Registro M081 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":539.5,"x2":142.8,"y2":539.5,"stack":"cl4-0-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M082-1","record":"M082","tanda":"T11","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":2,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M082","detail":"T11 · Horizontal · Derecha · Rojo. Registro M082 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":539.5,"x2":871.5,"y2":539.5,"stack":"cl4-4-0","displayPlace":"Blanco · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M082-2","record":"M082","tanda":"T11","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":2,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M082","detail":"T11 · Horizontal · Derecha · Rojo. Registro M082 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M083-1","record":"M083","tanda":"T11","orientation":"Horizontal","place":"Errázuriz","side":"Completo","color":"Verde","quantity":2,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M083","detail":"T11 · Horizontal · Completo · Verde. Registro M083 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":742.3,"x2":142.8,"y2":742.3,"stack":"cl5-0-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M083-2","record":"M083","tanda":"T11","orientation":"Horizontal","place":"Errázuriz","side":"Completo","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M083","detail":"T11 · Horizontal · Completo · Verde. Registro M083 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":742.3,"x2":292.7,"y2":742.3,"stack":"cl5-1-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M084-1","record":"M084","tanda":"T11","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Amarillo","quantity":1,"category":"descanso","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M084","detail":"T11 · Horizontal · Derecha · Amarillo. Registro M084.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":742.3,"x2":1114.85,"y2":742.3,"stack":"cl5-4-0","displayPlace":"Errázuriz · entre Clave y San Martín"},{"id":"cl-M085-1","record":"M085","tanda":"T11","orientation":"Vertical","place":"Sotomayor 1","side":"Completo","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M085","detail":"T11 · Vertical · Completo · Amarillo. Registro M085.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":653.5,"x2":197.7,"y2":729.5,"stack":"cl6-2-1","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M086-1","record":"M086","tanda":"T11","orientation":"Intertramo vertical","place":"Entre Sotomayor 1 y 2","side":"Entre ejes","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M086","detail":"T11 · Intertramo vertical · Entre ejes · Verde. Registro M086.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":334.5,"x2":427.8,"y2":410.5,"stack":"cl7-1-0","displayPlace":"Sotomayor · entre Cochrane y Blanco"},{"id":"cl-M087-1","record":"M087","tanda":"T11","orientation":"Intertramo vertical","place":"Entre Sotomayor 2 y Almirante Muñoz","side":"Entre ejes","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M087","detail":"T11 · Intertramo vertical · Entre ejes · Rojo. Registro M087.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":334.5,"x2":653.7,"y2":410.5,"stack":"cl8-1-0","displayPlace":"Almte. Muñoz · entre Cochrane y Blanco"},{"id":"cl-M088-1","record":"M088","tanda":"T11","orientation":"Vertical","place":"Almirante Pérez","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M088","detail":"T11 · Vertical · Completo · Amarillo. Registro M088.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":888.9,"y1":231.5,"x2":888.9,"y2":307.5,"stack":"cl10-0-1","displayPlace":"Almte. Pérez · entre Serrano y Cochrane"},{"id":"cl-M089-1","record":"M089","tanda":"T11","orientation":"Vertical","place":"Clave","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M089","detail":"T11 · Vertical · Completo · Rojo. Registro M089.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M092-1","record":"M092","tanda":"T12","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M092","detail":"T12 · Horizontal · Izquierda · Rojo. Registro M092.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M093-1","record":"M093","tanda":"T12","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M093","detail":"T12 · Horizontal · Izquierda · Amarillo. Registro M093.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":216.7,"y1":320.5,"x2":292.7,"y2":320.5,"stack":"cl3-1-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M094-1","record":"M094","tanda":"T12","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M094","detail":"T12 · Horizontal · Derecha · Rojo. Registro M094.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":320.5,"x2":753.9000000000001,"y2":320.5,"stack":"cl3-3-0","displayPlace":"Cochrane · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M095-1","record":"M095","tanda":"T12","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M095","detail":"T12 · Horizontal · Derecha · Amarillo. Registro M095.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":320.5,"x2":1114.85,"y2":320.5,"stack":"cl3-6-0","displayPlace":"Cochrane · entre Clave y San Martín"},{"id":"cl-M096-1","record":"M096","tanda":"T12","orientation":"Intertramo horizontal","place":"Entre Cochrane y Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M096","detail":"T12 · Intertramo horizontal · Izquierda · Rojo. Registro M096.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M097-1","record":"M097","tanda":"T12","orientation":"Intertramo horizontal","place":"Entre Cochrane y Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M097","detail":"T12 · Intertramo horizontal · Derecha · Rojo. Registro M097.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M098-1","record":"M098","tanda":"T12","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M098","detail":"T12 · Horizontal · Derecha · Amarillo. Registro M098.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M099-1","record":"M099","tanda":"T12","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M099","detail":"T12 · Horizontal · Derecha · Rojo. Registro M099.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":539.5,"x2":1114.85,"y2":539.5,"stack":"cl4-6-0","displayPlace":"Blanco · entre Clave y San Martín"},{"id":"cl-M100-1","record":"M100","tanda":"T12","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M100","detail":"T12 · Horizontal · Izquierda · Verde. Registro M100 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":446.8,"y1":742.3,"x2":522.8,"y2":742.3,"stack":"cl5-2-0","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M100-2","record":"M100","tanda":"T12","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":2,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M100","detail":"T12 · Horizontal · Izquierda · Verde. Registro M100 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":556.8,"y1":742.3,"x2":632.8,"y2":742.3,"stack":"cl5-2-1","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M101-1","record":"M101","tanda":"T12","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M101","detail":"T12 · Horizontal · Derecha · Amarillo. Registro M101.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":907.7,"y1":742.3,"x2":983.7,"y2":742.3,"stack":"cl5-3-2","displayPlace":"Errázuriz · entre Almte. Muñoz y Clave"},{"id":"cl-M102-1","record":"M102","tanda":"T12","orientation":"Vertical","place":"Sotomayor 1","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M102","detail":"T12 · Vertical · Completo · Verde. Registro M102.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":553.5,"x2":197.7,"y2":629.5,"stack":"cl6-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M103-1","record":"M103","tanda":"T12","orientation":"Intertramo vertical","place":"Entre Sotomayor 1 y 2","side":"Entre ejes","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M103","detail":"T12 · Intertramo vertical · Entre ejes · Verde. Registro M103.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M104-1","record":"M104","tanda":"T12","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M104","detail":"T12 · Vertical · Completo · Verde. Registro M104.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":231.5,"x2":427.8,"y2":307.5,"stack":"cl7-0-1","displayPlace":"Sotomayor · entre Sotomayor y Cochrane"},{"id":"cl-M105-1","record":"M105","tanda":"T12","orientation":"Intertramo vertical","place":"Entre Sotomayor 2 y Almirante Muñoz","side":"Entre ejes","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M105","detail":"T12 · Intertramo vertical · Entre ejes · Rojo. Registro M105.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":653.5,"x2":653.7,"y2":729.5,"stack":"cl8-2-1","displayPlace":"Almte. Muñoz · entre Blanco y Errázuriz"},{"id":"cl-M106-1","record":"M106","tanda":"T12","orientation":"Vertical","place":"Almirante Pérez","side":"Completo","color":"Amarillo","quantity":1,"category":"descanso","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M106","detail":"T12 · Vertical · Completo · Amarillo. Registro M106.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":888.9,"y1":449.5,"x2":888.9,"y2":525.5,"stack":"cl10-1-1","displayPlace":"Almte. Pérez · entre Cochrane y Blanco"},{"id":"cl-M107-1","record":"M107","tanda":"T12","orientation":"Vertical","place":"Clave","side":"Completo","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M107","detail":"T12 · Vertical · Completo · Rojo. Registro M107.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":334.5,"x2":1003.1,"y2":410.5,"stack":"cl11-0-0","displayPlace":"Clave · entre Cochrane y Blanco"},{"id":"cl-M108-1","record":"M108","tanda":"T13","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Amarillo","quantity":2,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M108","detail":"T13 · Horizontal · Completo · Amarillo. Registro M108 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":112.5,"x2":292.7,"y2":112.5,"stack":"cl1-0-0","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M108-2","record":"M108","tanda":"T13","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Amarillo","quantity":2,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M108","detail":"T13 · Horizontal · Completo · Amarillo. Registro M108 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":66.8,"y1":112.5,"x2":142.8,"y2":112.5,"stack":"cl0-0-0","displayPlace":"Prat · sector Sotomayor"},{"id":"cl-M109-1","record":"M109","tanda":"T13","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M109","detail":"T13 · Horizontal · Completo · Verde. Registro M109.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M110-1","record":"M110","tanda":"T13","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M110","detail":"T13 · Horizontal · Completo · Amarillo. Registro M110.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":112.5,"x2":871.5,"y2":112.5,"stack":"cl2-2-0","displayPlace":"Serrano · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M111-1","record":"M111","tanda":"T13","orientation":"Intertramo horizontal","place":"Entre Serrano y Cochrane","side":"Entre ejes","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M111","detail":"T13 · Intertramo horizontal · Entre ejes · Verde. Registro M111.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":556.8,"y1":112.5,"x2":632.8,"y2":112.5,"stack":"cl2-0-1","displayPlace":"Serrano · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M112-1","record":"M112","tanda":"T13","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M112","detail":"T13 · Horizontal · Izquierda · Verde. Registro M112.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":331.7,"y1":320.5,"x2":407.7,"y2":320.5,"stack":"cl3-1-1","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M113-1","record":"M113","tanda":"T13","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M113","detail":"T13 · Horizontal · Izquierda · Rojo. Registro M113.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M114-1","record":"M114","tanda":"T13","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M114","detail":"T13 · Horizontal · Derecha · Rojo. Registro M114.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":320.5,"x2":753.9000000000001,"y2":320.5,"stack":"cl3-3-0","displayPlace":"Cochrane · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M115-1","record":"M115","tanda":"T13","orientation":"Intertramo horizontal","place":"Entre Cochrane y Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M115","detail":"T13 · Intertramo horizontal · Izquierda · Rojo. Registro M115.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":539.5,"x2":142.8,"y2":539.5,"stack":"cl4-0-0","displayPlace":"Blanco · sector Sotomayor"},{"id":"cl-M116-1","record":"M116","tanda":"T13","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M116","detail":"T13 · Horizontal · Derecha · Rojo. Registro M116.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":539.5,"x2":871.5,"y2":539.5,"stack":"cl4-4-0","displayPlace":"Blanco · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M117-1","record":"M117","tanda":"T13","orientation":"Horizontal","place":"Blanco","side":"Derecha","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M117","detail":"T13 · Horizontal · Derecha · Amarillo. Registro M117.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":539.5,"x2":984,"y2":539.5,"stack":"cl4-5-0","displayPlace":"Blanco · entre Almte. Pérez y Clave"},{"id":"cl-M118-1","record":"M118","tanda":"T13","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M118","detail":"T13 · Horizontal · Izquierda · Verde. Registro M118.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":742.3,"x2":142.8,"y2":742.3,"stack":"cl5-0-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M119-1","record":"M119","tanda":"T13","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M119","detail":"T13 · Horizontal · Derecha · Amarillo. Registro M119.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":1038.85,"y1":742.3,"x2":1114.85,"y2":742.3,"stack":"cl5-4-0","displayPlace":"Errázuriz · entre Clave y San Martín"},{"id":"cl-M120-1","record":"M120","tanda":"T13","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M120","detail":"T13 · Horizontal · Derecha · Rojo. Registro M120.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":907.7,"y1":742.3,"x2":983.7,"y2":742.3,"stack":"cl5-3-2","displayPlace":"Errázuriz · entre Almte. Muñoz y Clave"},{"id":"cl-M121-1","record":"M121","tanda":"T13","orientation":"Intertramo vertical","place":"A la izquierda de Sotomayor 1","side":"Izquierda","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M121","detail":"T13 · Intertramo vertical · Izquierda · Verde. Registro M121.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":197.7,"y1":653.5,"x2":197.7,"y2":729.5,"stack":"cl6-2-1","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M122-1","record":"M122","tanda":"T13","orientation":"Intertramo vertical","place":"Entre Sotomayor 1 y 2","side":"Entre ejes","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M122","detail":"T13 · Intertramo vertical · Entre ejes · Rojo. Registro M122.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M123-1","record":"M123","tanda":"T13","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M123","detail":"T13 · Vertical · Completo · Verde. Registro M123.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M124-1","record":"M124","tanda":"T13","orientation":"Intertramo vertical","place":"Entre Sotomayor 2 y Almirante Muñoz","side":"Entre ejes","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M124","detail":"T13 · Intertramo vertical · Entre ejes · Verde. Registro M124.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":334.5,"x2":653.7,"y2":410.5,"stack":"cl8-1-0","displayPlace":"Almte. Muñoz · entre Cochrane y Blanco"},{"id":"cl-M125-1","record":"M125","tanda":"T13","orientation":"Vertical","place":"Almirante Muñoz","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M125","detail":"T13 · Vertical · Completo · Rojo. Registro M125.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":334.5,"x2":653.7,"y2":410.5,"stack":"cl8-1-0","displayPlace":"Almte. Muñoz · entre Cochrane y Blanco"},{"id":"cl-M126-1","record":"M126","tanda":"T13","orientation":"Vertical","place":"Almirante Goñi","side":"Completo","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M126","detail":"T13 · Vertical · Completo · Rojo. Registro M126.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":778.1,"y1":449.5,"x2":778.1,"y2":525.5,"stack":"cl9-1-1","displayPlace":"Almte. Goñi · entre Cochrane y Blanco"},{"id":"cl-M127-1","record":"M127","tanda":"T13","orientation":"Vertical","place":"Clave","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M127","detail":"T13 · Vertical · Completo · Amarillo. Registro M127.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1003.1,"y1":553.5,"x2":1003.1,"y2":629.5,"stack":"cl11-1-0","displayPlace":"Clave · entre Blanco y Errázuriz"},{"id":"cl-M128-1","record":"M128","tanda":"T14","orientation":"Horizontal","place":"Prat y Sotomayor","side":"Completo","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M128","detail":"T14 · Horizontal · Completo · Amarillo. Registro M128.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":216.7,"y1":112.5,"x2":292.7,"y2":112.5,"stack":"cl1-0-0","displayPlace":"Sotomayor · sector Sotomayor"},{"id":"cl-M129-1","record":"M129","tanda":"T14","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M129","detail":"T14 · Horizontal · Completo · Verde. Registro M129 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":446.8,"y1":112.5,"x2":522.8,"y2":112.5,"stack":"cl2-0-0","displayPlace":"Serrano · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M129-2","record":"M129","tanda":"T14","orientation":"Horizontal","place":"Serrano","side":"Completo","color":"Verde","quantity":2,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M129","detail":"T14 · Horizontal · Completo · Verde. Registro M129 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":677.9000000000001,"y1":112.5,"x2":753.9000000000001,"y2":112.5,"stack":"cl2-1-0","displayPlace":"Serrano · entre Almte. Muñoz y Almte. Goñi"},{"id":"cl-M130-1","record":"M130","tanda":"T14","orientation":"Intertramo horizontal","place":"Entre Serrano y Cochrane","side":"Entre ejes","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M130","detail":"T14 · Intertramo horizontal · Entre ejes · Verde. Registro M130.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":556.8,"y1":320.5,"x2":632.8,"y2":320.5,"stack":"cl3-2-1","displayPlace":"Cochrane · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M131-1","record":"M131","tanda":"T14","orientation":"Horizontal","place":"Cochrane","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M131","detail":"T14 · Horizontal · Izquierda · Rojo. Registro M131.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":320.5,"x2":292.7,"y2":320.5,"stack":"cl3-1-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M132-1","record":"M132","tanda":"T14","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":2,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M132","detail":"T14 · Horizontal · Derecha · Rojo. Registro M132 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":795.5,"y1":320.5,"x2":871.5,"y2":320.5,"stack":"cl3-4-0","displayPlace":"Cochrane · entre Almte. Goñi y Almte. Pérez"},{"id":"cl-M132-2","record":"M132","tanda":"T14","orientation":"Horizontal","place":"Cochrane","side":"Derecha","color":"Rojo","quantity":2,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M132","detail":"T14 · Horizontal · Derecha · Rojo. Registro M132 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":908,"y1":320.5,"x2":984,"y2":320.5,"stack":"cl3-5-0","displayPlace":"Cochrane · entre Almte. Pérez y Clave"},{"id":"cl-M133-1","record":"M133","tanda":"T14","orientation":"Intertramo horizontal","place":"Entre Cochrane y Blanco","side":"Izquierda","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M133","detail":"T14 · Intertramo horizontal · Izquierda · Rojo. Registro M133.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":66.8,"y1":320.5,"x2":142.8,"y2":320.5,"stack":"cl3-0-0","displayPlace":"Cochrane · sector Sotomayor"},{"id":"cl-M134-1","record":"M134","tanda":"T14","orientation":"Intertramo horizontal","place":"Entre Blanco y Errázuriz","side":"Izquierda","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M134","detail":"T14 · Intertramo horizontal · Izquierda · Verde. Registro M134 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":446.8,"y1":539.5,"x2":522.8,"y2":539.5,"stack":"cl4-2-0","displayPlace":"Blanco · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M134-2","record":"M134","tanda":"T14","orientation":"Intertramo horizontal","place":"Entre Blanco y Errázuriz","side":"Izquierda","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M134","detail":"T14 · Intertramo horizontal · Izquierda · Verde. Registro M134 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":446.8,"y1":742.3,"x2":522.8,"y2":742.3,"stack":"cl5-2-0","displayPlace":"Errázuriz · entre Sotomayor y Almte. Muñoz"},{"id":"cl-M135-1","record":"M135","tanda":"T14","orientation":"Intertramo horizontal","place":"Entre Blanco y Errázuriz","side":"Derecha","color":"Amarillo","quantity":1,"category":"descanso","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M135","detail":"T14 · Intertramo horizontal · Derecha · Amarillo. Registro M135.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":672.7,"y1":742.3,"x2":748.7,"y2":742.3,"stack":"cl5-3-0","displayPlace":"Errázuriz · entre Almte. Muñoz y Clave"},{"id":"cl-M136-1","record":"M136","tanda":"T14","orientation":"Horizontal","place":"Errázuriz","side":"Izquierda","color":"Verde","quantity":1,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M136","detail":"T14 · Horizontal · Izquierda · Verde. Registro M136.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":216.7,"y1":742.3,"x2":292.7,"y2":742.3,"stack":"cl5-1-0","displayPlace":"Errázuriz · sector Sotomayor"},{"id":"cl-M137-1","record":"M137","tanda":"T14","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Rojo","quantity":1,"category":"descanso","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M137","detail":"T14 · Horizontal · Derecha · Rojo. Registro M137.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1038.85,"y1":742.3,"x2":1114.85,"y2":742.3,"stack":"cl5-4-0","displayPlace":"Errázuriz · entre Clave y San Martín"},{"id":"cl-M138-1","record":"M138","tanda":"T14","orientation":"Horizontal","place":"Errázuriz","side":"Derecha","color":"Amarillo","quantity":1,"category":"orientacion","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M138","detail":"T14 · Horizontal · Derecha · Amarillo. Registro M138.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":907.7,"y1":742.3,"x2":983.7,"y2":742.3,"stack":"cl5-3-2","displayPlace":"Errázuriz · entre Almte. Muñoz y Clave"},{"id":"cl-M139-1","record":"M139","tanda":"T14","orientation":"Intertramo vertical","place":"Entre Sotomayor 1 y 2","side":"Entre ejes","color":"Verde","quantity":1,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M139","detail":"T14 · Intertramo vertical · Entre ejes · Verde. Registro M139.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M140-1","record":"M140","tanda":"T14","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Verde","quantity":1,"category":"superficie","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M140","detail":"T14 · Vertical · Completo · Verde. Registro M140.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":126.5,"x2":427.8,"y2":202.5,"stack":"cl7-0-0","displayPlace":"Sotomayor · entre Sotomayor y Cochrane"},{"id":"cl-M141-1","record":"M141","tanda":"T14","orientation":"Vertical","place":"Sotomayor 2","side":"Completo","color":"Amarillo","quantity":1,"category":"superficie","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M141","detail":"T14 · Vertical · Completo · Amarillo. Registro M141.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":553.5,"x2":427.8,"y2":629.5,"stack":"cl7-2-0","displayPlace":"Sotomayor · entre Blanco y Errázuriz"},{"id":"cl-M142-1","record":"M142","tanda":"T14","orientation":"Intertramo vertical","place":"Entre Sotomayor 2 y Almirante Muñoz","side":"Entre ejes","color":"Verde","quantity":2,"category":"orientacion","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M142","detail":"T14 · Intertramo vertical · Entre ejes · Verde. Registro M142 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":653.7,"y1":653.5,"x2":653.7,"y2":729.5,"stack":"cl8-2-1","displayPlace":"Almte. Muñoz · entre Blanco y Errázuriz"},{"id":"cl-M142-2","record":"M142","tanda":"T14","orientation":"Intertramo vertical","place":"Entre Sotomayor 2 y Almirante Muñoz","side":"Entre ejes","color":"Verde","quantity":2,"category":"descanso","level":"facil","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M142","detail":"T14 · Intertramo vertical · Entre ejes · Verde. Registro M142 (una de 2 franjas).","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":427.8,"y1":334.5,"x2":427.8,"y2":410.5,"stack":"cl7-1-0","displayPlace":"Sotomayor · entre Cochrane y Blanco"},{"id":"cl-M143-1","record":"M143","tanda":"T14","orientation":"Vertical","place":"Almirante Goñi","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M143","detail":"T14 · Vertical · Completo · Rojo. Registro M143.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":778.1,"y1":334.5,"x2":778.1,"y2":410.5,"stack":"cl9-1-0","displayPlace":"Almte. Goñi · entre Cochrane y Blanco"},{"id":"cl-M144-1","record":"M144","tanda":"T14","orientation":"Vertical","place":"Almirante Pérez","side":"Completo","color":"Rojo","quantity":1,"category":"orientacion","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M144","detail":"T14 · Vertical · Completo · Rojo. Registro M144.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":888.9,"y1":449.5,"x2":888.9,"y2":525.5,"stack":"cl10-1-1","displayPlace":"Almte. Pérez · entre Cochrane y Blanco"},{"id":"cl-M145-1","record":"M145","tanda":"T14","orientation":"Vertical","place":"Clave","side":"Completo","color":"Amarillo","quantity":1,"category":"pendiente","level":"media","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M145","detail":"T14 · Vertical · Completo · Amarillo. Registro M145.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Sin filtro asignado; visible en Todas.","x1":1003.1,"y1":334.5,"x2":1003.1,"y2":410.5,"stack":"cl11-0-0","displayPlace":"Clave · entre Cochrane y Blanco"},{"id":"cl-M146-1","record":"M146","tanda":"T14","orientation":"Referencia vertical","place":"Echaurren","side":"Completo","color":"Rojo","quantity":1,"category":"superficie","level":"alta","source":"Codificación modelo Grupo 3 · 02 Franjas detalle · M146","detail":"T14 · Referencia vertical · Completo · Rojo. Registro M146.","locationNote":"Ubicación gráfica referencial según el tramo y costado registrados. Categoría provisional según la distribución de cantidades indicada, no identificada individualmente en la planilla.","x1":1150.6,"y1":334.5,"x2":1150.6,"y2":410.5,"stack":"cl12-0-0","displayPlace":"San Martín · entre Cochrane y Blanco"}];

const ARG_EMOTIONS = [
  {
    "id": "arg-4-1",
    "sourceRow": 4,
    "level": 1,
    "label": "Alegría",
    "difficulty": 2,
    "place": "Talcahuano",
    "quote": "Me encanta.",
    "x": 390,
    "y": 115,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-5-1",
    "sourceRow": 5,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 3,
    "place": "Plaza Lavalle",
    "quote": "Vivo a tres cuadras de aquí, me encanta el sector.",
    "x": 520,
    "y": 175,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-6-1",
    "sourceRow": 6,
    "level": 1,
    "label": "Paz",
    "difficulty": 1,
    "place": "Uruguay",
    "quote": "Me encanta. Me siento segura. Practica taichí.",
    "x": 130,
    "y": 150,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-7-1",
    "sourceRow": 7,
    "level": 1,
    "label": "Felicidad, emoción y tranquilidad",
    "difficulty": 1,
    "place": "Talcahuano",
    "quote": "Vivo a 25 cuadras de aquí y tengo una librería.",
    "x": 390,
    "y": 175,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-8-1",
    "sourceRow": 8,
    "level": 1,
    "label": "Comodidad",
    "difficulty": 1,
    "place": "Talcahuano",
    "quote": "Me gusta, se siente cómodo.",
    "x": 390,
    "y": 225,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-9-1",
    "sourceRow": 9,
    "level": 1,
    "label": "Alegría",
    "difficulty": 1,
    "place": "Talcahuano, Tucumán, Viamonte y Libertad",
    "quote": "Tengo momentos muy lindos, muchos recuerdos.",
    "x": 650,
    "y": 155,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-9-2",
    "sourceRow": 9,
    "level": 2,
    "label": "Melancolía",
    "difficulty": 1,
    "place": "Talcahuano, Tucumán, Viamonte y Libertad",
    "quote": "Tengo momentos muy lindos, muchos recuerdos.",
    "x": 650,
    "y": 205,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-10-1",
    "sourceRow": 10,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Lavalle y Tucumán",
    "quote": "Está todo bien cuidado. Tomo el Obelisco como punto de referencia cada vez que vengo.",
    "x": 480,
    "y": 600,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-11-1",
    "sourceRow": 11,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 2,
    "place": "Talcahuano",
    "quote": "Me gusta venir los días soleados los fines de semana.",
    "x": 390,
    "y": 310,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-12-2",
    "sourceRow": 12,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 2,
    "place": "Talcahuano",
    "quote": "Siempre venía aquí con mi familia de pequeño.",
    "x": 390,
    "y": 370,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-13-1",
    "sourceRow": 13,
    "level": 1,
    "label": "Emoción",
    "difficulty": 1,
    "place": "Tucumán",
    "quote": "Me emociona ver lo lindo que está.",
    "x": 396,
    "y": 430,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-14-1",
    "sourceRow": 14,
    "level": 1,
    "label": "Alivio",
    "difficulty": 3,
    "place": "Tucumán, Lavalle y Viamonte",
    "quote": "Siento que aquí puedo respirar.",
    "x": 642,
    "y": 430,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-15-1",
    "sourceRow": 15,
    "level": 1,
    "label": "Paz",
    "difficulty": 2,
    "place": "Av. Córdoba",
    "quote": "Me encanta venir y tirarme al pasto con sol.",
    "x": 490,
    "y": 90,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-16-1",
    "sourceRow": 16,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Talcahuano",
    "quote": "Siempre que puedo, vengo.",
    "x": 390,
    "y": 480,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-17-1",
    "sourceRow": 17,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Viamonte",
    "quote": "Cuando hay tribunales se me hace complicado transitar.",
    "x": 485,
    "y": 260,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-18-1",
    "sourceRow": 18,
    "level": 1,
    "label": "Entretención",
    "difficulty": 3,
    "place": "Viamonte",
    "quote": "Sin comentario extra registrado.",
    "x": 575,
    "y": 260,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-19-1",
    "sourceRow": 19,
    "level": 1,
    "label": "Gusto",
    "difficulty": 2,
    "place": "Av. Córdoba",
    "quote": "Le gusta Av. Córdoba. Volvió cuatro veces a continuar la conversación.",
    "x": 750,
    "y": 90,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-20-1",
    "sourceRow": 20,
    "level": 1,
    "label": "Paz y tranquilidad",
    "difficulty": 2,
    "place": "Tucumán",
    "quote": "Me gusta lo que he visto hasta ahora.",
    "x": 700,
    "y": 430,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-21-1",
    "sourceRow": 21,
    "level": 1,
    "label": "Seguridad",
    "difficulty": 1,
    "place": "Tucumán",
    "quote": "Es lindo pasar aquí, está todo pastizado, está el Teatro Colón y las plazas.",
    "x": 825,
    "y": 430,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-22-1",
    "sourceRow": 22,
    "level": 1,
    "label": "Familiaridad",
    "difficulty": 1,
    "place": "Talcahuano",
    "quote": "Vivo aquí hace años. En auto es difícil de transitar por la plaza, pero en general es muy tranquilo.",
    "x": 390,
    "y": 550,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-23-1",
    "sourceRow": 23,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Sector general",
    "quote": "No vivo acá, me queda a dos horas, pero está todo muy lindo y bien cuidado.",
    "x": 80,
    "y": 820,
    "city": "BUENOS AIRES",
    "locationNote": "Sin calle concreta registrada; posición esquemática general."
  },
  {
    "id": "arg-25-1",
    "sourceRow": 25,
    "level": 1,
    "label": "Familiaridad",
    "difficulty": 1,
    "place": "Talcahuano",
    "quote": "Si no conoces y preguntas, la gente te ayuda, son todos muy solidarios.",
    "x": 390,
    "y": 625,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-27-3",
    "sourceRow": 27,
    "level": 3,
    "label": "Inseguridad",
    "difficulty": 2,
    "place": "Viamonte",
    "quote": "He vivido aquí toda mi vida, nada especial, de muy chico mis papás trabajaban en el sector. Menciona las manifestaciones.",
    "x": 735,
    "y": 260,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-28-1",
    "sourceRow": 28,
    "level": 1,
    "label": "Frescura, alivio y contento",
    "difficulty": 2,
    "place": "Lavalle",
    "quote": "Sin comentario extra registrado.",
    "x": 565,
    "y": 600,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-30-1",
    "sourceRow": 30,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 2,
    "place": "Talcahuano",
    "quote": "Menciona que hay sectores donde percibe cierta inseguridad.",
    "x": 390,
    "y": 800,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-31-2",
    "sourceRow": 31,
    "level": 2,
    "label": "Algo inseguro",
    "difficulty": 2,
    "place": "Lavalle",
    "quote": "Es lindo, está fresco, de noche, después de las siete, se pone peligroso.",
    "x": 730,
    "y": 600,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-32-2",
    "sourceRow": 32,
    "level": 2,
    "label": "Nostalgia",
    "difficulty": 3,
    "place": "Av. Corrientes",
    "quote": "Menciona que durante la noche aumenta la inseguridad y se apagan las luces.",
    "x": 740,
    "y": 770,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-33-1",
    "sourceRow": 33,
    "level": 1,
    "label": "Satisfacción",
    "difficulty": 1,
    "place": "Lavalle",
    "quote": "Turista que lleva dos noches en la ciudad.",
    "x": 820,
    "y": 600,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-34-1",
    "sourceRow": 34,
    "level": 1,
    "label": "Relajo",
    "difficulty": 1,
    "place": "Talcahuano, Tucumán, Viamonte y Libertad",
    "quote": "Yo me relajo mucho, me siento bien, hay una sombra espectacular. Vengo 2-3 veces a la semana unas 3-5 horas.",
    "x": 650,
    "y": 480,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-35-1",
    "sourceRow": 35,
    "level": 1,
    "label": "Tranquilidad",
    "difficulty": 1,
    "place": "Talcahuano, Tucumán, Viamonte y Libertad",
    "quote": "Vengo a tomar aire, como 10 veces a la semana. Tomaba mate sentado.",
    "x": 650,
    "y": 550,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-36-3",
    "sourceRow": 36,
    "level": 3,
    "label": "Adrenalina",
    "difficulty": 4,
    "place": "Av. Corrientes y Cerrito",
    "quote": "Yo crecí acá, te producen adrenalina los cambios, hay más tránsito de autos que antes.",
    "x": 910,
    "y": 770,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-37-2",
    "sourceRow": 37,
    "level": 2,
    "label": "Naturalidad",
    "difficulty": 2,
    "place": "Av. Córdoba",
    "quote": "No me gustan los espacios con mucha gente.",
    "x": 850,
    "y": 90,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-38-1",
    "sourceRow": 38,
    "level": 1,
    "label": "Amor",
    "difficulty": 1,
    "place": "Corrientes, Libertad y Lavalle",
    "quote": "Yo conozco aquí de chiquita, yo jugaba acá, ahora vivo, hago taichí y salgo a caminar, es re lindo.",
    "x": 650,
    "y": 810,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-40-1",
    "sourceRow": 40,
    "level": 1,
    "label": "Seguridad",
    "difficulty": 2,
    "place": "Uruguay",
    "quote": "Hay mucha gente, hay policías, la gente se ve amable, es lindo. Cruzar no es seguro, los autos no paran.",
    "x": 130,
    "y": 510,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-41-1",
    "sourceRow": 41,
    "level": 1,
    "label": "Relajo",
    "difficulty": 1,
    "place": "Sector Plaza Lavalle",
    "quote": "Aquí es como un pulmón verde, a veces vengo una vez por semana.",
    "x": 520,
    "y": 530,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-42-2",
    "sourceRow": 42,
    "level": 2,
    "label": "Curiosidad",
    "difficulty": 2,
    "place": "Cerrito",
    "quote": "Cerrito parece una calle ancha. Depende de la hora, de noche es muy oscuro, de día está bien.",
    "x": 910,
    "y": 530,
    "city": "BUENOS AIRES",
    "locationNote": "Ubicación referencial según encuesta; no localización exacta de la emoción."
  },
  {
    "id": "arg-43-3",
    "sourceRow": 43,
    "level": 3,
    "label": "Placer enorme",
    "difficulty": 1,
    "place": "Sector general",
    "quote": "Turista por dos noches. Encuentra hermosa la ciudad, ya que viene de una ciudad más pequeña.",
    "x": 1120,
    "y": 825,
    "city": "BUENOS AIRES",
    "locationNote": "Sin calle concreta registrada; posición esquemática general."
  }
];
const ARG_DIFFICULTY_SEGMENTS = [{"id":"arg-sup-g1","category":"superficie","level":"facil","place":"Libertad","detail":"Calles amplias; las personas observadas caminan con calma y sin dificultad visible.","source":"Recorrido de usuarios ARG, fila 5","x1":650,"y1":137,"x2":650,"y2":213,"city":"BUENOS AIRES","locationNote":"Ubicación y extensión esquemáticas; no representan una medición continua.","stack":"av2-1-0","displayPlace":"Libertad · entre Av. Córdoba y Viamonte"},{"id":"arg-sup-g2","category":"superficie","level":"facil","place":"Viamonte con Talcahuano","detail":"Calles planas permiten el desplazamiento de una persona en silla de ruedas acompañada por su familia.","source":"Recorrido de usuarios ARG, fila 6","x1":419,"y1":260,"x2":495,"y2":260,"city":"BUENOS AIRES","locationNote":"Ubicación y extensión esquemáticas; no representan una medición continua.","stack":"ah1-2-0","displayPlace":"Viamonte · entre Talcahuano y Libertad"},{"id":"arg-des-g1","category":"descanso","level":"facil","place":"Plaza Lavalle · sector Libertad","detail":"Una persona se sienta a descansar a la sombra de un árbol, conversa y disfruta del entorno.","source":"Recorrido de usuarios ARG, fila 4","x1":650,"y1":307,"x2":650,"y2":383,"city":"BUENOS AIRES","locationNote":"Ubicación y extensión esquemáticas; no representan una medición continua.","stack":"av2-2-0","displayPlace":"Libertad · entre Viamonte y Tucumán"},{"id":"arg-ori-r1","category":"orientacion","level":"alta","place":"Av. Corrientes y Cerrito","detail":"Cambios en el sentido de las calles y aumento del tránsito vehicular. Dificultad general declarada: 4/5.","source":"Encuestas ARG, fila 36","x1":942,"y1":770,"x2":1018,"y2":770,"city":"BUENOS AIRES","locationNote":"Ubicación referencial según encuesta; extensión gráfica, no medida.","stack":"ah4-4-0","displayPlace":"Av. Corrientes · entre Cerrito y Av. 9 de Julio"},{"id":"arg-ori-y1","category":"orientacion","level":"media","place":"Uruguay","detail":"Dificultad para cruzar por el tránsito vehicular y conductores que no se detienen.","source":"Encuestas ARG, fila 40","x1":130,"y1":477,"x2":130,"y2":553,"city":"BUENOS AIRES","locationNote":"Ubicación referencial según encuesta; extensión gráfica, no medida.","stack":"av0-3-0","displayPlace":"Uruguay · entre Tucumán y Lavalle"},{"id":"arg-ori-g1","category":"orientacion","level":"facil","place":"Viamonte con Talcahuano","detail":"Una persona en silla de ruedas acompañada espera para cruzar con precaución y continúa con normalidad.","source":"Recorrido de usuarios ARG, fila 6","x1":390,"y1":137,"x2":390,"y2":213,"city":"BUENOS AIRES","locationNote":"Ubicación y extensión esquemáticas; no representan una medición continua.","stack":"av1-1-0","displayPlace":"Talcahuano · entre Av. Córdoba y Viamonte"}];

const FILTER_DEFINITIONS = {
  "superficie": "Abarca el estado del suelo, las irregularidades, los desniveles y el deterioro.",
  "descanso": "Contempla las bancas, la sombra y los espacios para detenerse.",
  "orientacion": "Contempla los cruces, la señalética y la comprensión del entorno.",
  "todas": "Reúne las condiciones de superficie, descanso y orientación que influyen en el recorrido."
};
const FILTER_CATEGORY = {descanso:"descanso", superficie:"superficie", orientacion:"orientacion"};
const FILTER_LABELS = {superficie:"Superficie", descanso:"Descanso", orientacion:"Orientación", pendiente:"Sin filtro asignado"};
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

function drawBaseMap(svg, city="cl") {
  const image=svgEl("image");
  image.setAttribute("href", new URL(city==="arg"?"./mapa-buenos-aires-provisional.svg?v=01":"./mapa-valparaiso-nocturno.svg?v=06",document.currentScript?.src || MAP_SCRIPT_URL).href);
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
  return "Sin dificultad observable";
}

function createEmotionPoint(item, context = "emotion", city="cl") {
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
  const stage=city==="arg"?document.querySelector(context==="emotion"?"#argEmotionStage":"#argDifficultyStage"):(context==="emotion"?emotionStage:difficultyStage);
  const tip=city==="arg"?document.querySelector(context==="emotion"?"#argEmotionTooltip":"#argMapTooltip"):(context==="emotion"?emotionTooltip:mapTooltip);
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
  tip.classList.remove("difficulty-detail");
  tip.classList.add("point-detail");
  const place=tip.querySelector(".point-location");
  place.textContent=(item.city||"VALPARAÍSO")+" · "+item.place.toLocaleUpperCase("es");
  tip.querySelector(".tooltip-dot").style.background=emotionFill(item.level);
  tip.querySelector(".point-title").textContent=item.label.toLocaleUpperCase("es");
  tip.querySelector(".point-meta").textContent="Nivel "+item.level+" · Dificultad percibida: "+item.difficulty+"/5";
  tip.querySelector(".point-comment").textContent=item.quote;
  const note=tip.querySelector(".point-note");
  note.textContent=[item.locationNote||(item.kind==="referencial"?"Ubicación referencial (según dificultad indicada)":"Lugar mencionado en la ficha; posición esquemática"),item.agePending?"Edad pendiente de confirmar":"",item.interpretation?"Etiqueta interpretativa de una respuesta ambivalente":"",item.contextNote||""].filter(Boolean).join(" · ");
  tip.classList.add("is-visible");
  moveTooltip(stage,tip,event);
}

function renderEmotionMap(city="cl") {
 const svg=city==="arg"?document.querySelector("#argEmotionMap"):emotionMap;
 const items=city==="arg"?ARG_EMOTIONS:EMOTIONS;
 svg.innerHTML="";svg.setAttribute("viewBox",MAP_VIEWBOX);drawBaseMap(svg,city);
 const layer=svgEl("g");layer.setAttribute("class","emotion-layer");
 items.forEach(item=>layer.appendChild(createEmotionPoint(item,"emotion",city)));
 svg.appendChild(layer);
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

function createDifficultyStack(items,index,stage,tip){
 const group=svgEl("g");group.setAttribute("class","difficulty-stack");group.dataset.stack=items[0].stack;
 const first=items[0],vertical=first.x1===first.x2,n=items.length;
 const rect=svgEl("rect"),x0=Math.min(first.x1,first.x2),y0=Math.min(first.y1,first.y2),w=Math.abs(first.x2-first.x1),h=Math.abs(first.y2-first.y1);
 const setRect=(x,y,width,height)=>{rect.setAttribute("x",x);rect.setAttribute("y",y);rect.setAttribute("width",width);rect.setAttribute("height",height);};
 rect.setAttribute("fill","transparent");rect.setAttribute("class","stack-hit");setRect(x0-7,y0-7,w+14,h+14);group.appendChild(rect);
 const positions=items.map((item,i)=>n===1?[0,0]:vertical?[(i-(n-1)/2)*12,-12]:[0,-(i+1)*12]);
 items.forEach((item,i)=>{
   const line=svgEl("line");for(const k of ["x1","x2","y1","y2"])line.setAttribute(k,item[k]);
   line.setAttribute("class","difficulty-line stacked-line");line.dataset.level=item.level;line.dataset.id=item.id;line.dataset.category=item.category;
   line.setAttribute("tabindex","0");line.setAttribute("role","button");line.setAttribute("aria-label",item.place+", "+(FILTER_LABELS[item.category]||item.category)+", "+difficultyLabel(item.level));
   line.style.setProperty("--stack-x",positions[i][0]+"px");line.style.setProperty("--stack-y",positions[i][1]+"px");
   line.style.setProperty("--segment-length",segmentLength(item));line.style.animationDelay=Math.min(index*24,240)+"ms";
   line.addEventListener("mouseenter",e=>showDifficultyTooltip(e,item,stage,tip));
   line.addEventListener("mousemove",e=>moveTooltip(stage,tip,e));
   line.addEventListener("focus",e=>{open();showDifficultyTooltip(e,item,stage,tip);});
   line.addEventListener("click",e=>{open();showDifficultyTooltip(e,item,stage,tip);});
   line.addEventListener("keydown",e=>{if(e.key==="Escape"){close();line.blur();}});
   group.appendChild(line);
 });
 function open(){
   if(group.classList.contains("is-expanded"))return;
   group.classList.add("is-expanded");
   const xx=[0,...positions.map(p=>p[0])],yy=[0,...positions.map(p=>p[1])];
   setRect(x0+Math.min(...xx)-8,y0+Math.min(...yy)-8,w+Math.max(...xx)-Math.min(...xx)+16,h+Math.max(...yy)-Math.min(...yy)+16);
 }
 function close(){group.classList.remove("is-expanded");setRect(x0-7,y0-7,w+14,h+14);hideMapTooltip(tip);}
 group.addEventListener("mouseenter",e=>{open();showDifficultyTooltip(e,items[items.length-1],stage,tip);});
 group.addEventListener("mouseleave",close);
 group.addEventListener("focusout",e=>{if(!group.contains(e.relatedTarget))close();});
 return group;
}
function showDifficultyTooltip(event,item,stage=difficultyStage,tip=mapTooltip){
  tip.classList.remove("point-detail");tip.classList.add("difficulty-detail");
  tip.querySelector(".point-location").textContent=((item.city||"VALPARAÍSO")+" · "+item.place).toLocaleUpperCase("es")+(item.displayPlace?" · "+item.displayPlace+" (referencial)":"");
  tip.querySelector(".tooltip-dot").style.background=DIFFICULTY_COLORS[item.level];
  tip.querySelector(".point-title").textContent="Color: "+({alta:"Rojo",media:"Amarillo",facil:"Verde"}[item.level]);
  tip.querySelector(".point-meta").textContent="Categoría: "+(FILTER_LABELS[item.category]||item.category);
  tip.querySelector(".point-comment").textContent=difficultyLabel(item.level);
  tip.querySelector(".point-note").textContent="";
  tip.classList.add("is-visible");moveTooltip(stage,tip,event);
}

function hideMapTooltip(tip=mapTooltip) {
  tip.classList.remove("is-visible");
}

const cityFilters={cl:"todas",arg:"todas"};
function renderDifficultyMap(city="cl") {
 const isArg=city==="arg",svg=isArg?document.querySelector("#argDifficultyMap"):difficultyMap;
 const stage=isArg?document.querySelector("#argDifficultyStage"):difficultyStage;
 const tip=isArg?document.querySelector("#argMapTooltip"):mapTooltip;
 const items=isArg?ARG_DIFFICULTY_SEGMENTS:DIFFICULTY_SEGMENTS;
 const emotions=isArg?ARG_EMOTIONS:EMOTIONS;
 svg.innerHTML="";svg.setAttribute("viewBox",MAP_VIEWBOX);drawBaseMap(svg,city);
 const layer=svgEl("g");layer.setAttribute("class","difficulty-layer");
 const stacks=new Map();
 items.filter(item=>cityFilters[city]==="todas"||item.category===cityFilters[city]).forEach(item=>{if(!stacks.has(item.stack))stacks.set(item.stack,[]);stacks.get(item.stack).push(item);});
 [...stacks.values()].forEach((items,index)=>layer.appendChild(createDifficultyStack(items,index,stage,tip)));
 svg.appendChild(layer);
 const emotionLayer=svgEl("g");emotionLayer.setAttribute("class","emotion-layer");
 emotions.forEach(item=>emotionLayer.appendChild(createEmotionPoint(item,"combined",city)));
 svg.appendChild(emotionLayer);
}
function setFilter(filter,city="cl"){
 if(!Object.prototype.hasOwnProperty.call(FILTER_DEFINITIONS,filter))return;
 cityFilters[city]=filter;
 const section=document.querySelector(city==="arg"?"#dificultad-arg":"#dificultad");
 const definition=section.querySelector(".filter-definition");definition.textContent=FILTER_DEFINITIONS[filter];
 section.querySelectorAll(".filter-link").forEach(button=>{const selected=button.dataset.filter===filter;button.classList.toggle("is-active",selected);button.setAttribute("aria-pressed",String(selected));});
 hideMapTooltip(city==="arg"?document.querySelector("#argMapTooltip"):mapTooltip);
 renderDifficultyMap(city);
}
for(const city of ["cl","arg"]){const section=document.querySelector(city==="arg"?"#dificultad-arg":"#dificultad");section.querySelectorAll(".filter-link").forEach(button=>button.addEventListener("click",()=>setFilter(button.dataset.filter,city)));renderEmotionMap(city);renderDifficultyMap(city);}
