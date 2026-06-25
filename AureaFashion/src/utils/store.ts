import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  emoji: string;
  size: string;
  color: string;
  qty: number;
}

const CART_KEY = '@aurea_cart';
const WISHLIST_KEY = '@aurea_wishlist';

export const CartStorage = {
  async get(): Promise<CartItem[]> {
    try {
      const data = await AsyncStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },
  async save(cart: CartItem[]): Promise<void> {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(CART_KEY);
  },
};

export const WishlistStorage = {
  async get(): Promise<number[]> {
    try {
      const data = await AsyncStorage.getItem(WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  },
  async save(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  },
};

export const formatPrice = (price: number): string =>
  `\u20B9${price.toLocaleString('en-IN')}`;

export const getDiscount = (price: number, original: number): number =>
  Math.round((1 - price / original) * 100);
