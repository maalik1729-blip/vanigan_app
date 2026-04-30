import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LANGUAGES } from '../utils/constants';

export default function LanguageSelectionScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleContinue = () => {
    navigation.navigate('Welcome', { language: selectedLanguage });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Language</Text>
        <Text style={styles.subtitle}>अपनी भाषा चुनें</Text>
        
        <View style={styles.languageList}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                selectedLanguage === lang.code && styles.selectedLanguage,
              ]}
              onPress={() => setSelectedLanguage(lang.code)}
            >
              <Text style={styles.languageName}>{lang.nativeName}</Text>
              <Text style={styles.languageCode}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  languageList: {
    marginBottom: 40,
  },
  languageButton: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  selectedLanguage: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  languageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  languageCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
