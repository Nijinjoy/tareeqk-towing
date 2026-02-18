import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TowTruck() {
  return (
    <View style={styles.wrap}>
      <View style={styles.body} />
      <View style={styles.cabin} />
      <View style={styles.win} />
      <View style={styles.hook} />
      <View style={styles.wheelLeft} />
      <View style={styles.wheelRight} />
      <View style={styles.wheelCenterLeft} />
      <View style={styles.wheelCenterRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 160,
    height: 80,
  },
  body: {
    position: 'absolute',
    left: 14,
    top: 34,
    width: 108,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#f5b21a',
  },
  cabin: {
    position: 'absolute',
    left: 96,
    top: 18,
    width: 44,
    height: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#f5b21a',
  },
  win: {
    position: 'absolute',
    left: 106,
    top: 22,
    width: 20,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#0b1e2b',
  },
  hook: {
    position: 'absolute',
    left: 8,
    top: 26,
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c7d5df',
  },
  wheelLeft: {
    position: 'absolute',
    left: 26,
    bottom: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0b1e2b',
  },
  wheelRight: {
    position: 'absolute',
    left: 96,
    bottom: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0b1e2b',
  },
  wheelCenterLeft: {
    position: 'absolute',
    left: 32,
    bottom: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6f8593',
  },
  wheelCenterRight: {
    position: 'absolute',
    left: 102,
    bottom: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6f8593',
  },
});
