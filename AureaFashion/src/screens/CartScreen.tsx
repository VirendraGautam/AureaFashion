// src/screens/CartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Shadow } from '../utils/theme';
import { useStore } from '../utils/store';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const shipping = cartTotal >= 1999 ? 0 : 149;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.topbarTitle}>My Bag</Text>
          <View style={{ width: 34 }} />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySub}>
            Add items you love and they'll appear here
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>My Bag ({cart.length})</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ height: 12 }} />
        {cart.map(item => (
          <View key={`${item.id}-${item.size}`} style={styles.cartItem}>
            <View
              style={[styles.thumb, { backgroundColor: Colors.stone }]}>
              <Text style={styles.thumbEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.brand} · {item.size} · {item.colorLabel}
              </Text>
              <View style={styles.itemBottom}>
                <View style={styles.qtyCtrl}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(item.id, item.size, -1)}>
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(item.id, item.size, 1)}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id, item.size)}
                  style={styles.removeBtn}>
                  <Text style={styles.removeIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹{cartTotal.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text
              style={[
                styles.summaryValue,
                shipping === 0 && { color: Colors.success },
              ]}>
              {shipping === 0 ? 'Free' : `₹${shipping}`}
            </Text>
          </View>
          {shipping > 0 && (
            <Text style={styles.freeShipHint}>
              Add ₹{(1999 - cartTotal).toLocaleString('en-IN')} more for free shipping
            </Text>
          )}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₹{total.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Checkout button */}
      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.checkoutTotal}>₹{total.toLocaleString('en-IN')}</Text>
          <Text style={styles.checkoutItems}>{cart.length} item(s)</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  backBtn: { padding: 6 },
  backIcon: { fontSize: 22, color: Colors.noir },
  topbarTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.noir,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.noir,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.mist,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  shopBtn: {
    backgroundColor: Colors.noir,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
  },
  shopBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: 12,
    gap: 12,
    ...Shadow.card,
  },
  thumb: {
    width: 76,
    height: 92,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  thumbEmoji: { fontSize: 40 },
  itemInfo: { flex: 1 },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.noir,
    marginBottom: 4,
    lineHeight: 19,
  },
  itemMeta: { fontSize: 12, color: Colors.mist, marginBottom: 10 },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyCtrl: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    borderWidth: 0.5,
    borderColor: Colors.border,
    backgroundColor: Colors.stone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 16, fontWeight: '500', color: Colors.noir },
  qtyNum: { fontSize: 14, fontWeight: '500', color: Colors.noir, minWidth: 16, textAlign: 'center' },
  itemPrice: { fontSize: 15, fontWeight: '600', color: Colors.noir },
  removeBtn: { padding: 4 },
  removeIcon: { fontSize: 16 },
  summary: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.mist,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  summaryLabel: { fontSize: 13, color: Colors.ink },
  summaryValue: { fontSize: 13, color: Colors.noir, fontWeight: '500' },
  freeShipHint: { fontSize: 11, color: Colors.blushDark, marginTop: 2 },
  divider: { height: 0.5, backgroundColor: Colors.border, marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: '600', color: Colors.noir },
  totalValue: { fontSize: 16, fontWeight: '700', color: Colors.noir },
  checkoutBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    ...Shadow.modal,
  },
  checkoutTotal: { fontSize: 17, fontWeight: '700', color: Colors.noir },
  checkoutItems: { fontSize: 12, color: Colors.mist, marginTop: 2 },
  checkoutBtn: {
    backgroundColor: Colors.noir,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
  },
  checkoutBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});
