import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import api from '../../config/api';

export default function NewsDetailsScreen({ route }) {
  const { newsId } = route.params;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetails();
  }, []);

  const fetchNewsDetails = async () => {
    try {
      const response = await api.get(`/news/${newsId}`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>News not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {news.images && news.images.length > 0 && (
          <ScrollView horizontal pagingEnabled style={styles.imageGallery}>
            {news.images.map((image, index) => (
              <Image key={index} source={{ uri: image.url }} style={styles.newsImage} />
            ))}
          </ScrollView>
        )}

        <View style={styles.content}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{news.category}</Text>
          </View>

          <Text style={styles.title}>{news.title}</Text>

          <View style={styles.metaInfo}>
            <Text style={styles.date}>{formatDate(news.publishedAt)}</Text>
            <Text style={styles.location}>
              📍 {news.assembly ? `${news.assembly}, ` : ''}{news.district}
            </Text>
          </View>

          <Text style={styles.content}>{news.content}</Text>

          {news.author && (
            <View style={styles.authorSection}>
              <Text style={styles.authorLabel}>Published by:</Text>
              <Text style={styles.authorName}>{news.author.name}</Text>
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
  imageGallery: {
    height: 250,
  },
  newsImage: {
    width: 400,
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    marginBottom: 25,
  },
  authorSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  authorLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
