import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image, Linking, TouchableOpacity } from 'react-native';
import api from '../../config/api';

export default function BusinessDetailsScreen({ route }) {
  const { businessId } = route.params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  const fetchBusinessDetails = async () => {
    try {
      const response = await api.get(`/businesses/${businessId}`);
      setBusiness(response.data);
    } catch (error) {
      console.error('Error fetching business details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (business?.contactNumber) {
      Linking.openURL(`tel:${business.contactNumber}`);
    }
  };

  const handleEmail = () => {
    if (business?.email) {
      Linking.openURL(`mailto:${business.email}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!business) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Business not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {business.gallery && business.gallery.length > 0 && (
          <ScrollView horizontal pagingEnabled style={styles.gallery}>
            {business.gallery.map((image, index) => (
              <Image key={index} source={{ uri: image.url }} style={styles.galleryImage} />
            ))}
          </ScrollView>
        )}

        <View style={styles.content}>
          <Text style={styles.businessName}>{business.name}</Text>
          
          {business.subscription?.plan !== 'free' && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⭐ Premium</Text>
            </View>
          )}

          <Text style={styles.description}>{business.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
              <Text style={styles.contactLabel}>📞 Phone:</Text>
              <Text style={styles.contactValue}>{business.contactNumber}</Text>
            </TouchableOpacity>

            {business.email && (
              <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
                <Text style={styles.contactLabel}>✉️ Email:</Text>
                <Text style={styles.contactValue}>{business.email}</Text>
              </TouchableOpacity>
            )}

            {business.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>🌐 Website:</Text>
                <Text style={styles.contactValue}>{business.website}</Text>
              </View>
            )}
          </View>

          {business.address && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Address</Text>
              <Text style={styles.addressText}>
                {business.address.street && `${business.address.street}, `}
                {business.address.city && `${business.address.city}, `}
                {business.address.district && `${business.address.district}, `}
                {business.address.state && `${business.address.state} `}
                {business.address.pincode}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
  },
  gallery: {
    height: 250,
  },
  galleryImage: {
    width: 400,
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 16,
    color: '#666',
    width: 100,
  },
  contactValue: {
    fontSize: 16,
    color: '#4CAF50',
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
