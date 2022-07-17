import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../utils/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ProfilScreen = () => {
  const usersColl = firestore().collection('users');
  const {signout, user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserName, setCurrentUserName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [downloadURL, setDownloadURL] = useState();
  const [uploadTask, setUploadTask] = useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});

  const onTakePhoto = async () => {
    await launchCamera(
      {mediaType: 'photo', saveToPhotos: true, quality: 0.8},
      onMediaSelect,
    );
  };

  const onSelectImagePress = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', saveToPhotos: true, quality: 0.8},
      onMediaSelect,
    );
  };

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      setIsUploading(true);
      const ref = storage().ref('Uploads/Users/' + media.assets[0].fileName);

      const task = ref.putFile(media.assets[0].uri);

      task.then(async () => {
        const downloadURL = await ref.getDownloadURL();
        setDownloadURL(downloadURL);
        await usersColl.doc(user.uid).update({ImageUrl: downloadURL});
        setIsUploading(false);
        setUploadTaskSnapshot({});
        setShowModal(false);
        getCurrentUser();
      });
    }
  };

  const getCurrentUser = async () => {
    usersColl
      .doc(user.uid)
      .get()
      .then(result => {
        setCurrentUser(result.data());
        setCurrentUserName(result.data().Name);
      });
  };

  const updateCurrentUser = async () => {
    setIsLoading(true);
    await usersColl.doc(user.uid).update({Name: currentUserName});
    await user.updateProfile({displayName: currentUserName});
    getCurrentUser();
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser();
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
              alert('Güle Güle!');
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eee',
                padding: 10,
                margin: 10,
              }}>
              <TouchableOpacity
                onPress={onTakePhoto}
                style={{
                  margin: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  width: '80%',
                  borderColor: '#000',
                }}>
                <Text style={{fontSize: 20, color: '#000'}}>Fotoğraf Çek</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onSelectImagePress}
                style={{
                  margin: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  width: '80%',
                  borderColor: '#000',
                }}>
                <Text style={{fontSize: 20, color: '#000'}}>
                  Kütüphaneden Seç
                </Text>
              </TouchableOpacity>

              {isUploading && (
                <View
                  style={{
                    marginTop: 50,
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size={50} color="#f00"></ActivityIndicator>
                  <Text style={{fontSize: 20, color: '#000', margin: 20}}>
                    Uploading
                  </Text>
                  <Text style={{fontSize: 20, color: '#000', margin: 20}}>
                    {(
                      (uploadTaskSnapshot.bytesTransferred /
                        uploadTaskSnapshot.totalBytes) *
                      100
                    ).toFixed(2) + '% / 100%'}
                  </Text>
                </View>
              )}

              <Button
                color="#f00"
                onPress={() => setShowModal(!showModal)}
                title="Kapat"></Button>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => setShowModal(!showModal)}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#f00',
              margin: 10,
            }}>
            <Image
              source={{uri: currentUser.ImageUrl}}
              style={{flex: 1, resizeMode: 'cover', borderRadius: 50}}></Image>

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 25,
                height: 25,
                borderRadius: 20,
                backgroundColor: '#000',
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#fff',
              }}>
              <Icon name="camera" size={15} color="#fff"></Icon>
            </View>
          </TouchableOpacity>

          <Text style={{fontSize: 20, color: '#000'}}>{currentUser.Name}</Text>

          <TextInput
            name="name"
            placeholder="Adınız"
            placeholderTextColor={'#aaa'}
            style={{
              height: 50,
              color: '#000',
              width: '90%',
              paddingLeft: 5,
              margin: 10,
              borderColor: '#000',
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 16,
            }}
            onChangeText={value => setCurrentUserName(value)}
            value={currentUserName}></TextInput>

          <View style={{width: '60%'}}>
            <Button
              color="#f00"
              onPress={() => updateCurrentUser()}
              title="Güncelle"></Button>
          </View>

          <TouchableOpacity
            onPress={signout}
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Icon2 name="logout" size={35} color="#000"></Icon2>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilScreen;
