// src/screens/ProductDetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Shadow } from '../utils/theme';
import { Product } from '../data/products';
import { useStore } from '../utils/store';

type RouteParams = { product: Product };

export default function ProductDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { product } = route.params;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    const color = product.colors[selectedColorIdx];
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      emoji: product.emoji,
      price: product.price,
      size: selectedSize,
      colorHex: color.hex,
      colorLabel: color.label,
      qty: 1,
    });
    Alert.alert('Added to bag!', `${product.name} (${selectedSize}, ${color.label}) added.`, [
      { text: 'Continue shopping', style: 'cancel' },
      { text: 'View bag', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      {/* Header */}
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Product</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.icon}>🛍️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product image */}
        <View style={[styles.imgBox, { backgroundColor: product.bgColor }]}>
          <Text style={styles.emoji}>{product.emoji}</Text>
          {discount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{discount}% off</Text>
            </View>
          )}
          {product.isNew && !discount && (
            <View style={[styles.badge, { backgroundColor: Colors.noir }]}>
              <Text style={styles.badgeText}>New arrival</Text>
            </View>
          )}
        </View>

        {/* Details card */}
        <View style={styles.body}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{product.price.toLocaleString('en-IN')}
            </Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </Text>
            )}
            {discount && (
              <View style={styles.savingBadge}>
                <Text style={styles.savingText}>Save {discount}%</Text>
              </View>
            )}
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </Text>
            <Text style={styles.ratingText}>
              {product.rating} · {product.reviews} reviews
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Size */}
          <View style={styles.sectionLabel}>
            <Text style={styles.label}>Size</Text>
            <Text style={styles.selectedLabel}>{selectedSize}</Text>
          </View>
          <View style={styles.sizesRow}>
            {product.sizes.map(sz => (
              <TouchableOpacity
                key={sz}
                style={[styles.sizeBtn, selectedSize === sz && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(sz)}>
                <Text
                  style={[styles.sizeText, selectedSize === sz && styles.sizeTextActive]}>
                  {sz}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color */}
          <View style={styles.sectionLabel}>
            <Text style={styles.label}>Colour</Text>
            <Text style={styles.selectedLabel}>
              {product.colors[selectedColorIdx].label}
            </Text>
          </View>
          <View style={styles.colorsRow}>
            {product.colors.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.colorDot,
                  { backgroundColor: c.hex },
                  selectedColorIdx === i && styles.colorDotActive,
                ]}
                onPress={() => setSelectedColorIdx(i)}
              />
            ))}
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.descLabel}>About this piece</Text>
          <Text style={styles.desc}>{product.description}</Text>

          {/* Delivery info */}
          <View style={styles.deliveryCard}>
            <Text style={styles.deliveryIcon}>🚚</Text>
            <View>
              <Text style={styles.deliveryTitle}>Free delivery above ₹1999</Text>
              <Text style={styles.deliverySub}>3–5 business days · Easy returns</Text>
            </View>
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.wishBtn, wished && styles.wishBtnActive]}
          onPress={() => toggleWishlist(product.id)}>
          <Text style={[styles.wishIcon, wished && styles.wishIconActive]}>
            {wished ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Text style={styles.cartBtnText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  backBtn: { padding: 6, borderRadius: 20 },
  backIcon: { fontSize: 22, color: Colors.noir },
  icon: { fontSize: 22 },
  topbarTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.noir,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  imgBox: {
    width: '100%',
    aspectRatio: 1 / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: { fontSize: 100 },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: Colors.blushDark,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  body: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: -20,
    padding: Spacing.xl,
    flex: 1,
  },
  brand: {
    fontSize: 11,
    color: Colors.mist,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.noir,
    marginBottom: 10,
    lineHeight: 28,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  price: { fontSize: 24, fontWeight: '600', color: Colors.noir },
  originalPrice: {
    fontSize: 16,
    color: Colors.mist,
    textDecorationLine: 'line-through',
  },
  savingBadge: {
    backgroundColor: Colors.successBg,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  savingText: { fontSize: 11, color: Colors.success, fontWeight: '600' },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.lg,
  },
  stars: { fontSize: 14, color: '#e8a020' },
  ratingText: { fontSize: 13, color: Colors.mist },
  divider: {
    height: 0.5,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  sectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.mist,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  selectedLabel: { fontSize: 12, color: Colors.noir, fontWeight: '500' },
  sizesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  sizeBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  sizeBtnActive: { backgroundColor: Colors.noir, borderColor: Colors.noir },
  sizeText: { fontSize: 13, fontWeight: '500', color: Colors.ink },
  sizeTextActive: { color: Colors.white },
  colorsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDotActive: { borderColor: Colors.noir, borderWidth: 2.5 },
  descLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.noir,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  desc: {
    fontSize: 14,
    color: Colors.ink,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.stone,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  deliveryIcon: { fontSize: 20 },
  deliveryTitle: { fontSize: 13, fontWeight: '500', color: Colors.noir },
  deliverySub: { fontSize: 12, color: Colors.mist, marginTop: 2 },
  actionBar: {
    flexDirection: 'row',
    gap: 12,
    padding: Spacing.lg,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
    ...Shadow.modal,
  },
  wishBtn: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    borderWidth: 0.5,
    borderColor: Colors.border,
    backgroundColor: Colors.stone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishBtnActive: { backgroundColor: '#fde8e8', borderColor: '#e87070' },
  wishIcon: { fontSize: 22, color: Colors.mist },
  wishIconActive: { color: '#c0392b' },
  cartBtn: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.noir,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
