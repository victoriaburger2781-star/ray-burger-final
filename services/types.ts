export interface CustomerProfile {
  id: string;
  name: string;
  points: number; // 0 to 10
  rewardsAvailable: number;
}

export enum AppView {
  HOME = 'HOME',
  CUSTOMER = 'CUSTOMER',
  ADMIN_SCANNER = 'ADMIN_SCANNER',
  AI_CHEF = 'AI_CHEF',
  REGISTER = 'REGISTER',
  MENU = 'MENU',
  SUGGESTIONS = 'SUGGESTIONS'
}

export interface BurgerRecommendation {
  name: string;
  description: string;
  ingredients: string[];
}

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  quantity: number;
}
