import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type HeaderProps = {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftLabel?: string;
  rightLabel?: string;
};

export default function Header({
  title,
  onLeftPress,
  onRightPress,
  leftLabel = 'Back',
  rightLabel = 'Help',
}: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backgroundAccent} />
        <View style={styles.backgroundStripe} />
        <TouchableOpacity
          style={styles.side}
          onPress={onLeftPress}
          disabled={!onLeftPress}
          activeOpacity={0.7}
        >
          {onLeftPress ? <Text style={styles.sideText}>{leftLabel}</Text> : null}
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity
          style={[styles.side, styles.sideRight]}
          onPress={onRightPress}
          disabled={!onRightPress}
          activeOpacity={0.7}
        >
          {onRightPress ? <Text style={styles.sideText}>{rightLabel}</Text> : null}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.deepBlue,
  },
  container: {
    height: 56,
    backgroundColor: COLORS.deepBlue,
    borderBottomWidth: 1,
    borderBottomColor: '#102835',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  backgroundAccent: {
    position: 'absolute',
    left: -40,
    top: -24,
    width: 160,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0f2a3b',
  },
  backgroundStripe: {
    position: 'absolute',
    right: -30,
    top: -10,
    width: 110,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#153449',
  },
  side: {
    width: 72,
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  sideText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
});
