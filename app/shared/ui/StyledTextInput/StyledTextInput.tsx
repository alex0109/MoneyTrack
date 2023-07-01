/* eslint-disable no-unused-vars */
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

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
  onSubmitEditing?: () => void;
}

const StyledTextInput: FC<StyledTextInputProps> = ({
  label,
  color,
  placeholder,
  defaultValue,
  maxLength,
  onChangeText,
  keyboardType,
  onSubmitEditing,
}) => {
  const colors = useTheme().colors;

  return (
    <>
      <View style={{ width: '100%' }}>
        <Title>{label}</Title>
      </View>
      <TextInput
        style={[
          styles.input,
          { borderColor: color, color: colors.textColor, backgroundColor: `${color}10` },
        ]}
        defaultValue={defaultValue}
        placeholder={placeholder}
        placeholderTextColor='gray'
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
      />
    </>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 16,
  },
  input: {
    width: '80%',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
});
