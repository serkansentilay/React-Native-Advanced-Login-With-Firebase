import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

export default App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#00f"></ActivityIndicator>
    </View>
  );
};
