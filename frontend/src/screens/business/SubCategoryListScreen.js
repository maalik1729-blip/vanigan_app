import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import api from '../../config/api';

export default function SubCategoryListScreen({ route, navigation }) {
  const { category } = route.params;
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await api.get(`/categories/${category._id}/subcategories`);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    navigation.navigate('BusinessList', { 
      category: category._id, 
      subCategory: subCategory._id 
    });
  };

  const handleViewAll = () => {
    navigation.navigate('BusinessList', { category: category._id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Select Sub-Category</Text>
        <Text style={styles.subtitle}>{category.name}</Text>
        
        <TouchableOpacity
          style={[styles.subCategoryButton, styles.viewAllButton]}
          onPress={handleViewAll}
        >
          <Text style={styles.viewAllText}>View All in {category.name}</Text>
        </TouchableOpacity>

        {subCategories.map((subCategory) => (
          <TouchableOpacity
            key={subCategory._id}
            style={styles.subCategoryButton}
            onPress={() => handleSubCategorySelect(subCategory)}
          >
            <Text style={styles.subCategoryText}>{subCategory.name}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  subCategoryButton: {
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
  viewAllButton: {
    backgroundColor: '#4CAF50',
  },
  viewAllText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  subCategoryText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 20,
    color: '#4CAF50',
  },
});
