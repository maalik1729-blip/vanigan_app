import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, StatusBar, Alert,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import api from '../../config/api';

const ACCENT = '#2E7D32';

const InputField = ({
  icon, IconLib = MaterialIcons, label, value, onChangeText,
  keyboardType, maxLength, placeholder, secureTextEntry,
  rightIcon, onRightIconPress,
}) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <IconLib name={icon} size={18} color={ACCENT} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || `Enter ${label}`}
        placeholderTextColor="#BDBDBD"
        keyboardType={keyboardType || 'default'}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Ionicons name={rightIcon} size={20} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default function PartnerSignUpScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '', mobileNumber: '', email: '',
    address: '', city: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async () => {
    if (!form.name.trim())      return Alert.alert('Required', 'Please enter your name.');
    if (!form.mobileNumber.trim() || form.mobileNumber.length < 10)
                                  return Alert.alert('Required', 'Enter a valid 10-digit mobile number.');
    if (!form.password)           return Alert.alert('Required', 'Please enter a password.');
    if (form.password.length < 6) return Alert.alert('Weak Password', 'Password must be at least 6 characters.');
    if (form.password !== form.confirmPassword)
                                  return Alert.alert('Mismatch', 'Passwords do not match.');

    setLoading(true);
    try {
      await api.post('/partners/signup', {
        name: form.name.trim(),
        mobileNumber: form.mobileNumber.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        password: form.password,
      });

      Alert.alert(
        '🎉 Registration Successful!',
        'Your account has been created. You can now sign in with your mobile number and password.',
        [{ text: 'Sign In', onPress: () => navigation.navigate('Welcome') }]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ACCENT} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>New Partner</Text>
          <Text style={styles.headerSubtitle}>Join Vanigan Network</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <FontAwesome5 name="handshake" size={28} color={ACCENT} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Partner Sign Up</Text>
              <Text style={styles.bannerText}>Fill in your details to register as a Vanigan partner.</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>

            {/* Section: Personal Info */}
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <InputField icon="person" label="Full Name" placeholder="e.g. Ramesh Kumar"
              value={form.name} onChangeText={set('name')} />
            <InputField icon="phone" label="Mobile Number" placeholder="10-digit mobile number"
              value={form.mobileNumber} onChangeText={set('mobileNumber')}
              keyboardType="phone-pad" maxLength={10} />
            <InputField icon="email" label="Email ID" placeholder="example@email.com"
              value={form.email} onChangeText={set('email')} keyboardType="email-address" />
            <InputField icon="location-on" label="Address" placeholder="Street / Area / Locality"
              value={form.address} onChangeText={set('address')} />
            <InputField icon="location-city" label="City" placeholder="e.g. Chennai"
              value={form.city} onChangeText={set('city')} />

            {/* Divider */}
            <View style={styles.sectionDivider} />

            {/* Section: Account Security */}
            <Text style={styles.sectionTitle}>Account Security</Text>

            <InputField icon="lock" label="Password" placeholder="Min 6 characters"
              value={form.password} onChangeText={set('password')}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)} />

            <InputField icon="lock-closed" label="Confirm Password" placeholder="Re-enter password"
              value={form.confirmPassword} onChangeText={set('confirmPassword')}
              secureTextEntry={!showConfirm}
              rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowConfirm(!showConfirm)}
              IconLib={Ionicons} />
          </View>

          {/* Note */}
          <View style={styles.note}>
            <MaterialIcons name="info-outline" size={14} color="#757575" />
            <Text style={styles.noteText}>Name, Mobile & Password are required. Min password length: 6 characters.</Text>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" size="small" />
              : <>
                  <FontAwesome5 name="user-plus" size={16} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.submitText}>Sign Up</Text>
                </>
            }
          </TouchableOpacity>

          {/* Already registered */}
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.signinLink}>
            <Text style={styles.signinLinkText}>Already registered? <Text style={{ color: ACCENT, fontWeight: '700' }}>Sign In</Text></Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    backgroundColor: ACCENT, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 18,
    flexDirection: 'row', alignItems: 'center',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    elevation: 6, shadowColor: ACCENT, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8,
  },
  backBtn: {
    width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  headerSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  scrollContent: { padding: 18, paddingBottom: 40 },
  banner: {
    backgroundColor: '#E8F5E9', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18,
    borderLeftWidth: 4, borderLeftColor: ACCENT,
  },
  bannerIcon: {
    width: 54, height: 54, backgroundColor: '#fff',
    borderRadius: 14, justifyContent: 'center', alignItems: 'center',
  },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: '#1B5E20', marginBottom: 4 },
  bannerText: { fontSize: 12, color: '#388E3C', lineHeight: 17 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 3, marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: ACCENT,
    marginBottom: 14, letterSpacing: 0.3,
  },
  sectionDivider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 16 },
  fieldWrapper: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '600', color: '#424242', marginBottom: 6, letterSpacing: 0.3 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F7FA', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#E0E0E0',
    paddingHorizontal: 12, height: 50,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#212121' },
  note: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 },
  noteText: { fontSize: 12, color: '#757575', flex: 1 },
  submitBtn: {
    backgroundColor: ACCENT, borderRadius: 16, height: 54,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8,
  },
  submitBtnDisabled: { backgroundColor: '#A5D6A7', elevation: 0, shadowOpacity: 0 },
  submitText: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.5 },
  signinLink: { alignItems: 'center', marginTop: 20 },
  signinLinkText: { fontSize: 13, color: '#757575' },
});
