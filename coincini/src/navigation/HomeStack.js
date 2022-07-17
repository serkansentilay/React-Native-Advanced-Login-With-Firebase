import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfilScreen from '../screens/Home/ProfilScreen';
import PiyasaScreen from '../screens/Home/PiyasaScreen';
import AlSatScreen from '../screens/Home/AlSatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana sayfa',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="PiyasaScreen"
        component={PiyasaScreen}
        options={{
          tabBarLabel: 'Piyasa',
          tabBarIcon: ({color, size}) => (
            <Icon name="chart-bar" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="AlSatScreen"
        component={AlSatScreen}
        options={{
          tabBarLabel: 'Kolay Al/Sat',
          tabBarIcon: ({color, size}) => (
            <Icon name="people-carry" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size}></Icon>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const HomeStack = () => {
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

export default HomeStack;
