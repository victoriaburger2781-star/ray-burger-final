// --- CONFIGURACIÓN DE RAY BURGER GRILL ---

// 1. TUS NÚMEROS DE WHATSAPP
export const WHATSAPP_NUMBERS = [
  "584128344594", 
  "584162101833", 
  "584243439729"
];

// 2. ESPECIAL DE LA SEMANA
export const WEEKLY_SPECIAL = {
  active: true,
  name: "La Monster Ray",
  price: "$200",
  description: "Edición Limitada: Triple carne, huevo estrellado, aros de cebolla morada, queso fundido y salsa de aguacate picante.",
  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop"
};

// 3. CATEGORÍAS
export const CATEGORIES = ["Todos", "Hamburguesas", "Perros Calientes", "Complementos", "Bebidas"];

// 4. EL MENÚ (¡Aquí es donde editaremos tus precios!)
export const MENU_ITEMS = [
  // HAMBURGUESAS
  { 
    id: 1, category: "Hamburguesas", name: "Ray Classic", price: "$120", 
    description: "200g de carne angus, queso cheddar fundido, cebolla caramelizada y salsa secreta Ray.", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", popular: true 
  },
  { 
    id: 2, category: "Hamburguesas", name: "Spicy Inferno", price: "$145", 
    description: "Doble carne, jalapeños empanizados, queso pepper jack y salsa habanero-mango.", 
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop", popular: false 
  },
  
  // PERROS CALIENTES
  { 
    id: 9, category: "Perros Calientes", name: "Ray Dog Jumbo", price: "$85", 
    description: "Salchicha jumbo de res asada al carbón, tocino enrollado, tomate, cebolla y aderezo de la casa.", 
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=800&auto=format&fit=crop", popular: true 
  },

  // COMPLEMENTOS
  { 
    id: 5, category: "Complementos", name: "Papas Ray", price: "$60", 
    description: "Corte grueso, bañadas en queso cheddar líquido y trocitos de tocino.", 
    image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?q=80&w=800&auto=format&fit=crop", popular: true 
  },

  // BEBIDAS
  { 
    id: 7, category: "Bebidas", name: "Malteada Vainilla", price: "$85", 
    description: "Helado artesanal de vainilla con crema batida y cereza.", 
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop", popular: false 
  }
];
