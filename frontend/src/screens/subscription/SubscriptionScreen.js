import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import api from '../../config/api';

export default function SubscriptionScreen({ route, navigation }) {
  const { businessId } = route.params || {};
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/subscriptions/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan) => {
    if (!businessId) {
      Alert.alert('Error', 'Please select a business first');
      return;
    }

    Alert.alert(
      'Confirm Subscription',
      `Subscribe to ${plan.name} for ₹${plan.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: async () => {
            setSubscribing(true);
            try {
              await api.post('/subscriptions', {
                businessId,
                plan: plan.id,
                amount: plan.price,
              });

              Alert.alert('Success', 'Subscription activated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert('Error', error.response?.data?.message || 'Failed to subscribe');
            } finally {
              setSubscribing(false);
            }
          },
        },
      ]
    );
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
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Boost your business visibility</Text>

        {plans.map((plan) => (
          <View
            key={plan.id}
            style={[
              styles.planCard,
              plan.id === 'lifetime' && styles.featuredPlan,
            ]}
          >
            {plan.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{plan.discount}</Text>
              </View>
            )}

            <Text style={styles.planName}>{plan.name}</Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.currency}>₹</Text>
              <Text style={styles.price}>{plan.price}</Text>
              {plan.duration && (
                <Text style={styles.duration}>/{plan.duration} days</Text>
              )}
            </View>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.subscribeButton,
                plan.id === 'lifetime' && styles.featuredButton,
                subscribing && styles.disabledButton,
              ]}
              onPress={() => handleSubscribe(plan)}
              disabled={subscribing}
            >
              <Text style={styles.subscribeButtonText}>
                {subscribing ? 'Processing...' : 'Subscribe Now'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Why Subscribe?</Text>
          <Text style={styles.infoText}>
            • Get more visibility for your business{'\n'}
            • Reach more customers{'\n'}
            • Build trust with verified badge{'\n'}
            • Access premium features
          </Text>
        </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredPlan: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  currency: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  duration: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 10,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  featuredButton: {
    backgroundColor: '#FFD700',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});
