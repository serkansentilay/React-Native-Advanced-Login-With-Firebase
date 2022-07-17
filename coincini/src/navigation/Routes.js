import {View, Text} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider'; //dosyanın içinden fonksiyona erişmek için süslü parantezle çağırdık
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Loading from '../utils/Loading';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (isInitial) setIsInitial(false);
    setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <NavigationContainer>
      {user && user.emailVerified ? (
        <HomeStack></HomeStack>
      ) : (
        <AuthStack></AuthStack>
      )}
    </NavigationContainer>
  );
};

export default Routes;
