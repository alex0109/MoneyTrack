import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import Title from '../../../../shared/ui/Title/Title';

import { loginUser } from '../../lib/api/restAuth';

import { handleValidEmail } from '../../lib/helpers/handleValidEmail';

import GoogleButton from '../GoogleButton/GoogleButton';

import { styles } from './Auth.styles';

import type { FC } from 'react';

const SignIn: FC = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');

  const [emailValidError, setEmailValidError] = useState('');
  const [passValidError, setPasslValidError] = useState('');

  const [securePass, setSecurePass] = useState(true);

  const [loginDisabled, setLoginDisabled] = useState(true);
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const handleLoginUser = async () => {
    try {
      setLoginDisabled(true);
      setRegisterButtonDisabled(true);
      const token = await loginUser(inputEmail, inputPass);
      authContext.authenticate(token);
      setLoginDisabled(false);
      setRegisterButtonDisabled(false);
    } catch (error: unknown) {
      setLoginError(true);
      setRegisterButtonDisabled(false);
    }
    setInputEmail('');
    setInputPass('');
  };

  const registerButtonDisableHandler = () => {
    if (inputEmail && inputPass && !emailValidError && !passValidError) {
      setLoginDisabled(false);
      return;
    } else {
      setLoginDisabled(true);
    }
  };

  useEffect(() => {
    registerButtonDisableHandler();

    if (handleValidEmail(inputEmail) == false && inputEmail.length) {
      setEmailValidError('Enter valid email');
      return;
    } else {
      setEmailValidError('');
    }
    if (inputPass.length < 6 && inputPass.length) {
      setPasslValidError('Password must be minimum 6 charachters');
      return;
    } else {
      setPasslValidError('');
    }
  }, [inputEmail, inputPass, emailValidError, passValidError]);

  return (
    <View style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={[styles.inputsContainer, { backgroundColor: colors.themeColor }]}>
        {loginError ? (
          <Text style={{ marginVertical: 10, color: colors.red }}>
            Oops, we got some error, try again
          </Text>
        ) : (
          <></>
        )}
        <View style={[styles.inputsBlock, { backgroundColor: colors.contrastColor }]}>
          <Title>Login</Title>
          <View
            style={[
              styles.inputMain,
              { borderColor: colors.textColor },
              isEmailFocus ? { borderColor: colors.info } : null,
            ]}>
            <TextInput
              style={[styles.input, { borderColor: colors.textColor, color: colors.textColor }]}
              defaultValue={inputEmail}
              onChangeText={(input) => setInputEmail(input)}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
              placeholder='Email'
              placeholderTextColor={colors.gray}
            />
          </View>
          {emailValidError ? <Text style={{ color: colors.red }}>{emailValidError}</Text> : <></>}

          <View
            style={[
              styles.inputMain,
              { borderColor: colors.textColor },
              isPassFocus ? { borderColor: colors.info } : null,
            ]}>
            <TextInput
              style={[styles.input, { borderColor: colors.textColor, color: colors.textColor }]}
              defaultValue={inputPass}
              onChangeText={(input) => setInputPass(input)}
              secureTextEntry={securePass}
              onFocus={() => setIsPassFocus(true)}
              onBlur={() => setIsPassFocus(false)}
              maxLength={15}
              placeholder='Password'
              placeholderTextColor={colors.gray}
            />
            <TouchableOpacity
              onPressIn={() => setSecurePass(false)}
              onPressOut={() => setSecurePass(true)}>
              <Ionicons name='eye' size={25} color={colors.textColor} />
            </TouchableOpacity>
          </View>
          {passValidError ? <Text style={{ color: colors.red }}>{passValidError}</Text> : <></>}

          <View style={styles.inputButtonsContainer}>
            <TouchableOpacity disabled={loginDisabled} onPress={() => handleLoginUser()}>
              <Text
                style={[
                  styles.inputButton,
                  { color: colors.info, marginBottom: 20, fontSize: 20 },
                  loginDisabled ? { color: colors.gray } : null,
                ]}>
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={registerButtonDisabled}
              onPress={() => navigation.replace('SignUpStack')}>
              <Text
                style={[
                  styles.inputButton,
                  { color: colors.info, fontSize: 16 },
                  registerButtonDisabled ? { color: colors.gray } : null,
                ]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <GoogleButton />
      </View>
    </View>
  );
};

export default SignIn;
