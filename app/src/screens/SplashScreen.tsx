import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import TowTruck from '../assets/illustrations/TowTruck';
import ScreenShell from '../components/ScreenShell';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

const pulseRing = require('../assets/lottie/pulse-ring.json');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1600);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <ScreenShell backgroundColor={COLORS.deepBlue} style={styles.container}>
      <View style={styles.lottieWrap}>
        <LottieView source={pulseRing} autoPlay loop style={styles.lottie} />
      </View>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <TowTruck />
        <Text style={styles.logo}>TAREEQK</Text>
        <Text style={styles.tagline}>
          Fast. Reliable. 24/7 Roadside Assistance.
        </Text>
      </Animated.View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieWrap: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    marginTop: 14,
    fontSize: 30,
    color: COLORS.yellow,
    fontFamily: FONTS.bold,
    letterSpacing: 2,
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.steel,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
});
