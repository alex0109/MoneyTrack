/* eslint-disable no-unused-vars */
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../Title/Title';

import type { FC } from 'react';

interface StyledTextInputProps {
  label: string;
  color: string;
  placeholder: string;
  defaultValue: string;
  maxLength: number;
  onChangeText: (input: string) => void;
  keyboardType: 'numeric' | 'default';
  submitEditing: () => void;
  submitDisable: boolean;
}

const StyledTextInput: FC<StyledTextInputProps> = ({
  label,
  color,
  placeholder,
  defaultValue,
  maxLength,
  onChangeText,
  keyboardType,
  submitEditing,
  submitDisable,
}) => {
  const colors = useTheme().colors;

  return (
    <>
      <View style={{ width: '100%' }}>
        <Title>{label}</Title>
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: color,
            backgroundColor: `${color}10`,
          },
        ]}>
        <TextInput
          style={[styles.input, { color: colors.textColor }]}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor='gray'
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
          selectTextOnFocus={true}
        />
        {submitDisable ? (
          <TouchableOpacity
            style={{
              borderLeftWidth: 1,
              borderLeftColor: colors.warning,
            }}
            onPress={() => submitEditing()}>
            <Ionicons name='checkmark' size={35} color={colors.warning} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            style={{
              borderLeftWidth: 1,
              borderLeftColor: colors.warning,
            }}>
            <Ionicons name='checkmark-done' size={35} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'NotoSans-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    fontSize: 18,
    fontFamily: 'NotoSans-Regular',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    width: '90%',
    fontSize: 18,
    fontFamily: 'NotoSans-Regular',
  },
});
