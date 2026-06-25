// src/screens/HomeScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/theme';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../utils/store';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount } = useStore();

  const filtered =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      />
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      {/* Topbar */}
      <View style={styles.topbar}>
        <Text style={styles.logo}>Auréa</Text>
        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Search')}>
            <Text style={styles.icon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.icon}>🛍️</Text>
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroAccent} />
          <Text style={styles.heroEyebrow}>New Collection</Text>
          <Text style={styles.heroTitle}>{'Summer\nEssentials\n2025'}</Text>
          <Text style={styles.heroSub}>
            Effortless style for the modern wardrobe
          </Text>
          <TouchableOpacity
            style={styles.heroCta}
            onPress={() => setActiveCategory('All')}>
            <Text style={styles.heroCtaText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        {/* Promo strip */}
        <View style={styles.promoStrip}>
          <Text style={styles.promoText}>
            Free shipping above ₹1999 · Use AUREA10 for 10% off
          </Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catsContainer}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, activeCategory === cat && styles.catPillActive]}
              onPress={() => setActiveCategory(cat)}>
              <Text
                style={[
                  styles.catText,
                  activeCategory === cat && styles.catTextActive,
                ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section header */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'All' ? 'Featured' : activeCategory}
          </Text>
          <Text style={styles.count}>{filtered.length} items</Text>
        </View>

        {/* Product grid */}
        <FlatList
          data={filtered}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          scrollEnabled={false}
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.stone },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  logo: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.noir,
    letterSpacing: 1.5,
    fontFamily: Typography.display.fontFamily,
  },
  topActions: { flexDirection: 'row', gap: 4 },
  iconBtn: {
    padding: 8,
    borderRadius: 20,
    position: 'relative',
  },
  icon: { fontSize: 20 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.blushDark,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: '700' },
  hero: {
    backgroundColor: Colors.noir,
    padding: Spacing.xl,
    paddingTop: 36,
    paddingBottom: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  heroAccent: {
    position: 'absolute',
    right: -30,
    bottom: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(232,196,184,0.12)',
  },
  heroEyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.blush,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '500',
    color: Colors.white,
    lineHeight: 40,
    marginBottom: 12,
    fontFamily: Typography.display.fontFamily,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 24,
    lineHeight: 20,
  },
  heroCta: {
    backgroundColor: Colors.blush,
    alignSelf: 'flex-start',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 3,
  },
  heroCtaText: {
    color: Colors.noir,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  promoStrip: {
    backgroundColor: Colors.blushDark,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
  },
  promoText: {
    color: Colors.white,
    fontSize: 11.5,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  catsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginRight: 8,
  },
  catPillActive: {
    backgroundColor: Colors.noir,
    borderColor: Colors.noir,
  },
  catText: {
    fontSize: 13,
    color: Colors.ink,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  catTextActive: { color: Colors.white, fontWeight: '500' },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.noir,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  count: { fontSize: 12, color: Colors.mist },
  grid: { paddingHorizontal: Spacing.lg },
  row: { justifyContent: 'space-between', marginBottom: 12 },
});
