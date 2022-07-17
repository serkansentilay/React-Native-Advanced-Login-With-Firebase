import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import {deviceWidth, deviceHeight} from '../../utils/dimensions';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../utils/Loading';

const HomeScreen = () => {
  const {signout, user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userCoinList, setUserCoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const usersColl = firestore().collection('users');
  const coinsColl = firestore().collection('coins');
  const userCoinsColl = firestore().collection('userCoins');

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          flexDirection: 'row',
          width: '95%',
          height: 60,
          borderWidth: 1,
          margin: 10,
          borderRadius: 20,
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          {coinList.map(deger => {
            if (deger.id == item.coinID) {
              return (
                <Text style={{textAlign: 'left', fontSize: 18, color: '#000'}}>
                  {deger.name}
                </Text>
              );
            }
          })}
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'right', fontSize: 18, color: '#000'}}>
            {item.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    usersColl
      .doc(user.uid)
      .get()
      .then(data => {
        setCurrentUser(data.data());
        userCoinsColl.onSnapshot(querySnapshot => {
          let list = [];
          querySnapshot.forEach(doc => {
            const {userID, coinID, value} = doc.data();
            if (userID == user.uid) {
              list.push({id: doc.id, userID, coinID, value});
            }
          });
          setUserCoinList(list);
        });
        coinsColl.onSnapshot(querySnapshot => {
          let list = [];
          querySnapshot.forEach(doc => {
            const {name} = doc.data();
            list.push({
              id: doc.id,
              name,
            });
          });
          setCoinList(list);
        });
      });
    setIsLoading(false);
    return null;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              margin: 20,
              padding: 20,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 5,
              width: deviceWidth / 2,
              height: deviceHeight / 8,
              borderRadius: deviceWidth,
            }}>
            <Text style={{fontSize: 20, color: '#aaa'}}>Merhaba</Text>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {user.displayName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                fontSize: 22,
              }}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {currentUser.TRY}
              </Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 2,
                  marginLeft: 5,
                }}>
                <Text style={{color: '#000'}}>TL</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 3, width: '90%'}}>
            <FlatList
              style={{flex: 1, width: '100%'}}
              data={userCoinList}
              keyExtractor={item => item.id}
              renderItem={renderItem}></FlatList>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
