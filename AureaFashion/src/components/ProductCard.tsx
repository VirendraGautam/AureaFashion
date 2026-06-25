// src/components/ProductCard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../utils/theme';
import { Product } from '../data/products';
import { useStore } from '../utils/store';

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const { toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.92}>
      <View style={[styles.imgBox, { backgroundColor: product.bgColor }]}>
        <Text style={styles.emoji}>{product.emoji}</Text>
        {discount && (
          <View style={styles.discBadge}>
            <Text style={styles.discText}>{discount}% off</Text>
          </View>
        )}
        {product.isNew && !discount && (
          <View style={[styles.discBadge, { backgroundColor: Colors.noir }]}>
            <Text style={styles.discText}>New</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.wishBtn, wished && styles.wishBtnActive]}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.wishIcon, wished && styles.wishIconActive]}>
            {wished ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{product.price.toLocaleString('en-IN')}
          </Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  imgBox: {
    width: '100%',
    aspectRatio: 3 / 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 52,
  },
  discBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.blushDark,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  discText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  wishBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishBtnActive: {
    backgroundColor: '#fde8e8',
    borderColor: '#e87070',
  },
  wishIcon: {
    fontSize: 15,
    color: Colors.mist,
  },
  wishIconActive: {
    color: '#c0392b',
  },
  info: {
    padding: Spacing.md,
    paddingTop: 10,
  },
  brand: {
    fontSize: 10,
    color: Colors.mist,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.noir,
    marginBottom: 6,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.noir,
  },
  originalPrice: {
    fontSize: 11,
    color: Colors.mist,
    textDecorationLine: 'line-through',
  },
});
