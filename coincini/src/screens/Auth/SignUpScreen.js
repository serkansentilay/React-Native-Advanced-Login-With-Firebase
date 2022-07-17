import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';

const SignUpScreen = ({navigation}) => {
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);
  const {signup} = useContext(AuthContext);
  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş geçmeyiniz')
      .email('Geçerli bir email adresi giriniz'),
    password: yup
      .string()
      .required('Boş geçmeyiniz')
      .min(6, ({min}) => 'Şifre en az ' + min + ' karakter olmalıdır')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
      .matches(/\d/, 'En az 1 adet rakam kullanmalısınız')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'En az 1 adet özel karakter kullanmalısınız',
      ),
    name: yup
      .string()
      .required('Boş geçmeyiniz')
      .min(3, ({min}) => 'Adınız en az ' + min + ' karakter olmalıdır'),
    phone: yup
      .string()
      .required('Boş geçmeyiniz')
      .min(10, ({min}) => 'Numaranız en az ' + min + ' karakter olmalıdır'),

    passwordConfirm: yup
      .string()
      .required('Boş geçmeyiniz')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz'),
  });
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#ccc',
          borderRadius: 30,
        }}>
        <Text style={{fontSize: 21}}>Üye Kayıt</Text>
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={values =>
            signup(
              values.email,
              values.password,
              values.name,
              values.phone,
              navigation,
            )
          }>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                name="name"
                placeholder="isminiz"
                style={{
                  height: 50,
                  width: '90%',
                  paddingLeft: 5,
                  margin: 10,
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="default"></TextInput>
              {errors.name && (
                <Text style={{color: '#f00', fontSize: 14}}>{errors.name}</Text>
              )}

              <TextInput
                name="email"
                placeholder="email adresiniz"
                style={{
                  height: 50,
                  width: '90%',
                  paddingLeft: 5,
                  margin: 10,
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"></TextInput>
              {errors.email && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                name="phone"
                placeholder="Telefon numaranız (5*********)"
                style={{
                  height: 50,
                  width: '90%',
                  paddingLeft: 5,
                  margin: 10,
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"></TextInput>
              {errors.phone && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.phone}
                </Text>
              )}

              <View
                style={{
                  borderColor: '#000',
                  width: '90%',
                  borderWidth: 1,
                  margin: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  name="password"
                  placeholder="sifreniz"
                  style={{
                    height: 50,
                    width: '70%',
                    borderWidth: 0,
                    fontSize: 16,
                  }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}></TextInput>

                <TouchableOpacity
                  onPress={() => setIsSecurePass(!isSecurePass)}>
                  <Icon
                    name={isSecurePass ? 'eye-slash' : 'eye'}
                    style={{marginRight: 10}}
                    size={20}
                    color="#aaa"></Icon>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.password}
                </Text>
              )}
              <View
                style={{
                  borderColor: '#000',
                  width: '90%',
                  borderWidth: 1,
                  margin: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  name="passwordConfirm"
                  placeholder=" Tekrar sifreniz"
                  style={{
                    height: 50,
                    width: '70%',
                    borderWidth: 0,
                    fontSize: 16,
                  }}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                  secureTextEntry={isSecurePassConfirm}></TextInput>

                <TouchableOpacity
                  onPress={() => setIsSecurePassConfirm(!isSecurePassConfirm)}>
                  <Icon
                    name={isSecurePassConfirm ? 'eye-slash' : 'eye'}
                    style={{marginRight: 10}}
                    size={20}
                    color="#aaa"></Icon>
                </TouchableOpacity>
              </View>
              {errors.passwordConfirm && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.passwordConfirm}
                </Text>
              )}

              <View style={{width: '60%'}}>
                <Button
                  color="#f00"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Kayıt Ol"></Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
