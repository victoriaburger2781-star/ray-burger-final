// --- CONFIGURACIÓN DE TU NEGOCIO ---

// 1. TUS NÚMEROS DE WHATSAPP
// Puedes agregar o quitar los que quieras.
export const WHATSAPP_NUMBERS = [
  "584128344594", 
  "584162101833", 
  "584243439729"
];

// 2. ESPECIAL DE LA SEMANA
// Cambia esto cada semana para promocionar algo nuevo.
export const WEEKLY_SPECIAL = {
  active: true, // Pon 'false' si no quieres mostrar ningún especial esta semana
  name: "La Monster Ray",
  price: "$200",
  description: "Edición Limitada: Triple carne, huevo estrellado, aros de cebolla morada, queso fundido y salsa de aguacate picante.",
  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop"
};

// 3. CATEGORÍAS
// Si agregas una categoría nueva aquí (ej: "Postres"), asegúrate de usarla en los productos de abajo.
export const CATEGORIES = ["Todos", "Hamburguesas", "Perros Calientes", "Complementos", "Bebidas"];

// 4. TU MENÚ COMPLETO
// Aquí es donde modificas precios, nombres y fotos.
export const MENU_ITEMS = [
  // --- HAMBURGUESAS ---
  { 
    id: 1, 
    category: "Hamburguesas", 
    name: "Ray Classic", 
    price: "$120", 
    description: "200g de carne angus, queso cheddar fundido, cebolla caramelizada y salsa secreta Ray.", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 2, 
    category: "Hamburguesas", 
    name: "Spicy Inferno", 
    price: "$145", 
    description: "Doble carne, jalapeños empanizados, queso pepper jack y salsa habanero-mango.", 
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  { 
    id: 3, 
    category: "Hamburguesas", 
    name: "Bacon Master", 
    price: "$155", 
    description: "Tocino ahumado crujiente, aros de cebolla, salsa BBQ casera y queso gouda.", 
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 4, 
    category: "Hamburguesas", 
    name: "Truffle Mushroom", 
    price: "$160", 
    description: "Portobellos salteados, aceite de trufa, queso suizo y rúcula fresca.", 
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  
  // --- PERROS CALIENTES ---
  { 
    id: 9, 
    category: "Perros Calientes", 
    name: "Ray Dog Jumbo", 
    price: "$85", 
    description: "Salchicha jumbo de res asada al carbón, tocino enrollado, tomate, cebolla y aderezo de la casa.", 
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 10, 
    category: "Perros Calientes", 
    name: "Chili Cheese Dog", 
    price: "$95", 
    description: "Bañado en nuestro chili con carne casero, abundante queso cheddar líquido y trocitos de jalapeño.", 
    image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  { 
    id: 11, 
    category: "Perros Calientes", 
    name: "Hawaiano Grill", 
    price: "$90", 
    description: "Salchicha asada, piña a la parrilla, jamón de pavo, queso manchego gratinado y crema.", 
    image: "https://images.unsplash.com/photo-1595257841889-cb18187884d3?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },

  // --- COMPLEMENTOS ---
  { 
    id: 5, 
    category: "Complementos", 
    name: "Papas Ray", 
    price: "$60", 
    description: "Corte grueso, bañadas en queso cheddar líquido y trocitos de tocino.", 
    image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 6, 
    category: "Complementos", 
    name: "Aros de Cebolla", 
    price: "$55", 
    description: "Crujientes aros de cebolla empanizados a la cerveza con aderezo ranch.", 
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },

  // --- BEBIDAS ---
  { 
    id: 7, 
    category: "Bebidas", 
    name: "Malteada Vainilla", 
    price: "$85", 
    description: "Helado artesanal de vainilla con crema batida y cereza.", 
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  { 
    id: 8, 
    category: "Bebidas", 
    name: "Limonada Rosa", 
    price: "$45", 
    description: "Refrescante limonada natural con un toque de frutos rojos.", 
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  }
];
