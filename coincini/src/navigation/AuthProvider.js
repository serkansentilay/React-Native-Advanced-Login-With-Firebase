import {View, Text} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {async} from 'node-stream-zip';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const usersColl = firestore().collection('users');
  //export direkt buraya ekledik birden fazla veri gönderecğiz
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(async result => {
                if (!result.user.emailVerified) {
                  result.user.sendEmailVerification();
                  alert('Epostanızı onaylayınız');
                }
              });
          } catch (error) {
            console.log(error);
            alert('Kullanıcı bulunamadı');
          }
        },
        signup: async (email, password, name, phone, navigation) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async result => {
                let uid = result.user.uid;
                result.user.sendEmailVerification();
                result.user.updateProfile({
                  displayName: name,
                });

                await usersColl.doc(uid).set({
                  TRY: 100000,
                  CountyPhoneCode: '',
                  CreatedDate: new Date(),
                  Email: email,
                  Password: password,
                  ImageUrl: '',
                  LastName: '',
                  Likes: 0,
                  Name: name,
                  Phone: phone,
                  Views: 0,
                });
                alert(
                  'Üyelik oluşturuldu. Lütfen email adresinize gelen maili onaylayınız..',
                );
                navigation.navigate('LoginScreen');
              });
          } catch (error) {
            console.log(error);
            alert(error);
          }
        },

        resetPassword: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
            alert('Şifre sıfırlama linki mail adresinize gönderildi');
          } catch (error) {
            console.log(error);
            alert(error);
          }
        },
        signout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
            alert(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
