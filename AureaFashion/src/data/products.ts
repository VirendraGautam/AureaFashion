export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  emoji: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  bgColor: string;
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Linen Wrap Dress',
    brand: 'Studio Aurea',
    price: 2499,
    originalPrice: 3299,
    category: 'Dresses',
    emoji: '👗',
    colors: ['#E8C4B8', '#C4846E', '#1a1a1a'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 124,
    description: 'A breezy linen wrap dress with adjustable ties. Perfect for effortless summer dressing. Slightly relaxed fit with a graceful midi length.',
    bgColor: '#f9f0ec',
    isNew: true,
  },
  {
    id: 2,
    name: 'Silk Cami Top',
    brand: 'Studio Aurea',
    price: 1299,
    category: 'Tops',
    emoji: '👚',
    colors: ['#F5EFD6', '#E8C4B8', '#9a9691'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.6,
    reviews: 89,
    description: 'Luxuriously soft silk cami with adjustable straps and a subtle cowl neck. Versatile enough to dress up or down.',
    bgColor: '#f0edf8',
  },
  {
    id: 3,
    name: 'Wide-Leg Trousers',
    brand: 'Aurea Studio',
    price: 3199,
    originalPrice: 3999,
    category: 'Bottoms',
    emoji: '👖',
    colors: ['#3d3935', '#9a9691', '#F5EFD6'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 207,
    description: 'Tailored wide-leg trousers in a fluid fabric. High-rise waist and wide silhouette create an effortlessly polished look.',
    bgColor: '#edf5f0',
  },
  {
    id: 4,
    name: 'Linen Blazer',
    brand: 'Studio Aurea',
    price: 4999,
    originalPrice: 6499,
    category: 'Outerwear',
    emoji: '🧥',
    colors: ['#E8C4B8', '#1a1a1a', '#F5F3EF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 63,
    description: 'Unstructured linen blazer with subtle shoulder padding and clean lines. Pairs beautifully with tailored trousers or denim.',
    bgColor: '#f8f4e8',
  },
  {
    id: 5,
    name: 'Pleated Midi Skirt',
    brand: 'Aurea Studio',
    price: 1899,
    originalPrice: 2499,
    category: 'Bottoms',
    emoji: '👘',
    colors: ['#E8C4B8', '#9a9691', '#3d3935'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5,
    reviews: 156,
    description: 'Lightweight pleated midi skirt that flows effortlessly with movement. Elasticated waist for a comfortable all-day fit.',
    bgColor: '#ecf2f9',
  },
  {
    id: 6,
    name: 'Stripe Knit Tee',
    brand: 'Studio Aurea',
    price: 999,
    category: 'Tops',
    emoji: '👕',
    colors: ['#F5F3EF', '#E8C4B8', '#1a1a1a'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.4,
    reviews: 312,
    description: 'A classic stripe knit tee in breathable cotton. Slightly relaxed silhouette with ribbed neckline and hemline.',
    bgColor: '#f8ece9',
  },
  {
    id: 7,
    name: 'Minimal Tote Bag',
    brand: 'Aurea Studio',
    price: 3499,
    category: 'Accessories',
    emoji: '👜',
    colors: ['#E8C4B8', '#1a1a1a', '#9a9691'],
    sizes: ['One size'],
    rating: 4.9,
    reviews: 88,
    description: 'Structured minimal tote in vegan leather. Magnetic clasp closure, inner zip pocket, and comfortable top handles.',
    bgColor: '#eef8f3',
    isNew: true,
  },
  {
    id: 8,
    name: 'Floral Maxi Dress',
    brand: 'Studio Aurea',
    price: 3299,
    originalPrice: 4199,
    category: 'Dresses',
    emoji: '🌸',
    colors: ['#E8C4B8', '#F5EFD6', '#C4846E'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.6,
    reviews: 99,
    description: 'Romantic floral maxi dress with adjustable tie straps and a sweeping hem. Lined bodice for comfortable wear.',
    bgColor: '#f5ecf4',
  },
];

export const CATEGORIES = ['All', 'Tops', 'Dresses', 'Bottoms', 'Outerwear', 'Accessories'];
