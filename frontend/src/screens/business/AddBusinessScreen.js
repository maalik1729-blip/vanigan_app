import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../config/api';

export default function AddBusinessScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    contactNumber: '',
    email: '',
    website: '',
    street: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.category || !formData.contactNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Create business
      const businessData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        contactNumber: formData.contactNumber,
        email: formData.email,
        website: formData.website,
        address: {
          street: formData.street,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
        },
      };

      const response = await api.post('/businesses', businessData);
      const businessId = response.data._id;

      // Upload images if any
      if (images.length > 0) {
        const formDataImages = new FormData();
        images.forEach((image, index) => {
          formDataImages.append('images', {
            uri: image.uri,
            type: 'image/jpeg',
            name: `image_${index}.jpg`,
          });
        });

        await api.post(`/businesses/${businessId}/gallery`, formDataImages, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      Alert.alert('Success', 'Business added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Basic Details</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Business Name *"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description *"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat._id}
                style={[
                  styles.categoryChip,
                  formData.category === cat._id && styles.selectedChip,
                ]}
                onPress={() => setFormData({ ...formData, category: cat._id })}
              >
                <Text style={styles.chipText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Contact Number *"
          value={formData.contactNumber}
          onChangeText={(text) => setFormData({ ...formData, contactNumber: text })}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Website"
          value={formData.website}
          onChangeText={(text) => setFormData({ ...formData, website: text })}
        />

        <Text style={styles.sectionTitle}>Location Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={formData.street}
          onChangeText={(text) => setFormData({ ...formData, street: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="District"
          value={formData.district}
          onChangeText={(text) => setFormData({ ...formData, district: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={formData.state}
          onChangeText={(text) => setFormData({ ...formData, state: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={formData.pincode}
          onChangeText={(text) => setFormData({ ...formData, pincode: text })}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Gallery Photos</Text>
        
        <TouchableOpacity style={styles.imageButton} onPress={pickImages}>
          <Text style={styles.imageButtonText}>
            📷 Add Photos ({images.length} selected)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Business</Text>
          )}
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  imageButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
  },
  imageButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
