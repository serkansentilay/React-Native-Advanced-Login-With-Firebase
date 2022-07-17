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
import {ErrorMessage, Formik, validateYupSchema} from 'formik';
import * as yup from 'yup';

const LoginScreen = () => {
  const [isSecurePass, setIsSecurePass] = useState(true);
  const {login} = useContext(AuthContext);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş geçmeyiniz')
      .email('Geçerli bir email adresi giriniz'),
    password: yup
      .string()
      .required('Boş geçmeyiniz')
      .min(6, ({min}) => 'Şifre en az ' + min + ' karakter olmalıdır'),
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
        <Text style={{fontSize: 21}}>Üye girişi</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => login(values.email, values.password)}>
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
                name="email"
                placeholder="email adresiniz"
                style={{
                  height: 50,
                  width: '90%',
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
              <View style={{width: '60%'}}>
                <Button
                  color="#f00"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Giriş"></Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
