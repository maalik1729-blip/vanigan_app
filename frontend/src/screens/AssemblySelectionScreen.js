import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ASSEMBLIES } from '../utils/constants';

export default function AssemblySelectionScreen({ route, navigation }) {
  const { district, type } = route.params;
  const assemblies = ASSEMBLIES[district] || [];

  const handleAssemblySelect = (assembly) => {
    if (type === 'organizer') {
      navigation.navigate('OrganizerList', { district, assembly });
    } else if (type === 'member') {
      navigation.navigate('MemberList', { district, assembly });
    } else if (type === 'news') {
      navigation.navigate('NewsList', { district, assembly });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Select Assembly</Text>
        <Text style={styles.subtitle}>{district}</Text>
        
        {assemblies.map((assembly, index) => (
          <TouchableOpacity
            key={index}
            style={styles.assemblyButton}
            onPress={() => handleAssemblySelect(assembly)}
          >
            <Text style={styles.assemblyText}>{assembly}</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  assemblyButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  assemblyText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 20,
    color: '#4CAF50',
  },
});
