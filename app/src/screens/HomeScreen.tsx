import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header
        title="Dashboard"
        leftLabel="Menu"
        rightLabel="Alerts"
        onLeftPress={() => {}}
        onRightPress={() => {}}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>24/7 Roadside Support</Text>
          <Text style={styles.heroTitle}>Need a tow right now?</Text>
          <Text style={styles.heroBody}>
            Request immediate assistance and track your driver in real time.
          </Text>
          <TouchableOpacity style={styles.heroButton} activeOpacity={0.85}>
            <Text style={styles.heroButtonText}>Request Tow</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionHint}>Tap to start</Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.85}>
            <Text style={styles.actionTitle}>Accident</Text>
            <Text style={styles.actionBody}>Emergency response</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.85}>
            <Text style={styles.actionTitle}>Breakdown</Text>
            <Text style={styles.actionBody}>Mechanical failure</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Request</Text>
          <Text style={styles.sectionHint}>Live status</Text>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Driver</Text>
            <Text style={styles.statusValue}>Ahmed S.</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>ETA</Text>
            <Text style={styles.statusValue}>12 mins</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Truck</Text>
            <Text style={styles.statusValue}>Flatbed</Text>
          </View>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
            <Text style={styles.secondaryButtonText}>Track Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Services</Text>
          <Text style={styles.sectionHint}>What we offer</Text>
        </View>
        <View style={styles.serviceGrid}>
          <View style={styles.serviceTile}>
            <Text style={styles.serviceTitle}>City Tow</Text>
            <Text style={styles.serviceBody}>Fast urban recovery</Text>
          </View>
          <View style={styles.serviceTile}>
            <Text style={styles.serviceTitle}>Long Distance</Text>
            <Text style={styles.serviceBody}>Intercity transport</Text>
          </View>
          <View style={styles.serviceTile}>
            <Text style={styles.serviceTitle}>Battery Jump</Text>
            <Text style={styles.serviceBody}>On-site start</Text>
          </View>
          <View style={styles.serviceTile}>
            <Text style={styles.serviceTitle}>Tire Change</Text>
            <Text style={styles.serviceBody}>Mobile assistance</Text>
          </View>
        </View>

        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>Priority Membership</Text>
          <Text style={styles.calloutBody}>
            Save 20% on every tow and get priority dispatch.
          </Text>
          <TouchableOpacity style={styles.calloutButton} activeOpacity={0.85}>
            <Text style={styles.calloutButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: COLORS.deepBlue,
    borderRadius: 18,
    padding: 20,
  },
  heroEyebrow: {
    color: COLORS.steel,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: FONTS.regular,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 24,
    marginTop: 8,
    fontFamily: FONTS.bold,
  },
  heroBody: {
    color: COLORS.steel,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    fontFamily: FONTS.regular,
  },
  heroButton: {
    marginTop: 16,
    backgroundColor: COLORS.yellow,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  heroButtonText: {
    color: COLORS.deepBlue,
    fontSize: 15,
    fontFamily: FONTS.bold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.deepBlue,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  sectionHint: {
    color: '#6b7c88',
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#f4f7f9',
    padding: 16,
  },
  actionTitle: {
    color: COLORS.deepBlue,
    fontSize: 15,
    fontFamily: FONTS.bold,
  },
  actionBody: {
    marginTop: 6,
    fontSize: 14,
    color: '#5f7280',
    fontFamily: FONTS.regular,
  },
  statusCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8ed',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  statusLabel: {
    color: '#6b7c88',
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
  statusValue: {
    color: COLORS.deepBlue,
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c8d2da',
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.deepBlue,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceTile: {
    width: '48%',
    borderRadius: 14,
    backgroundColor: '#f4f7f9',
    padding: 14,
  },
  serviceTitle: {
    color: COLORS.deepBlue,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  serviceBody: {
    marginTop: 6,
    fontSize: 12,
    color: '#5f7280',
    fontFamily: FONTS.regular,
  },
  callout: {
    marginTop: 24,
    borderRadius: 16,
    padding: 18,
    backgroundColor: '#fff6e0',
  },
  calloutTitle: {
    color: '#6a4b00',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  calloutBody: {
    marginTop: 6,
    color: '#7a5a16',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONTS.regular,
  },
  calloutButton: {
    marginTop: 12,
    backgroundColor: COLORS.deepBlue,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
});
