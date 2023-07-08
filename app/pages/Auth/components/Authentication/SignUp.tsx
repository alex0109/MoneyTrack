import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import Title from '../../../../shared/ui/Title/Title';

import { createUser } from '../../lib/api/restAuth';
import { handleValidEmail } from '../../lib/helpers/handleValidEmail';

import { styles } from './Auth.styles';

import type { FC } from 'react';

const SignIn: FC = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);
  const [isRePassFocus, setIsRePassFocus] = useState(false);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [inputRePass, setInputRePass] = useState('');

  const [securePass, setSecurePass] = useState(true);

  const [emailValidError, setEmailValidError] = useState('');
  const [passValidError, setPasslValidError] = useState('');
  const [rePassValidError, setRePassValidError] = useState('');

  const [registerDisabled, setRegisterDisabled] = useState(true);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);

  const [registerError, setRegisterError] = useState(false);

  const handleRegisterUser = async () => {
    try {
      setRegisterDisabled(true);
      setLoginButtonDisabled(true);
      const token = await createUser(inputEmail, inputPass);
      authContext.authenticate(token);
      setLoginButtonDisabled(false);
    } catch (error: unknown) {
      setRegisterError(true);
      setLoginButtonDisabled(false);
    }
    setInputEmail('');
    setInputPass('');
    setInputRePass('');
  };

  const registerButtonDisableHandler = () => {
    if (
      inputEmail &&
      inputPass &&
      inputRePass &&
      !emailValidError &&
      !passValidError &&
      !rePassValidError
    ) {
      setRegisterDisabled(false);
      return;
    } else {
      setRegisterDisabled(true);
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
    if (inputRePass !== inputPass && inputRePass.length) {
      setRePassValidError('Passwords need to match');
      return;
    } else {
      setRePassValidError('');
    }
  }, [inputEmail, inputPass, inputRePass, emailValidError, passValidError, rePassValidError]);

  return (
    <View style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={[styles.inputsContainer, { backgroundColor: colors.themeColor }]}>
        {registerError ? (
          <Text style={{ marginVertical: 10, color: colors.red }}>
            Oops, we got some error, try again
          </Text>
        ) : (
          <></>
        )}
        <View style={[styles.inputsBlock, { backgroundColor: colors.contrastColor }]}>
          <Title>Register</Title>
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
              maxLength={30}
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
              maxLength={12}
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

          <View
            style={[
              styles.inputMain,
              { borderColor: colors.textColor },
              isRePassFocus ? { borderColor: colors.info } : null,
            ]}>
            <TextInput
              style={[styles.input, { borderColor: colors.textColor, color: colors.textColor }]}
              defaultValue={inputRePass}
              onChangeText={(input) => setInputRePass(input)}
              secureTextEntry={securePass}
              onFocus={() => setIsRePassFocus(true)}
              onBlur={() => setIsRePassFocus(false)}
              maxLength={12}
              placeholder='Confirm password'
              placeholderTextColor={colors.gray}
            />
          </View>
          {rePassValidError ? <Text style={{ color: colors.red }}>{rePassValidError}</Text> : <></>}

          <View style={styles.inputButtonsContainer}>
            <TouchableOpacity disabled={registerDisabled} onPress={() => handleRegisterUser()}>
              <Text
                style={[
                  styles.inputButton,
                  { color: colors.info, marginBottom: 20, fontSize: 20 },
                  registerDisabled ? { color: colors.gray } : null,
                ]}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loginButtonDisabled}
              onPress={() => navigation.replace('SignInStack')}>
              <Text
                style={[
                  styles.inputButton,
                  { color: colors.info, fontSize: 16 },
                  loginButtonDisabled ? { color: colors.gray } : null,
                ]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
