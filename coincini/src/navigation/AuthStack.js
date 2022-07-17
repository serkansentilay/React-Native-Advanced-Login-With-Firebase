import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="LoginScreen"
      tabBarOptions={{
        activeTintColor: '#f00',
        inactiveTintColor: '#aaa',
        style: {
          height: 60,
          backgroundColor: '#aaa',
          padding: 20,
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 18,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Giriş',
          tabBarIcon: ({color, size}) => (
            <Icon name="user-shield" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          tabBarLabel: 'Kayıt Ol',
          tabBarIcon: ({color, size}) => (
            <Icon name="user-plus" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          tabBarLabel: 'Şifre Sıfırla',
          tabBarIcon: ({color, size}) => (
            <Icon name="key" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false,
        }}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
