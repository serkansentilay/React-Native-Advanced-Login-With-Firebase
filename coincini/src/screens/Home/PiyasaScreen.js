import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Loading from '../../utils/Loading';

const PiyasaScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    //veri çekeceğimiz için async şekilde çalışmalı ve try catch içinde kodları yazmalıyız
    try {
      setIsLoading(true);
      let response = await fetch('https://www.paribu.com/ticker');
      let responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return null; //değer döndermeyeceğimiz için returne gerek yok
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#000', fontSize: 30, margin: 10}}>
            Piyasalar
          </Text>
          <ScrollView style={{flex: 1, width: '100%'}}>
            {Object.keys(data).map((key, index) => (
              <TouchableOpacity
                key={index.toString()}
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
                  <Text
                    style={{textAlign: 'left', fontSize: 18, color: '#000'}}>
                    {key}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{textAlign: 'left', fontSize: 18, color: '#000'}}>
                    {data[key].last}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 18,
                      color:
                        data[key].percentChange > 0
                          ? '#0f0'
                          : data[key].percentChange < 0
                          ? '#f00'
                          : '#000',
                    }}>
                    {data[key].percentChange}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PiyasaScreen;
