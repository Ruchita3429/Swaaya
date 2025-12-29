export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  type: 'short' | 'long' | '2-piece';
  printType: string;
  category?: string;
}

// Central product data - single source of truth
export const allProducts: Product[] = [
  { 
    id: 1, 
    name: 'Kalamkari Hand Block Print Long Kurti', 
    price: '₹1,299', 
    image: '/products/kurti-kalamkari-1.jpg', 
    type: 'long', 
    printType: 'kalamkari',
    category: 'handblock-prints'
  },
  { 
    id: 2, 
    name: 'Pure Cotton Hand Block Print Short Kurti', 
    price: '₹899', 
    image: '/kurti-handblock-1.jpg', 
    type: 'short', 
    printType: 'handblock',
    category: 'handblock-prints'
  },
  { 
    id: 3, 
    name: 'Kalamkari Print 2 Piece Set', 
    price: '₹1,599', 
    image: '/set-kalamkari-1.jpg', 
    type: '2-piece', 
    printType: 'kalamkari',
    category: 'handblock-prints'
  },
  { 
    id: 4, 
    name: 'Hand Block Print Long Kurti with Lining Pants', 
    price: '₹1,899', 
    image: '/kurti-pants-1.jpg', 
    type: 'long', 
    printType: 'handblock',
    category: 'handblock-prints'
  },
  { 
    id: 5, 
    name: 'Ajrak Print Pure Cotton Kurti', 
    price: '₹1,199', 
    image: '/kurti-ajrak-1.jpg', 
    type: 'long', 
    printType: 'ajrak',
    category: 'handblock-prints'
  },
  { 
    id: 6, 
    name: 'Bagh Print 3 Piece Set', 
    price: '₹1,799', 
    image: '/set-bagh-1.jpg', 
    type: '2-piece', 
    printType: 'bagh',
    category: 'handblock-prints'
  },
  { 
    id: 7, 
    name: 'Jaipur Hand Block Print Short Kurti', 
    price: '₹999', 
    image: '/kurti-jaipur-1.jpg', 
    type: 'short', 
    printType: 'handblock-jaipur',
    category: 'handblock-prints'
  },
  { 
    id: 8, 
    name: 'Mul Hand Block Print Long Kurti', 
    price: '₹1,399', 
    image: '/kurti-mul-1.jpg', 
    type: 'long', 
    printType: 'handblock-mul',
    category: 'handblock-prints'
  },
  { 
    id: 9, 
    name: 'Kalamkari Print 2 Piece Set with Dupatta', 
    price: '₹1,699', 
    image: '/set-kalamkari-2.jpg', 
    type: '2-piece', 
    printType: 'kalamkari',
    category: 'handblock-prints'
  },
  { 
    id: 10, 
    name: 'Pure Cotton Hand Block Print Kurti', 
    price: '₹1,099', 
    image: '/kurti-cotton-1.jpg', 
    type: 'short', 
    printType: 'handblock',
    category: 'handblock-prints'
  },
  { 
    id: 11, 
    name: 'Mangalgiri Woven Kurti', 
    price: '₹1,499', 
    image: '/kurti-mangalgiri-1.jpg', 
    type: 'long', 
    printType: 'mangalgiri',
    category: 'woven'
  },
  { 
    id: 12, 
    name: 'Ikat Premium Long Kurti', 
    price: '₹1,899', 
    image: '/kurti-ikat-1.jpg', 
    type: 'long', 
    printType: 'ikat-premium',
    category: 'woven'
  },
  { 
    id: 13, 
    name: 'Cotton Prints Short Kurti', 
    price: '₹799', 
    image: '/kurti-prints-1.jpg', 
    type: 'short', 
    printType: 'cotton-prints',
    category: 'prints'
  },
  { 
    id: 14, 
    name: 'Cotton Silk Long Kurti', 
    price: '₹1,999', 
    image: '/kurti-silk-1.jpg', 
    type: 'long', 
    printType: 'cotton-silk',
    category: 'silk'
  },
  { 
    id: 15, 
    name: 'Chanderi Silk Kurti', 
    price: '₹2,199', 
    image: '/kurti-chanderi-1.jpg', 
    type: 'long', 
    printType: 'chanderi-silk',
    category: 'silk'
  },
  { 
    id: 16, 
    name: 'Ikat Plain Long Kurti', 
    price: '₹1,299', 
    image: '/kurti-plain-1.jpg', 
    type: 'long', 
    printType: 'ikat-plain',
    category: 'plains'
  },
];

