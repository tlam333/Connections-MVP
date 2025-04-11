export interface InterestCategory {
    category: string;
    options: string[];
  }
  
  export const interestCategories: InterestCategory[] = [
    {
      category: 'Sports',
      options: ['Soccer', 'Basketball', 'Boxing', 'Tennis', 
        'MMA'
      ],
    },
    {
      category: 'Gaming',
      options: ['FPS', 'RPG', 'Strategy', 'MOBA'],
    },
    {
      category: 'Art',
      options: ['Painting', 'Sculpture', 'Digital Art'],
    },
    {
      category: 'Tech',
      options: ['Programming', 'Gadgets', 'AI', 'VR'],
    },
    {
      category: 'Philosophy',
      options: ['Stoicism', 'Existentialism', 'Ethics'],
    },
  ];
  