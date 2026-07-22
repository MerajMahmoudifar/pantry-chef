export const INITIAL_PANTRY = [
  'Eggs', 'Garlic', 'Onion', 'Olive Oil', 'Salt', 'Black Pepper', 
  'Butter', 'Chicken Breast', 'Rice', 'Pasta', 'Cheddar Cheese', 
  'Tomatoes', 'Spinach', 'Soy Sauce', 'Lemon'
];

export const ALL_INGREDIENTS = [
  // Proteins
  'Eggs', 'Chicken Breast', 'Ground Beef', 'Salmon', 'Tofu', 'Bacon', 'Shrimp', 'Cheddar Cheese', 'Mozzarella', 'Parmesan', 'Greek Yogurt',
  // Produce
  'Garlic', 'Onion', 'Tomatoes', 'Spinach', 'Lemon', 'Avocado', 'Bell Pepper', 'Broccoli', 'Mushrooms', 'Carrots', 'Potatoes', 'Lime', 'Cilantro',
  // Pantry Staples & Grains
  'Rice', 'Pasta', 'Bread', 'Flour', 'Olive Oil', 'Butter', 'Soy Sauce', 'Honey', 'Oats', 'Milk', 'Heavy Cream',
  // Spices & Seasonings
  'Salt', 'Black Pepper', 'Chili Flakes', 'Paprika', 'Oregano', 'Cumin', 'Sesame Oil', 'Garlic Powder'
];

export const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Quick & Easy', 'Healthy'];

export const SAMPLE_RECIPES = [
  {
    id: 'r1',
    title: 'Garlic Butter Chicken & Rice Bowl',
    description: 'Tender chicken bites seared in garlic butter, served over fluffy rice with fresh herbs.',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    calories: 520,
    difficulty: 'Easy',
    category: 'Dinner',
    dietary: ['High-Protein', 'Gluten-Free Option'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Chicken Breast', amount: '400g' },
      { name: 'Garlic', amount: '4 cloves, minced' },
      { name: 'Butter', amount: '2 tbsp' },
      { name: 'Olive Oil', amount: '1 tbsp' },
      { name: 'Rice', amount: '1 cup' },
      { name: 'Salt', amount: '1 tsp' },
      { name: 'Black Pepper', amount: '1/2 tsp' }
    ],
    instructions: [
      { step: 1, text: 'Rinse rice and cook according to package instructions (approx 15 mins).', timerMinutes: 15 },
      { step: 2, text: 'Dice chicken breasts into bite-sized cubes and season with salt and pepper.', timerMinutes: 0 },
      { step: 3, text: 'Heat olive oil and 1 tbsp butter in a large skillet over medium-high heat.', timerMinutes: 2 },
      { step: 4, text: 'Add chicken cubes and sear until golden brown and cooked through (6-8 mins).', timerMinutes: 7 },
      { step: 5, text: 'Reduce heat, add minced garlic and remaining butter. Toss for 1-2 minutes until fragrant.', timerMinutes: 2 },
      { step: 6, text: 'Serve warm over steamed rice.' }
    ],
    rating: 4.9,
    reviewsCount: 142,
    sponsoredProduct: {
      brand: 'Bertolli Extra Virgin Olive Oil',
      text: 'Sponsored: Enhance flavor with Organic First Cold Pressed Olive Oil.',
      link: '#'
    }
  },
  {
    id: 'r2',
    title: 'Creamy Spinach & Tomato Pasta',
    description: 'A comforting 20-minute pasta featuring wilted spinach, juicy cherry tomatoes, and a rich garlic cream sauce.',
    prepTime: 8,
    cookTime: 12,
    servings: 3,
    calories: 450,
    difficulty: 'Easy',
    category: 'Lunch',
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281313?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Pasta', amount: '250g' },
      { name: 'Spinach', amount: '2 cups fresh' },
      { name: 'Tomatoes', amount: '1 cup cherry tomatoes' },
      { name: 'Garlic', amount: '3 cloves' },
      { name: 'Heavy Cream', amount: '1/2 cup' },
      { name: 'Parmesan', amount: '1/4 cup' },
      { name: 'Olive Oil', amount: '1 tbsp' },
      { name: 'Salt', amount: 'To taste' },
      { name: 'Black Pepper', amount: 'To taste' }
    ],
    instructions: [
      { step: 1, text: 'Boil salted water and cook pasta until al dente.', timerMinutes: 9 },
      { step: 2, text: 'Sauté sliced garlic and halved tomatoes in olive oil until soft.', timerMinutes: 4 },
      { step: 3, text: 'Add fresh spinach and allow to wilt for 2 minutes.', timerMinutes: 2 },
      { step: 4, text: 'Pour in heavy cream and parmesan, stirring to create a silky sauce.', timerMinutes: 3 },
      { step: 5, text: 'Toss cooked pasta into sauce and season with fresh ground pepper.' }
    ],
    rating: 4.8,
    reviewsCount: 98
  },
  {
    id: 'r3',
    title: 'Fluffy Avocado Egg Toast',
    description: 'Crispy toasted artisan bread topped with creamy mashed avocado, fried eggs, and red pepper flakes.',
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    calories: 340,
    difficulty: 'Easy',
    category: 'Breakfast',
    dietary: ['Vegetarian', 'Quick'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', amount: '2' },
      { name: 'Avocado', amount: '1 ripe' },
      { name: 'Bread', amount: '2 slices' },
      { name: 'Butter', amount: '1 tbsp' },
      { name: 'Lemon', amount: '1/2 wedge' },
      { name: 'Salt', amount: 'Pinch' },
      { name: 'Chili Flakes', amount: 'Pinch' }
    ],
    instructions: [
      { step: 1, text: 'Toast bread slices to golden crispiness.', timerMinutes: 3 },
      { step: 2, text: 'Mash avocado with lemon juice, salt, and pepper in a small bowl.', timerMinutes: 2 },
      { step: 3, text: 'Melt butter in non-stick pan and fry eggs to your desired crispiness (sunny-side up recommended).', timerMinutes: 3 },
      { step: 4, text: 'Spread avocado on toast, top with eggs and sprinkle chili flakes.' }
    ],
    rating: 4.9,
    reviewsCount: 215,
    sponsoredProduct: {
      brand: 'Vital Farms Pasture-Raised Eggs',
      text: 'Sponsored: Rich amber yolks for the perfect toast topping.',
      link: '#'
    }
  },
  {
    id: 'r4',
    title: 'Savory Egg Fried Rice',
    description: 'Classic quick comfort food! Day-old rice stir-fried with scrambled eggs, garlic, soy sauce, and scallions.',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 410,
    difficulty: 'Easy',
    category: 'Quick & Easy',
    dietary: ['Vegetarian', 'Budget-Friendly'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Rice', amount: '2 cups cooked (cold)' },
      { name: 'Eggs', amount: '3 beaten' },
      { name: 'Onion', amount: '1/2 diced' },
      { name: 'Garlic', amount: '2 cloves' },
      { name: 'Soy Sauce', amount: '2 tbsp' },
      { name: 'Butter', amount: '1 tbsp' },
      { name: 'Sesame Oil', amount: '1 tsp' },
      { name: 'Black Pepper', amount: '1/2 tsp' }
    ],
    instructions: [
      { step: 1, text: 'Melt butter in a wok or high-sided skillet over medium heat.', timerMinutes: 1 },
      { step: 2, text: 'Scramble eggs gently until just set, then remove to a plate.', timerMinutes: 2 },
      { step: 3, text: 'Sauté diced onions and garlic until fragrant and translucent.', timerMinutes: 3 },
      { step: 4, text: 'Add cold rice, breaking up clumps with a spatula. Pour in soy sauce and sesame oil.', timerMinutes: 4 },
      { step: 5, text: 'Fold scrambled eggs back into rice and toss until hot and combined.' }
    ],
    rating: 4.7,
    reviewsCount: 180
  },
  {
    id: 'r5',
    title: 'Zesty Garlic Shrimp Skillet',
    description: 'Succulent shrimp seared in garlic, lemon juice, and red pepper flakes in under 15 minutes.',
    prepTime: 5,
    cookTime: 8,
    servings: 2,
    calories: 290,
    difficulty: 'Easy',
    category: 'Dinner',
    dietary: ['Keto', 'High-Protein', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Shrimp', amount: '350g peeled & deveined' },
      { name: 'Garlic', amount: '5 cloves minced' },
      { name: 'Butter', amount: '2 tbsp' },
      { name: 'Olive Oil', amount: '1 tbsp' },
      { name: 'Lemon', amount: '1 whole juiced' },
      { name: 'Cilantro', amount: '2 tbsp chopped' },
      { name: 'Chili Flakes', amount: '1/2 tsp' }
    ],
    instructions: [
      { step: 1, text: 'Pat shrimp dry with paper towels and season light with salt.', timerMinutes: 2 },
      { step: 2, text: 'Heat oil and butter in skillet until bubbling.', timerMinutes: 2 },
      { step: 3, text: 'Add shrimp in a single layer and cook 2 mins per side until pink.', timerMinutes: 4 },
      { step: 4, text: 'Stir in minced garlic, chili flakes, and squeeze lemon juice.', timerMinutes: 2 },
      { step: 5, text: 'Garnish with fresh cilantro and serve warm.' }
    ],
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: 'r6',
    title: 'Classic Omelette with Spinach & Cheddar',
    description: 'Golden fluffy three-egg omelette stuffed with melted cheddar cheese and wilted spinach.',
    prepTime: 5,
    cookTime: 6,
    servings: 1,
    calories: 380,
    difficulty: 'Easy',
    category: 'Breakfast',
    dietary: ['High-Protein', 'Low-Carb', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      { name: 'Eggs', amount: '3 large' },
      { name: 'Spinach', amount: '1 cup' },
      { name: 'Cheddar Cheese', amount: '1/3 cup shredded' },
      { name: 'Butter', amount: '1 tbsp' },
      { name: 'Salt', amount: '1/4 tsp' },
      { name: 'Black Pepper', amount: 'Pinch' }
    ],
    instructions: [
      { step: 1, text: 'Whisk eggs with salt and pepper until light and airy.', timerMinutes: 1 },
      { step: 2, text: 'Melt butter in non-stick pan over medium-low heat.', timerMinutes: 1 },
      { step: 3, text: 'Pour eggs into pan. Tilt pan to spread evenly as eggs begin to set.', timerMinutes: 3 },
      { step: 4, text: 'Place spinach and cheddar cheese on one half.', timerMinutes: 1 },
      { step: 5, text: 'Fold omelette over and cook 1 minute until cheese is gooey.' }
    ],
    rating: 4.6,
    reviewsCount: 67
  }
];
