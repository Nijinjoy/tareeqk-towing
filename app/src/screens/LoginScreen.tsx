import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenShell from '../components/ScreenShell';
import { useAuth } from '../context/AuthContext';
import { validateUserName } from '../services/requests';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { setUser } = useAuth();
  const [role, setRole] = useState<'customer' | 'driver'>('customer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleContinue = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter your name to continue.');
      return;
    }

    try {
      await validateUserName(trimmedName, role);
      setUser({
        role,
        name: trimmedName,
        phone: phone.trim(),
      });
      setError('');
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to validate name.';
      setError(message);
    }
  };

  return (
    <ScreenShell backgroundColor={COLORS.deepBlue} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>TAREEQK</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Select your role</Text>
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'customer' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('customer')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.roleText,
                role === 'customer' && styles.roleTextActive,
              ]}
            >
              Customer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'driver' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('driver')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.roleText,
                role === 'driver' && styles.roleTextActive,
              ]}
            >
              Driver
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9aa9b3"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone (optional)</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+971 50 123 4567"
            placeholderTextColor="#9aa9b3"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.primaryCta}
          activeOpacity={0.85}
          onPress={handleContinue}
        >
          <Text style={styles.primaryCtaText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 24,
    marginBottom: 28,
  },
  brand: {
    color: COLORS.yellow,
    fontSize: 26,
    fontFamily: FONTS.bold,
    letterSpacing: 2,
  },
  subtitle: {
    marginTop: 8,
    color: COLORS.steel,
    fontSize: 15,
    fontFamily: FONTS.regular,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: COLORS.deepBlue,
    fontFamily: FONTS.bold,
    marginBottom: 16,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  roleButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe2e7',
    paddingVertical: 12,
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: COLORS.yellow,
    backgroundColor: '#fff6df',
  },
  roleText: {
    fontSize: 14,
    color: '#5f6e78',
    fontFamily: FONTS.bold,
  },
  roleTextActive: {
    color: COLORS.deepBlue,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    color: '#5f6e78',
    fontSize: 13,
    fontFamily: FONTS.bold,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: FONTS.regular,
    color: COLORS.deepBlue,
  },
  errorText: {
    color: '#b42318',
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },
  primaryCta: {
    marginTop: 6,
    backgroundColor: COLORS.yellow,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryCtaText: {
    color: COLORS.deepBlue,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});
