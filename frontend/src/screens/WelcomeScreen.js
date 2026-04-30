import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert, ActivityIndicator,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import api from '../config/api';

const ACCENT = '#2E7D32';

export default function WelcomeScreen({ route, navigation }) {
  const { language = 'en' } = route.params || {};
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!mobileNumber.trim()) {
      return Alert.alert('Error', 'Please enter your mobile number');
    }
    if (mobileNumber.length < 10) {
      return Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
    }
    if (!password.trim()) {
      return Alert.alert('Error', 'Please enter your password');
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login', { mobileNumber, password });
      await signIn(response.data.user, response.data.token);
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <FontAwesome5 name="store" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>Vanigan</Text>
          <Text style={styles.subtitle}>Your community business network</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Sign In</Text>

          {/* Mobile Number */}
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="phone" size={18} color={ACCENT} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#BDBDBD"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="lock" size={18} color={ACCENT} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#BDBDBD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={styles.loginBtnText}>Sign In</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Partner Sign Up */}
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate('PartnerSignUp')}
          activeOpacity={0.85}
        >
          <FontAwesome5 name="handshake" size={15} color={ACCENT} style={{ marginRight: 8 }} />
          <Text style={styles.signupBtnText}>New Partner? Sign Up</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 22,
    backgroundColor: ACCENT, justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, elevation: 6,
    shadowColor: ACCENT, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 8,
  },
  title: { fontSize: 30, fontWeight: '800', color: '#1A1A2E', letterSpacing: 0.5 },
  subtitle: { fontSize: 13, color: '#9E9E9E', marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 22,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 4, marginBottom: 20,
  },
  cardHeading: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 18 },
  label: { fontSize: 12, fontWeight: '600', color: '#424242', marginBottom: 6, letterSpacing: 0.3 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FA', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#E0E0E0',
    paddingHorizontal: 12, height: 50, marginBottom: 14,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#212121' },
  loginBtn: {
    backgroundColor: ACCENT, height: 50, borderRadius: 13,
    justifyContent: 'center', alignItems: 'center', marginTop: 4,
    elevation: 3, shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6,
  },
  loginBtnDisabled: { backgroundColor: '#A5D6A7', elevation: 0 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { fontSize: 12, color: '#BDBDBD', fontWeight: '600' },
  signupBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#E8F5E9', borderRadius: 13, height: 50,
    borderWidth: 1.5, borderColor: '#A5D6A7',
  },
  signupBtnText: { color: ACCENT, fontSize: 15, fontWeight: '700' },
});
