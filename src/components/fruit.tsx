interface Fruit {
  name: string;
  id: number;
  family: string;
  genus: string;
  order: string;
  nutritious: {
    fat: number;
    protein: number;
    calories: number;
    carbohydrates: number;
  };
}
export const loadFruit = async (name: string): Promise<Fruit | undefined> => {
  const fruits: Fruit[] = [
    {
      name: "Apple",
      id: 1,
      family: "Rosaceae",
      genus: "Malus",
      order: "Rosales",
      nutritious: {
        fat: 0.2,
        protein: 0.3,
        calories: 52,
        carbohydrates: 13.8,
      },
    },
    {
      name: "Banana",
      id: 2,
      family: "Musaceae",
      genus: "Musa",
      order: "Zingiberales",
      nutritious: {
        fat: 0.3,
        protein: 1.1,
        calories: 89,
        carbohydrates: 22.8,
      },
    },
    {
      name: "Orange",
      id: 3,
      family: "Rutaceae",
      genus: "Citrus",
      order: "Sapindales",
      nutritious: {
        fat: 0.1,
        protein: 0.9,
        calories: 47,
        carbohydrates: 11.8,
      },
    },
    {
      name: "Strawberry",
      id: 4,
      family: "Rosaceae",
      genus: "Fragaria",
      order: "Rosales",
      nutritious: {
        fat: 0.3,
        protein: 0.7,
        calories: 32,
        carbohydrates: 7.7,
      },
    },
    {
      name: "Mango",
      id: 5,
      family: "Anacardiaceae",
      genus: "Mangifera",
      order: "Sapindales",
      nutritious: {
        fat: 0.4,
        protein: 0.8,
        calories: 60,
        carbohydrates: 15,
      },
    },
  ];

  return fruits.find((f) => f.name.toLowerCase() === name.toLowerCase());
};

export const getFruit = async (name: string) => {
  const fruit = await loadFruit(name);
  if (!fruit) return Promise.reject(new Error("Fruit not found"));

  return fruit;
};
