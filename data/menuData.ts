// --- CONFIGURACIÓN DE RAY BURGER GRILL ---

// 1. TUS NÚMEROS DE WHATSAPP
export const WHATSAPP_NUMBERS = [
  "584162101833", 
];

// 2. ESPECIAL DE LA SEMANA
export const WEEKLY_SPECIAL = {
  active: true,
  name: "Victoria Cheese Burger",
  price: "$8.50",
  description: "La joya de la casa: 250gr de carne rellena con queso, tomate, lechuga, queso, tocineta y salsas. (Opción Doble: $12)",
  image: "https://images.unsplash.com/photo-1615297348994-f075d47d90dc?q=80&w=800&auto=format&fit=crop"
};

// 3. CATEGORÍAS
export const CATEGORIES = ["Todos", "Hamburguesas", "Perros Calientes", "Extras", "Bebidas"];

// 4. TU MENÚ REAL (Precios actualizados)
export const MENU_ITEMS = [
  // --- HAMBURGUESAS ---
  { 
    id: 1, category: "Hamburguesas", name: "Clásica", price: "$5.00", 
    description: "Carne res o pollo (120gr), lechuga, tomate, salsas. (Doble: $7.5)", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 2, category: "Hamburguesas", name: "Cheese Burger Bacon", price: "$6.50", 
    description: "Carne res o pollo (120gr), tomate, lechuga, queso, tocineta, salsas. (Doble: $9)", 
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 3, category: "Hamburguesas", name: "Chisto Burger", price: "$7.50", 
    description: "Carnes con chistorra Monserrat (150gr), tomate, lechuga, queso, tocineta, salsas. (Doble: $11)", 
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  { 
    id: 4, category: "Hamburguesas", name: "Victoria Cheese Burger", price: "$8.50", 
    description: "250gr de carne rellena con queso, tomate, lechuga, tocineta y salsas. (Doble: $12)", 
    image: "https://images.unsplash.com/photo-1615297348994-f075d47d90dc?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 5, category: "Hamburguesas", name: "Crispy Burger", price: "$7.00", 
    description: "150gr de pollo apanado en cereal crujiente, tomate, lechuga, tocineta, queso y salsas. (Doble: $10.5)", 
    image: "https://images.unsplash.com/photo-1619250907537-83733ccfb241?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },

  // --- PERROS CALIENTES ---
  { 
    id: 6, category: "Perros Calientes", name: "Perro Clásico", price: "$2.00", 
    description: "Salchicha, vegetales, papas, salsas, queso. (Doble: $3)", 
    image: "https://images.unsplash.com/photo-1612392062631-94dd85fa9819?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },
  { 
    id: 7, category: "Perros Calientes", name: "Perro Especial", price: "$3.00", 
    description: "Salchicha, vegetales, papas, tocineta, queso. (Doble: $4)", 
    image: "https://images.unsplash.com/photo-1595257841889-cb18187884d3?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  { 
    id: 8, category: "Perros Calientes", name: "Perripollo", price: "$3.50", 
    description: "Salchicha, pollo desmechado, vegetales, papas y queso.", 
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=800&auto=format&fit=crop", 
    popular: false 
  },
  { 
    id: 9, category: "Perros Calientes", name: "Perro Jumbo", price: "$3.50", 
    description: "Salchicha premium, vegetales, papas, salsas, queso. (Doble: $5)", 
    image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=800&auto=format&fit=crop", 
    popular: true 
  },

  // --- EXTRAS ---
  { id: 10, category: "Extras", name: "Ración de Papas Fritas", price: "$1.50", description: "Papas fritas crujientes.", image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?q=80&w=800&auto=format&fit=crop", popular: true },
  { id: 11, category: "Extras", name: "Extra Tocineta", price: "$1.00", description: "Porción extra.", image: "https://images.unsplash.com/photo-1606851094655-025828d84a56?q=80&w=800&auto=format&fit=crop", popular: false },
  { id: 12, category: "Extras", name: "Extra Queso", price: "$0.50", description: "Porción extra.", image: "https://images.unsplash.com/photo-1628191013066-58bf95376a9c?q=80&w=800&auto=format&fit=crop", popular: false },
  { id: 13, category: "Extras", name: "Cebolla Caramelizada", price: "$0.50", description: "Porción extra.", image: "https://images.unsplash.com/photo-1516684669134-de6d7c47743b?q=80&w=800&auto=format&fit=crop", popular: false },
  { id: 14, category: "Extras", name: "Salsas Extra", price: "$0.25", description: "Porción extra.", image: "https://images.unsplash.com/photo-1626202168015-68a8344ac70c?q=80&w=800&auto=format&fit=crop", popular: false },
  
  // --- BEBIDAS ---
  { id: 16, category: "Bebidas", name: "Refresco", price: "$1.50", description: "Variedad de sabores.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop", popular: true }
];
