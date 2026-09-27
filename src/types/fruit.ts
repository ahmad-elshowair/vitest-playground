export interface FruitNutritious {
  fat: number;
  protein: number;
  calories: number;
  carbohydrates: number;
}

export interface Fruit {
  name: string;
  id: number;
  family: string;
  genus: string;
  order: string;
  nutritious: FruitNutritious;
}
