// src/screens/CheckoutScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Shadow } from '../utils/theme';
import { useStore } from '../utils/store';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'cod';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { cart, cartTotal, clearCart } = useStore();
  const shipping = cartTotal >= 1999 ? 0 : 149;
  const total = cartTotal + shipping;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [payMethod, setPayMethod] = useState<PaymentMethod>('card');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCard = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const placeOrder = () => {
    if (!firstName || !email || !address || !city || !pin) {
      Alert.alert('Missing info', 'Please fill in all delivery fields.');
      return;
    }
    const orderNo = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    clearCart();
    navigation.replace('OrderConfirm', {
      orderNo,
      name: `${firstName} ${lastName}`,
      email,
      total,
      items: cart.length,
    });
  };

  const payMethods: { id: PaymentMethod; label: string; icon: string }[] = [
    { id: 'card', label: 'Credit / Debit card', icon: '💳' },
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'netbanking', label: 'Net banking', icon: '🏦' },
    { id: 'cod', label: 'Cash on delivery', icon: '💵' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Checkout</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 16 }} />

        {/* Delivery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery address</Text>
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>First name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Priya"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor={Colors.mist}
              />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Sharma"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor={Colors.mist}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="priya@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.mist}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor={Colors.mist}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="123, MG Road, Koregaon Park"
              value={address}
              onChangeText={setAddress}
              placeholderTextColor={Colors.mist}
            />
          </View>
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="Pune"
                value={city}
                onChangeText={setCity}
                placeholderTextColor={Colors.mist}
              />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>PIN code *</Text>
              <TextInput
                style={styles.input}
                placeholder="411001"
                value={pin}
                onChangeText={setPin}
                keyboardType="numeric"
                maxLength={6}
                placeholderTextColor={Colors.mist}
              />
            </View>
          </View>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment method</Text>
          <View style={styles.demoNote}>
            <Text style={styles.demoNoteIcon}>🔒</Text>
            <Text style={styles.demoNoteText}>
              Demo mode — no real payment is processed
            </Text>
          </View>
          <View style={styles.payMethods}>
            {payMethods.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.payOption,
                  payMethod === m.id && styles.payOptionActive,
                ]}
                onPress={() => setPayMethod(m.id)}>
                <Text style={styles.payIcon}>{m.icon}</Text>
                <Text
                  style={[
                    styles.payLabel,
                    payMethod === m.id && styles.payLabelActive,
                  ]}>
                  {m.label}
                </Text>
                <View
                  style={[
                    styles.radio,
                    payMethod === m.id && styles.radioActive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {payMethod === 'card' && (
            <View style={{ marginTop: Spacing.md }}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Card number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="•••• •••• •••• ••••"
                  value={cardNum}
                  onChangeText={t => setCardNum(formatCard(t))}
                  keyboardType="numeric"
                  maxLength={19}
                  placeholderTextColor={Colors.mist}
                />
              </View>
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Expiry</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM / YY"
                    value={expiry}
                    onChangeText={setExpiry}
                    keyboardType="numeric"
                    maxLength={7}
                    placeholderTextColor={Colors.mist}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="•••"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    placeholderTextColor={Colors.mist}
                  />
                </View>
              </View>
            </View>
          )}
          {payMethod === 'upi' && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>UPI ID</Text>
              <TextInput
                style={styles.input}
                placeholder="yourname@upi"
                autoCapitalize="none"
                placeholderTextColor={Colors.mist}
              />
            </View>
          )}
        </View>

        {/* Order summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order summary</Text>
          {cart.map(item => (
            <View key={`${item.id}-${item.size}`} style={styles.summaryItem}>
              <Text style={styles.summaryItemName} numberOfLines={1}>
                {item.name} ×{item.qty}
              </Text>
              <Text style={styles.summaryItemPrice}>
                ₹{(item.price * item.qty).toLocaleString('en-IN')}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.sumLabel}>Shipping</Text>
            <Text style={styles.sumVal}>
              {shipping === 0 ? 'Free' : `₹${shipping}`}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>
              ₹{total.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.placeBar}>
        <TouchableOpacity style={styles.placeBtn} onPress={placeOrder}>
          <Text style={styles.placeBtnText}>
            🔒  Place Order (Demo) — ₹{total.toLocaleString('en-IN')}
          </Text>
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
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginHorizontal: Spacing.lg,
    marginBottom: 12,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.mist,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  formRow: { flexDirection: 'row', gap: 10 },
  formGroup: { marginBottom: 10 },
  label: {
    fontSize: 11,
    color: Colors.mist,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.stone,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: Colors.noir,
  },
  demoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.stone,
    borderRadius: BorderRadius.sm,
    padding: 10,
    marginBottom: 14,
  },
  demoNoteIcon: { fontSize: 14 },
  demoNoteText: { fontSize: 12, color: Colors.mist, flex: 1, lineHeight: 18 },
  payMethods: { gap: 8 },
  payOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: 12,
    backgroundColor: Colors.stone,
  },
  payOptionActive: {
    borderColor: Colors.noir,
    backgroundColor: Colors.white,
  },
  payIcon: { fontSize: 18 },
  payLabel: { flex: 1, fontSize: 14, color: Colors.ink },
  payLabelActive: { color: Colors.noir, fontWeight: '500' },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.mist,
  },
  radioActive: { borderColor: Colors.noir, borderWidth: 5 },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  summaryItemName: { fontSize: 13, color: Colors.ink, flex: 1, marginRight: 8 },
  summaryItemPrice: { fontSize: 13, color: Colors.noir, fontWeight: '500' },
  divider: { height: 0.5, backgroundColor: Colors.border, marginVertical: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  sumLabel: { fontSize: 13, color: Colors.mist },
  sumVal: { fontSize: 13, color: Colors.noir },
  totalLabel: { fontSize: 15, fontWeight: '600', color: Colors.noir },
  totalVal: { fontSize: 16, fontWeight: '700', color: Colors.noir },
  placeBar: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    ...Shadow.modal,
  },
  placeBtn: {
    backgroundColor: Colors.noir,
    borderRadius: BorderRadius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});
