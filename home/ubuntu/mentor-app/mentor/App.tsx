import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import TodoListScreen from './screens/TodoListScreen';
import ProjectScreen from './screens/ProjectScreen';
import PomodoroScreen from './screens/PomodoroScreen';
import AiAssistantScreen from './screens/AiAssistantScreen';
import SocialFeedScreen from './screens/SocialFeedScreen';
import MentorshipScreen from './screens/MentorshipScreen';
import GamificationScreen from './screens/GamificationScreen';
import ChatScreen from './screens/ChatScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const ProductivityStack = createStackNavigator();
const SocialStack = createStackNavigator();

function ProductivityStackScreen() {
  return (
    <ProductivityStack.Navigator>
      <ProductivityStack.Screen name="To-Do" component={TodoListScreen} />
      <ProductivityStack.Screen name="Projects" component={ProjectScreen} />
      <ProductivityStack.Screen name="Pomodoro" component={PomodoroScreen} />
    </ProductivityStack.Navigator>
  );
}

function SocialStackScreen() {
  return (
    <SocialStack.Navigator>
      <SocialStack.Screen name="Social Feed" component={SocialFeedScreen} />
      <SocialStack.Screen name="Mentorship" component={MentorshipScreen} />
      <SocialStack.Screen name="Chat" component={ChatScreen} />
    </SocialStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Productivity" component={ProductivityStackScreen} />
          <Tab.Screen name="AI Assistant" component={AiAssistantScreen} />
          <Tab.Screen name="Social" component={SocialStackScreen} />
          <Tab.Screen name="Gamification" component={GamificationScreen} />
          <Tab.Screen name="Profile" component={UserProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
