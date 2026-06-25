// App.tsx — root entry point
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StoreProvider } from './src/utils/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider>
        <AppNavigator />
      </StoreProvider>
    </GestureHandlerRootView>
  );
}
