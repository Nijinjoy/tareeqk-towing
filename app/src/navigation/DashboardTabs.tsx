import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';

import HomeScreen from '../screens/HomeScreen';
import RequestsScreen from '../screens/RequestsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../theme/colors';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.deepBlue,
        tabBarInactiveTintColor: '#8aa0ae',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: '#c8d2da',
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Home'
              ? 'home'
              : route.name === 'Requests'
                ? 'car-sport'
                : 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
