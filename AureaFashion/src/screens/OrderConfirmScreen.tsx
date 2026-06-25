// src/screens/OrderConfirmScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Shadow } from '../utils/theme';

type Params = {
  orderNo: string;
  name: string;
  email: string;
  total: number;
  items: number;
};

export default function OrderConfirmScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: Params }, 'params'>>();
  const { orderNo, name, email, total, items } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconWrap}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
        <Text style={styles.orderId}>{orderNo}</Text>
        <Text style={styles.title}>Order placed!</Text>
        <Text style={styles.sub}>
          Your demo order has been received.{'\n'}A confirmation email would be
          sent to {email}.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Customer</Text>
            <Text style={styles.rowVal}>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowVal}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Items</Text>
            <Text style={styles.rowVal}>{items}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Total paid</Text>
            <Text style={[styles.rowVal, { fontWeight: '700' }]}>
              ₹{total.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.rowLabel}>Estimated delivery</Text>
            <Text style={styles.rowVal}>3–5 business days</Text>
          </View>
        </View>

        <View style={styles.demoNote}>
          <Text style={styles.demoText}>
            🔒 This was a demo order — no real payment was charged
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.continueBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.stone },
  container: {
    alignItems: 'center',
    padding: Spacing.xl,
    paddingTop: 48,
  },
  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#eaf3de',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkIcon: { fontSize: 36, color: '#3b6d11' },
  orderId: { fontSize: 12, color: Colors.mist, marginBottom: 6, letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: '500', color: Colors.noir, marginBottom: 10 },
  sub: {
    fontSize: 13,
    color: Colors.mist,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: 16,
    ...Shadow.card,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  rowLabel: { fontSize: 13, color: Colors.mist },
  rowVal: { fontSize: 13, color: Colors.noir },
  demoNote: {
    backgroundColor: Colors.stone,
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 24,
    width: '100%',
  },
  demoText: { fontSize: 12, color: Colors.mist, textAlign: 'center' },
  continueBtn: {
    width: '100%',
    backgroundColor: Colors.noir,
    borderRadius: BorderRadius.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
