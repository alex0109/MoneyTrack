import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { singInWithGoogle } from '../../lib/api/googleAuth';

const GoogleButton = () => {
  const colors = useTheme().colors;
  const authContext = useContext(AuthContext);

  const onGoogleButtonPress = async () => {
    try {
      const token = await singInWithGoogle();
      authContext.authenticate(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={() => onGoogleButtonPress()} style={styles.socialLog}>
      <Text style={[styles.socialLogText, { color: colors.textColor }]}>
        <Text>Login with </Text>
        <Ionicons name='logo-google' size={25} color='#DB4437' />
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  socialLog: {
    width: '80%',
  },
  socialLogText: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
});
