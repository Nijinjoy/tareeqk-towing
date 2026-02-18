import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenShell from '../components/ScreenShell';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function WelcomeScreen({ navigation }: Props) {
  const { width } = Dimensions.get('window');
  const scrollRef = useRef<ScrollView>(null);
  const slides = useMemo(
    () => [
      {
        title: '24/7 Rapid Response',
        body: 'Immediate dispatch when you are stranded on the road.',
      },
      {
        title: 'Safe Vehicle Recovery',
        body: 'Flatbed and wheel-lift options tailored to your vehicle.',
      },
      {
        title: 'Trusted Local Team',
        body: 'Professional drivers with real-time updates.',
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const isLast = activeIndex === slides.length - 1;

  const handleNext = () => {
    const nextIndex = Math.min(activeIndex + 1, slides.length - 1);
    scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    setActiveIndex(nextIndex);
  };

  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  return (
    <ScreenShell backgroundColor={COLORS.deepBlue} style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.brand}>TAREEQK</Text>
        <Text style={styles.heroLine}>Car Recovery & Towing Services</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
      >
        {slides.map((slide) => (
          <View key={slide.title} style={[styles.slide, { width }]}>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideBody}>{slide.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={`dot-${index}`}
              style={[styles.dot, isActive && styles.dotActive]}
            />
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.cta}
        activeOpacity={0.8}
        onPress={isLast ? handleGetStarted : handleNext}
      >
        <Text style={styles.ctaText}>{isLast ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    paddingTop: 28,
    paddingHorizontal: 24,
  },
  brand: {
    fontSize: 22,
    color: COLORS.yellow,
    fontFamily: FONTS.bold,
    letterSpacing: 2,
  },
  heroLine: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.steel,
    fontFamily: FONTS.regular,
  },
  slide: {
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  slideTitle: {
    fontSize: 26,
    color: COLORS.white,
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },
  slideBody: {
    fontSize: 16,
    color: COLORS.steel,
    fontFamily: FONTS.regular,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 26,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#243846',
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.yellow,
  },
  cta: {
    marginHorizontal: 24,
    marginBottom: 28,
    backgroundColor: COLORS.yellow,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    color: COLORS.deepBlue,
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: FONTS.bold,
  },
  ctaSpacer: {
    height: 56,
    marginBottom: 28,
  },
});
