export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  details: string;
  features: string[];
  specs: Record<string, string>;
  sizes: string[];
  colors: ProductColor[];
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Remera Essential Negra",
    price: 34.99,
    image: "/images/product-1.jpg",
    description: "Remera oversized de algodón premium en negro clásico.",
    details:
      "Confeccionada con algodón peinado 100% de 240 gsm, esta remera oversized ofrece un calce relajado y moderno. Las costuras reforzadas en cuello y hombros garantizan durabilidad, mientras que el lavado enzimático le otorga una suavidad excepcional desde el primer uso. Ideal para looks casuales o como base de cualquier outfit.",
    features: [
      "Algodón peinado 100% de 240 gsm",
      "Corte oversized unisex",
      "Costuras reforzadas doble aguja",
      "Cuello redondo con rib acanalado",
      "Lavado enzimático pre-encogido",
      "Etiqueta impresa (sin picazón)",
    ],
    specs: {
      Material: "Algodón peinado 100%",
      Gramaje: "240 gsm",
      Corte: "Oversized / Relaxed fit",
      Cuello: "Redondo con rib 1x1",
      Talles: "S - M - L - XL - XXL",
      Cuidado: "Lavar a 30°C, no usar secadora",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Negro", hex: "#1a1a1a" },
      { name: "Gris Oscuro", hex: "#3d3d3d" },
      { name: "Azul Marino", hex: "#1c2841" },
    ],
reviews: [
  {
    id: 1,
    author: "Martina L.",
    rating: 5,
    date: "15 Ene, 2026",
    comment:
      "La mejor remera negra que tuve. El algodón es super grueso y no se deforma después de lavar. El oversized queda perfecto.",
  },
  {
    id: 2,
    author: "Valentina R.",
    rating: 4,
    date: "28 Dic, 2025",
    comment:
      "Muy buena calidad. La compré en L y me queda genial. Solo le bajo una estrella porque tardó un poco en llegar.",
  },
  {
    id: 3,
    author: "Lucas G.",
    rating: 5,
    date: "10 Nov, 2025",
    comment:
      "Compré 3 de una. El negro no se destiñe y la tela es increíble para el precio.",
  },
],
  },
  {
    id: 2,
    name: "Remera Clásica Blanca",
    price: 29.99,
    image: "/images/product-2.jpg",
    description: "Remera heavyweight de algodón blanco con cuello crew.",
    details:
      "El básico perfecto. Esta remera de algodón heavyweight en blanco puro está diseñada para ser la pieza más versátil de tu guardarropas. El tejido de 220 gsm ofrece cuerpo y estructura sin perder comodidad. Pre-encogida para que mantenga su forma lavado tras lavado.",
    features: [
      "Algodón jersey 100% heavyweight",
      "Gramaje de 220 gsm con cuerpo",
      "Corte regular clásico",
      "Cuello crew reforzado",
      "Pre-encogida y pre-lavada",
      "Tela opaca, no transparenta",
    ],
    specs: {
      Material: "Algodón jersey 100%",
      Gramaje: "220 gsm",
      Corte: "Regular fit",
      Cuello: "Crew neck reforzado",
      Talles: "S - M - L - XL - XXL",
      Cuidado: "Lavar a 30°C, secar a la sombra",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Blanco", hex: "#f5f5f5" },
      { name: "Crema", hex: "#f0ead6" },
    ],
    reviews: [
      {
        id: 1,
        author: "Camila S.",
        rating: 5,
        date: "2 Feb, 2026",
        comment:
          "Al fin una remera blanca que no transparenta. El gramaje es perfecto, no muy gruesa ni muy fina.",
      },
      {
        id: 2,
        author: "Tomás P.",
        rating: 5,
        date: "18 Ene, 2026",
        comment:
          "Excelente calidad. Ya compré la tercera porque es mi básico del día a día. Mantiene la forma impecable.",
      },
    ],
  },
  {
    id: 3,
    name: "Remera Washed Oliva",
    price: 39.99,
    image: "/images/product-3.jpg",
    description: "Remera vintage wash en verde oliva con fit relajado.",
    details:
      "Una remera con personalidad. El proceso de lavado vintage le da ese aspecto vivido y textura suave desde el primer momento. El color oliva militar combina con todo y el corte relajado la hace perfecta para un look streetwear. Cada prenda tiene un tono ligeramente único por el proceso de lavado.",
    features: [
      "Algodón 100% con lavado vintage",
      "Efecto desgastado artesanal",
      "Corte relajado drop-shoulder",
      "Costuras tipo flatlock",
      "Cuello amplio y cómodo",
      "Cada prenda es única por el lavado",
    ],
    specs: {
      Material: "Algodón 100% lavado ácido",
      Gramaje: "200 gsm",
      Corte: "Relaxed / Drop shoulder",
      Cuello: "Amplio con terminación raw",
      Talles: "S - M - L - XL",
      Cuidado: "Lavar del revés, agua fría",
    },
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oliva", hex: "#5c6b3c" },
      { name: "Camel", hex: "#c4a777" },
      { name: "Bordo", hex: "#6b2142" },
    ],
    reviews: [
      {
        id: 1,
        author: "Nicolás F.",
        rating: 5,
        date: "22 Ene, 2026",
        comment:
          "El color oliva es exactamente lo que buscaba. El lavado vintage le da un toque increíble. Es mi remera favorita.",
      },
      {
        id: 2,
        author: "Sofía M.",
        rating: 4,
        date: "5 Dic, 2025",
        comment:
          "Muy linda la textura y el color. El drop shoulder queda genial. Pido más colores en esta línea.",
      },
      {
        id: 3,
        author: "Diego A.",
        rating: 5,
        date: "20 Nov, 2025",
        comment:
          "La calidad del lavado es superior. Se nota que es artesanal. La uso con jeans o bermudas y queda siempre bien.",
      },
    ],
  },
  {
    id: 4,
    name: "Remera Rayas Marineras",
    price: 36.99,
    image: "/images/product-4.jpg",
    description: "Remera estilo Breton con rayas horizontales azul marino.",
    details:
      "Inspirada en el clásico estilo marinero francés, esta remera combina rayas horizontales azul marino sobre fondo blanco. Confeccionada en punto jersey de algodón peinado con un tacto suave y resistente. El corte semi-entallado es ideal tanto para hombres como mujeres.",
    features: [
      "Algodón peinado punto jersey",
      "Rayas tejidas (no estampadas)",
      "Corte semi-entallado unisex",
      "Manga corta con dobladillo limpio",
      "Cuello barco clásico",
      "Patrón alineado en costuras",
    ],
    specs: {
      Material: "Algodón peinado 100%",
      Gramaje: "200 gsm",
      Corte: "Semi-entallado",
      Cuello: "Barco / Boat neck",
      Talles: "XS - S - M - L - XL",
      Cuidado: "Lavar a 30°C, no blanquear",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Azul/Blanco", hex: "#1c2841" },
      { name: "Rojo/Blanco", hex: "#8b2020" },
    ],
    reviews: [
      {
        id: 1,
        author: "Julia V.",
        rating: 5,
        date: "8 Feb, 2026",
        comment:
          "Hermosa remera. Las rayas son tejidas, no estampadas, así que no se van a borrar nunca. Muy buen detalle.",
      },
      {
        id: 2,
        author: "Mateo H.",
        rating: 4,
        date: "25 Ene, 2026",
        comment:
          "Estilo impecable. El cuello barco le da un toque diferente. Queda muy bien con pantalón chino.",
      },
    ],
  },
  {
    id: 5,
    name: "Remera Boxy Crema",
    price: 32.99,
    image: "/images/product-5.jpg",
    description: "Remera boxy fit en crema con bordado minimalista.",
    details:
      "Diseño contemporáneo con corte boxy y largo justo. El tono crema cálido complementa cualquier paleta y el pequeño bordado en el pecho agrega un detalle sutil pero distintivo. Fabricada en algodón orgánico certificado, suave al tacto y respetuosa con el medio ambiente.",
    features: [
      "Algodón orgánico certificado GOTS",
      "Bordado a máquina en el pecho",
      "Corte boxy contemporáneo",
      "Largo crop justo (no corto)",
      "Hombro caído natural",
      "Producción responsable y ética",
    ],
    specs: {
      Material: "Algodón orgánico 100%",
      Gramaje: "210 gsm",
      Corte: "Boxy / Cropped",
      Cuello: "Redondo con rib ancho",
      Talles: "S - M - L - XL",
      Cuidado: "Lavar a 30°C, planchar del revés",
    },
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Crema", hex: "#f0ead6" },
      { name: "Rosa Palo", hex: "#d4a5a5" },
      { name: "Celeste", hex: "#a8c8e0" },
    ],
    reviews: [
      {
        id: 1,
        author: "Florencia K.",
        rating: 5,
        date: "1 Feb, 2026",
        comment:
          "El boxy fit queda increíble con jeans de tiro alto. El algodón orgánico se siente premium. El bordadito es un detalle hermoso.",
      },
      {
        id: 2,
        author: "Agustín D.",
        rating: 4,
        date: "12 Ene, 2026",
        comment:
          "Me gusta mucho el color crema. Es un tono cálido que queda bien con todo. El largo es perfecto.",
      },
      {
        id: 3,
        author: "Mía C.",
        rating: 5,
        date: "29 Nov, 2025",
        comment:
          "Me encanta que sea algodón orgánico. La calidad es excelente y el fit boxy es lo que necesitaba.",
      },
    ],
  },
  {
    id: 6,
    name: "Remera Pocket Gris Oscuro",
    price: 31.99,
    image: "/images/product-6.jpg",
    description: "Remera con bolsillo al pecho en gris oscuro jaspeado.",
    details:
      "Un clásico reinventado. Esta remera en gris oscuro jaspeado (heather) lleva un bolsillo funcional al pecho que le agrega carácter y utilidad. El tejido mezcla de algodón y poliéster reciclado ofrece la suavidad del algodón con la resistencia y recuperación del poliéster.",
    features: [
      "Mezcla algodón 80% / poliéster reciclado 20%",
      "Bolsillo funcional al pecho",
      "Tejido jaspeado (heather) premium",
      "Corte regular con largo estándar",
      "Cuello reforzado con taping interior",
      "Poliéster reciclado de botellas PET",
    ],
    specs: {
      Material: "80% algodón / 20% poliéster reciclado",
      Gramaje: "190 gsm",
      Corte: "Regular fit",
      Cuello: "Redondo con taping",
      Talles: "S - M - L - XL - XXL",
      Cuidado: "Lavar a máquina 30°C",
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Gris Oscuro", hex: "#3d3d3d" },
      { name: "Gris Claro", hex: "#a0a0a0" },
      { name: "Negro", hex: "#1a1a1a" },
    ],
    reviews: [
      {
        id: 1,
        author: "Federico B.",
        rating: 5,
        date: "10 Feb, 2026",
        comment:
          "El jaspeado es hermoso en persona. El bolsillito es funcional de verdad, entra bien el celular. Muy cómoda.",
      },
      {
        id: 2,
        author: "Ana P.",
        rating: 4,
        date: "3 Ene, 2026",
        comment:
          "Buena calidad y el gris oscuro es versátil para todo. Me gusta que use poliéster reciclado.",
      },
    ],
  },
];
