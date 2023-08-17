import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../shared/lib/providers/AuthProvider';
import Title from '../../../shared/ui/Title/Title';

import { loginUser, signInAnonymously } from '../lib/api/restAuth';

import { handleValidEmail } from '../lib/helpers/handleValidEmail';

import { styles } from './Auth.styles';

import type { FC } from 'react';

const SignIn: FC = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

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
      const response = await loginUser(inputEmail, inputPass);
      authContext.authenticate(response.token, response.uid, false);
      setLoginDisabled(false);
      setRegisterButtonDisabled(false);
    } catch (error: unknown) {
      setLoginError(true);
      setRegisterButtonDisabled(false);
    }
    setInputEmail('');
    setInputPass('');
  };

  const handleLoginAnonymouslyUser = async () => {
    try {
      setLoginDisabled(true);
      setRegisterButtonDisabled(true);
      const response = await signInAnonymously();
      authContext.authenticate(response.token, response.uid, true);
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
      setEmailValidError(`${t('auth.emailError')}`);
      return;
    } else {
      setEmailValidError('');
    }
    if (inputPass.length < 6 && inputPass.length) {
      setPasslValidError(`${t('auth.passwordError')}`);
      return;
    } else {
      setPasslValidError('');
    }
  }, [inputEmail, inputPass, emailValidError, passValidError]);

  return (
    <View style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={[styles.inputsContainer, { backgroundColor: colors.themeColor }]}>
        {loginError ? (
          <Text style={{ marginVertical: 10, color: colors.red, fontFamily: 'NotoSans-Regular' }}>
            {t('auth.serverError')}
          </Text>
        ) : (
          <></>
        )}
        <View style={[styles.inputsBlock, { backgroundColor: colors.contrastColor }]}>
          <Title>{t('auth.loginTitle')}</Title>
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
              placeholder={`${t('auth.emailInput')}`}
              placeholderTextColor={colors.gray}
            />
          </View>
          {emailValidError ? (
            <Text style={{ color: colors.red, fontFamily: 'NotoSans-Regular' }}>
              {emailValidError}
            </Text>
          ) : (
            <></>
          )}

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
              placeholder={`${t('auth.passwordInput')}`}
              placeholderTextColor={colors.gray}
            />
            <TouchableOpacity onPress={() => setSecurePass((state) => !state)}>
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
                {`${t('auth.signInButton')}`}
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
                {`${t('auth.registerButton')}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleLoginAnonymouslyUser()}>
          <Text style={{ color: colors.textColor, fontFamily: 'NotoSans-SemiBold' }}>
            {t('auth.guest')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
