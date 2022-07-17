import React from 'react';
import {View, Text} from 'react-native';
import {AuthProvider} from './navigation/AuthProvider';
// authprovider süslü parantez aldık ki birden fazla değer olarak göndereceğiz 1 tane authprovider
//göndermeyeceğiz
import Routes from './navigation/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes></Routes>
    </AuthProvider>
  );
};

export default App;
