// src/screens/WishlistScreen.tsx
import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '../utils/theme';
import { PRODUCTS, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../utils/store';

export default function WishlistScreen() {
  const navigation = useNavigation<any>();
  const { wishlist } = useStore();
  const wishedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

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
      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>Saved items</Text>
        {wishlist.length > 0 && (
          <Text style={styles.count}>{wishlist.length} items</Text>
        )}
      </View>

      {wishedProducts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptySub}>
            Tap the heart on any product to save it here
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopBtnText}>Browse products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishedProducts}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 40 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const wishlistStyles = StyleSheet.create({
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
  topbarTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.noir,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  count: { fontSize: 12, color: Colors.mist },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 56, color: Colors.mist, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '500', color: Colors.noir, marginBottom: 8 },
  emptySub: { fontSize: 13, color: Colors.mist, textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  shopBtn: { backgroundColor: Colors.noir, paddingHorizontal: 28, paddingVertical: 13, borderRadius: BorderRadius.md },
  shopBtnText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
  grid: { paddingHorizontal: Spacing.lg, paddingTop: 16 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
});

const styles = wishlistStyles;


// ─────────────────────────────────────────────────
// src/screens/ProfileScreen.tsx (bundled here)
// ─────────────────────────────────────────────────
import React2 from 'react';
import {
  View as View2,
  Text as Text2,
  ScrollView as ScrollView2,
  TouchableOpacity as TouchableOpacity2,
  StyleSheet as StyleSheet2,
  SafeAreaView as SafeAreaView2,
  StatusBar as StatusBar2,
} from 'react-native';
import { Colors as Colors2, Spacing as Spacing2, BorderRadius as BorderRadius2, Shadow as Shadow2 } from '../utils/theme';
import { useStore as useStore2 } from '../utils/store';

export function ProfileScreen() {
  const { cartTotal, cart, wishlist } = useStore2();

  const menuItems = [
    { icon: '📦', label: 'My orders', sub: 'Track and manage orders' },
    { icon: '♡', label: 'Wishlist', sub: `${wishlist.length} saved items` },
    { icon: '📍', label: 'Saved addresses', sub: 'Manage delivery addresses' },
    { icon: '💳', label: 'Payment methods', sub: 'Cards, UPI, wallets' },
    { icon: '🏷️', label: 'Promo codes', sub: 'View available offers' },
    { icon: '⭐', label: 'Loyalty points', sub: '240 pts · Tier: Silver' },
    { icon: '🔔', label: 'Notifications', sub: 'Manage alerts' },
    { icon: '⚙️', label: 'Settings', sub: 'Account & preferences' },
    { icon: '❓', label: 'Help & support', sub: 'FAQ, chat, returns' },
  ];

  return (
    <SafeAreaView2 style={pStyles.safe}>
      <StatusBar2 barStyle="light-content" backgroundColor={Colors2.noir} />
      <ScrollView2 showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View2 style={pStyles.header}>
          <View2 style={pStyles.avatar}>
            <Text2 style={pStyles.avatarText}>PS</Text2>
          </View2>
          <View2>
            <Text2 style={pStyles.name}>Priya Sharma</Text2>
            <Text2 style={pStyles.email}>priya.sharma@email.com</Text2>
            <Text2 style={pStyles.tier}>🥈 Silver member · 240 pts</Text2>
          </View2>
        </View2>

        {/* Quick stats */}
        <View2 style={pStyles.statsRow}>
          <View2 style={pStyles.statCard}>
            <Text2 style={pStyles.statNum}>{cart.length}</Text2>
            <Text2 style={pStyles.statLabel}>In bag</Text2>
          </View2>
          <View2 style={pStyles.statCard}>
            <Text2 style={pStyles.statNum}>{wishlist.length}</Text2>
            <Text2 style={pStyles.statLabel}>Saved</Text2>
          </View2>
          <View2 style={pStyles.statCard}>
            <Text2 style={pStyles.statNum}>3</Text2>
            <Text2 style={pStyles.statLabel}>Orders</Text2>
          </View2>
        </View2>

        {/* Menu */}
        <View2 style={pStyles.menuGroup}>
          {menuItems.map((item, i) => (
            <TouchableOpacity2
              key={i}
              style={[
                pStyles.menuItem,
                i === menuItems.length - 1 && { borderBottomWidth: 0 },
              ]}>
              <Text2 style={pStyles.menuIcon}>{item.icon}</Text2>
              <View2 style={{ flex: 1 }}>
                <Text2 style={pStyles.menuLabel}>{item.label}</Text2>
                <Text2 style={pStyles.menuSub}>{item.sub}</Text2>
              </View2>
              <Text2 style={pStyles.chevron}>›</Text2>
            </TouchableOpacity2>
          ))}
        </View2>

        <View2 style={{ height: 80 }} />
      </ScrollView2>
    </SafeAreaView2>
  );
}

const pStyles = StyleSheet2.create({
  safe: { flex: 1, backgroundColor: Colors2.stone },
  header: {
    backgroundColor: Colors2.noir,
    padding: Spacing2.xl,
    paddingTop: 36,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors2.blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '600', color: Colors2.noir },
  name: { fontSize: 18, fontWeight: '500', color: Colors2.white },
  email: { fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 },
  tier: { fontSize: 11, color: Colors2.blush, marginTop: 5 },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    padding: Spacing2.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors2.white,
    borderRadius: BorderRadius2.lg,
    borderWidth: 0.5,
    borderColor: Colors2.border,
    padding: 14,
    alignItems: 'center',
    ...Shadow2.card,
  },
  statNum: { fontSize: 22, fontWeight: '700', color: Colors2.noir },
  statLabel: { fontSize: 11, color: Colors2.mist, marginTop: 3 },
  menuGroup: {
    backgroundColor: Colors2.white,
    borderRadius: BorderRadius2.lg,
    borderWidth: 0.5,
    borderColor: Colors2.border,
    marginHorizontal: Spacing2.lg,
    overflow: 'hidden',
    ...Shadow2.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors2.border,
  },
  menuIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  menuLabel: { fontSize: 14, fontWeight: '500', color: Colors2.noir },
  menuSub: { fontSize: 11, color: Colors2.mist, marginTop: 2 },
  chevron: { fontSize: 20, color: Colors2.mist },
});
