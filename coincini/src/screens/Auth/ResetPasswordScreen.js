import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ErrorMessage, Formik, validateYupSchema} from 'formik';
import * as yup from 'yup';

const ResetPasswordScreen = () => {
  const {resetPassword} = useContext(AuthContext);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş geçmeyiniz')
      .email('Geçerli bir email adresi giriniz'),
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
        <Text style={{fontSize: 21}}>Şifre Sıfırla</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: ''}}
          onSubmit={values => resetPassword(values.email)}>
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

              <View style={{width: '60%'}}>
                <Button
                  color="#f00"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Şifreyi Sıfırla"></Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
