# Auréa Fashion — React Native App

A complete, production-ready fashion e-commerce app built with React Native 0.73.
Targets Android (Play Store) and iOS (App Store).

---

## Project structure

```
AureaFashion/
├── App.tsx                          # Root entry point
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Product listing, hero, categories
│   │   ├── ProductDetailScreen.tsx  # Size, colour, add to bag
│   │   ├── SearchScreen.tsx         # Full-text search + filter
│   │   ├── CartScreen.tsx           # Bag management, qty controls
│   │   ├── CheckoutScreen.tsx       # Address + demo payment form
│   │   ├── OrderConfirmScreen.tsx   # Success page with order details
│   │   └── WishlistScreen.tsx       # Saved items + Profile screen
│   ├── components/
│   │   └── ProductCard.tsx          # Reusable product tile
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Stack + bottom tab navigation
│   ├── data/
│   │   └── products.ts              # Product catalogue & types
│   └── utils/
│       ├── store.ts                 # React Context: cart + wishlist
│       └── theme.ts                 # Design tokens (colours, spacing)
├── android/
│   └── app/build.gradle            # Android build config
└── package.json
```

---

## Quick start

### Prerequisites
- Node.js 18+
- JDK 17
- Android Studio (with Android SDK 34 + emulator or physical device)
- React Native CLI

### Install & run

```bash
# 1. Install dependencies
cd AureaFashion
npm install

# 2. Start Metro bundler
npm start

# 3. Run on Android (in a new terminal)
npm run android
```

---

## Play Store build (release APK / AAB)

### Step 1 — Generate a keystore

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore aurea-release.keystore \
  -alias aurea-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Place `aurea-release.keystore` in `android/app/`.

### Step 2 — Add signing config

Edit `android/app/build.gradle` and uncomment the `signingConfigs.release` block:

```gradle
signingConfigs {
    release {
        storeFile file("aurea-release.keystore")
        storePassword "YOUR_STORE_PASSWORD"
        keyAlias "aurea-key"
        keyPassword "YOUR_KEY_PASSWORD"
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        ...
    }
}
```

> **Tip:** Use environment variables instead of hardcoding passwords.

### Step 3 — Build the AAB (recommended for Play Store)

```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Step 4 — (Optional) Build a signed APK

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## Play Store submission checklist

- [ ] App icon: 512×512 PNG (add to `android/app/src/main/res/mipmap-*/`)
- [ ] Feature graphic: 1024×500 PNG
- [ ] Screenshots: at least 2 phone screenshots (1080×1920 or 1080×2340)
- [ ] Short description: ≤80 characters
- [ ] Full description: ≤4000 characters
- [ ] Privacy policy URL (required even for demo apps)
- [ ] Content rating questionnaire completed
- [ ] Target API level: 34 (required for new apps since Aug 2024)
- [ ] AAB signed with release keystore

---

## Features implemented

| Feature | Screen |
|---|---|
| Product catalogue with 8 items | Home |
| Category filter (All / Tops / Dresses / Bottoms / Outerwear / Accessories) | Home |
| Full-text search | Search |
| Product detail with size & colour picker | ProductDetail |
| Wishlist (heart toggle, persisted in context) | Wishlist |
| Shopping bag with qty controls | Cart |
| Free shipping threshold (₹1999) | Cart |
| Checkout form (name, email, address, PIN) | Checkout |
| Demo payment UI (Card / UPI / Net banking / COD) | Checkout |
| Order confirmation with order number | OrderConfirm |
| Profile with stats and menu | Profile |
| Bottom tab navigation | AppNavigator |
| Global cart + wishlist state (React Context) | store.ts |

---

## Adding real payments (production)

Replace the demo payment section in `CheckoutScreen.tsx` with one of:

| Gateway | Package |
|---|---|
| Razorpay | `react-native-razorpay` |
| PayU | `payu-react-native-plugin` |
| Stripe | `@stripe/stripe-react-native` |
| PhonePe | PhonePe PG SDK |

---

## Next steps for production

1. **Backend API** — Replace static `products.ts` with REST/GraphQL API calls
2. **Authentication** — Add login/signup (Firebase Auth or custom JWT)
3. **Real images** — Replace emoji placeholders with `react-native-fast-image`
4. **Push notifications** — Firebase Cloud Messaging
5. **Analytics** — Firebase Analytics or Mixpanel
6. **Crash reporting** — Sentry or Firebase Crashlytics
7. **Deep links** — Universal links for share-to-product
8. **Accessibility** — `accessibilityLabel` on all interactive elements

---

## Design tokens

| Token | Value |
|---|---|
| Primary (Noir) | `#1a1a1a` |
| Accent (Blush) | `#E8C4B8` |
| Accent dark | `#C4846E` |
| Background | `#F5F3EF` |
| Muted text | `#9A9691` |
| Border | `#E8E5E0` |
