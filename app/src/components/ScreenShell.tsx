import React from 'react';
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type ScreenShellProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

export default function ScreenShell({
  children,
  backgroundColor = '#000',
  style,
}: ScreenShellProps) {
  return (
    <SafeAreaView style={[styles.base, { backgroundColor }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
