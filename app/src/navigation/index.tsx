import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from './types';
import DashboardTabs from './DashboardTabs';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationRoot() {
  const { user, isHydrating } = useAuth();

  if (isHydrating) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={COLORS.deepBlue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Dashboard" component={DashboardTabs} />
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
