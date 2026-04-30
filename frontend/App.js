import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/context/AuthContext';
import { useAutoLogout } from './src/hooks/useAutoLogout';

// Screens
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';
import CategoryListScreen from './src/screens/business/CategoryListScreen';
import SubCategoryListScreen from './src/screens/business/SubCategoryListScreen';
import BusinessListScreen from './src/screens/business/BusinessListScreen';
import BusinessDetailsScreen from './src/screens/business/BusinessDetailsScreen';
import AddBusinessScreen from './src/screens/business/AddBusinessScreen';
import DistrictSelectionScreen from './src/screens/DistrictSelectionScreen';
import AssemblySelectionScreen from './src/screens/AssemblySelectionScreen';
import OrganizerListScreen from './src/screens/organizer/OrganizerListScreen';
import MemberListScreen from './src/screens/member/MemberListScreen';
import NewsListScreen from './src/screens/news/NewsListScreen';
import NewsDetailsScreen from './src/screens/news/NewsDetailsScreen';
import SubscriptionScreen from './src/screens/subscription/SubscriptionScreen';
import PartnerSignUpScreen from './src/screens/partner/PartnerSignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const authContext = {
    user,
    setUser,
    signIn: async (userData, token) => {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    },
    signOut,
  };

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <AuthContext.Provider value={authContext}>
      <AutoLogoutWrapper isLoggedIn={!!user} signOut={signOut}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#4CAF50' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
          {!user ? (
            <>
              <Stack.Screen 
                name="Language" 
                component={LanguageSelectionScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Welcome" 
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="PartnerSignUp" 
                component={PartnerSignUpScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="MainMenu" 
                component={MainMenuScreen}
                options={{ title: 'Vanigan' }}
              />
              <Stack.Screen 
                name="CategoryList" 
                component={CategoryListScreen}
                options={{ title: 'Select Category' }}
              />
              <Stack.Screen 
                name="SubCategoryList" 
                component={SubCategoryListScreen}
                options={{ title: 'Select Sub-Category' }}
              />
              <Stack.Screen 
                name="BusinessList" 
                component={BusinessListScreen}
                options={{ title: 'Businesses' }}
              />
              <Stack.Screen 
                name="BusinessDetails" 
                component={BusinessDetailsScreen}
                options={{ title: 'Business Details' }}
              />
              <Stack.Screen 
                name="AddBusiness" 
                component={AddBusinessScreen}
                options={{ title: 'Add Business' }}
              />
              <Stack.Screen 
                name="DistrictSelection" 
                component={DistrictSelectionScreen}
                options={{ title: 'Select District' }}
              />
              <Stack.Screen 
                name="AssemblySelection" 
                component={AssemblySelectionScreen}
                options={{ title: 'Select Assembly' }}
              />
              <Stack.Screen 
                name="OrganizerList" 
                component={OrganizerListScreen}
                options={{ title: 'Organizers' }}
              />
              <Stack.Screen 
                name="MemberList" 
                component={MemberListScreen}
                options={{ title: 'Members' }}
              />
              <Stack.Screen 
                name="NewsList" 
                component={NewsListScreen}
                options={{ title: 'News' }}
              />
              <Stack.Screen 
                name="NewsDetails" 
                component={NewsDetailsScreen}
                options={{ title: 'News Details' }}
              />
              <Stack.Screen 
                name="Subscription" 
                component={SubscriptionScreen}
                options={{ title: 'Subscription Plans' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </AutoLogoutWrapper>
    </AuthContext.Provider>
  );
}

/**
 * Invisible wrapper that captures all touch events to reset the idle timer.
 * Only active when the user is logged in.
 */
function AutoLogoutWrapper({ children, isLoggedIn, signOut }) {
  const { panResponder } = useAutoLogout(signOut, isLoggedIn);

  if (!isLoggedIn) {
    // No need to intercept touches on auth screens
    return <>{children}</>;
  }

  return (
    <View style={wrapperStyles.flex} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}

const wrapperStyles = StyleSheet.create({
  flex: { flex: 1 },
});
