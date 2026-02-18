import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

export default function ProfileScreen() {
  const { user, setUser } = useAuth();
  const profileName = user?.name || 'Tareeqk User';
  const profilePhone = user?.phone || 'Add phone number';
  const profileRole = user?.role === 'driver' ? 'Driver' : 'Customer';
  const initials = profileName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <View style={styles.container}>
      <Header title="Profile" rightLabel="Edit" onRightPress={() => {}} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'TA'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profileName}</Text>
            <Text style={styles.phone}>{profilePhone}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{profileRole}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionCard} activeOpacity={0.85}>
              <Text style={styles.actionTitle}>My Vehicles</Text>
              <Text style={styles.actionBody}>2 registered</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} activeOpacity={0.85}>
              <Text style={styles.actionTitle}>Payment</Text>
              <Text style={styles.actionBody}>Visa •••• 1290</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.listCard}>
            <View style={styles.listRow}>
              <Text style={styles.listLabel}>Notifications</Text>
              <Text style={styles.listValue}>Enabled</Text>
            </View>
            <View style={styles.listRow}>
              <Text style={styles.listLabel}>Language</Text>
              <Text style={styles.listValue}>English</Text>
            </View>
            <View style={styles.listRow}>
              <Text style={styles.listLabel}>Support</Text>
              <Text style={styles.listValue}>24/7 Hotline</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.listCard}>
            <TouchableOpacity style={styles.listRow} activeOpacity={0.85}>
              <Text style={styles.listLabel}>Saved Addresses</Text>
              <Text style={styles.listValue}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listRow} activeOpacity={0.85}>
              <Text style={styles.listLabel}>Membership</Text>
              <Text style={styles.listValue}>Priority</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listRow} activeOpacity={0.85}>
              <Text style={styles.listLabel}>Terms & Privacy</Text>
              <Text style={styles.listValue}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.signOut}
          activeOpacity={0.85}
          onPress={() => setUser(null)}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: COLORS.deepBlue,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.deepBlue,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  phone: {
    color: COLORS.steel,
    fontSize: 13,
    marginTop: 4,
    fontFamily: FONTS.regular,
  },
  statusPill: {
    backgroundColor: '#173b52',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 11,
    fontFamily: FONTS.bold,
    letterSpacing: 0.4,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    color: COLORS.deepBlue,
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#f4f7f9',
  },
  actionTitle: {
    color: COLORS.deepBlue,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  actionBody: {
    marginTop: 6,
    color: '#5f7280',
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  listCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8ed',
    backgroundColor: COLORS.white,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eef3f6',
  },
  listLabel: {
    color: COLORS.deepBlue,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  listValue: {
    color: '#5f7280',
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
  signOut: {
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#fbeaea',
    alignItems: 'center',
  },
  signOutText: {
    color: '#b42318',
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
});
