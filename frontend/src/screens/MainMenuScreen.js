import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { getTranslation } from '../utils/translations';

const ACCENT = '#2E7D32';
const LIGHT_ACCENT = '#E8F5E9';

const menuItems = (navigation, language) => [
  {
    title: getTranslation('businessList', language),
    subtitle: 'Browse all categories',
    IconComponent: MaterialIcons,
    iconName: 'store',
    color: '#1565C0',
    bg: '#E3F2FD',
    onPress: () => navigation.navigate('CategoryList'),
  },
  {
    title: getTranslation('organizerList', language),
    subtitle: 'View coordinators',
    IconComponent: FontAwesome5,
    iconName: 'users',
    color: '#6A1B9A',
    bg: '#F3E5F5',
    onPress: () => navigation.navigate('DistrictSelection', { type: 'organizer' }),
  },
  {
    title: getTranslation('membersList', language),
    subtitle: 'Community members',
    IconComponent: FontAwesome5,
    iconName: 'user-friends',
    color: '#00695C',
    bg: '#E0F2F1',
    onPress: () => navigation.navigate('DistrictSelection', { type: 'member' }),
  },
  {
    title: getTranslation('addBusiness', language),
    subtitle: 'Register your business',
    IconComponent: MaterialIcons,
    iconName: 'add-business',
    color: '#E65100',
    bg: '#FFF3E0',
    onPress: () => navigation.navigate('AddBusiness'),
  },
  {
    title: getTranslation('subscription', language),
    subtitle: 'Plans & membership',
    IconComponent: FontAwesome5,
    iconName: 'crown',
    color: '#F9A825',
    bg: '#FFFDE7',
    onPress: () => navigation.navigate('Subscription'),
  },
  {
    title: getTranslation('news', language),
    subtitle: 'Latest updates',
    IconComponent: MaterialIcons,
    iconName: 'article',
    color: '#C62828',
    bg: '#FFEBEE',
    onPress: () => navigation.navigate('DistrictSelection', { type: 'news' }),
  },
];

export default function MainMenuScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);
  const language = user?.language || 'en';
  const items = menuItems(navigation, language);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ACCENT} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <TouchableOpacity onPress={signOut} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info badge */}
        <View style={styles.infoBadge}>
          <MaterialIcons name="location-on" size={16} color={ACCENT} />
          <Text style={styles.infoBadgeText}>Vanigan Community Network</Text>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {items.map((item, index) => {
            const Icon = item.IconComponent;
            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={item.onPress}
                activeOpacity={0.85}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                  <Icon name={item.iconName} size={28} color={item.color} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <View style={[styles.cardArrow, { backgroundColor: item.bg }]}>
                  <MaterialIcons name="arrow-forward-ios" size={11} color={item.color} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: ACCENT,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  greeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.3,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 12,
  },
  scrollContent: {
    padding: 18,
    paddingTop: 16,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_ACCENT,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 18,
    gap: 4,
  },
  infoBadgeText: {
    fontSize: 12,
    color: ACCENT,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#9E9E9E',
    lineHeight: 16,
  },
  cardArrow: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
