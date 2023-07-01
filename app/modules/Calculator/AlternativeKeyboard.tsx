import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../shared/lib/hooks/useActions';

import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';

import CalculatorButton from './CalculatorButton';

import type { FC } from 'react';

interface AlternativeKeyboardProps {
  categoryID: string;
}

const AlternativeKeyboard: FC<AlternativeKeyboardProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const { handleTopUpCategory, handleDecreaseCount } = useActions();
  const [calc, setCalc] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [currentCount, setCurrentCount] = useState(0);
  const { count } = useTypedSelector((state) => state);

  const ops: string[] = ['/', '*', '+', '-', '.'];

  const updateCalc = (value: string) => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }

    if (calc.length > 10) {
      return;
    }

    setCalc(calc + value);
  };

  const clear = () => {
    setCalc('');
    setResult('');
  };

  //Problem with deleting result
  const deleteLast = () => {
    if (calc === '') {
      setCalc('');
      return;
    }
    const value = calc.slice(0, -1);

    if (value) {
      setCalc(value);
      setResult(eval(value).toString());
    } else {
      clear();
    }
  };

  const topUpCategoryHandler = () => {
    handleTopUpCategory({ index: categoryID, value: Number(result) });
    handleDecreaseCount({ index: count[currentCount].index, value: Number(result) });
    clear();
  };

  const changeCountHandler = () => {
    if (currentCount == count.length - 1) {
      setCurrentCount(0);
    } else {
      setCurrentCount((index) => index + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: colors.textColor,
              marginRight: 20,
              fontSize: calc.length > 6 ? 26 : 32,
            }}>
            {calc == '' ? (
              <Text style={{ fontSize: 16, color: 'gray' }}>Type your value...</Text>
            ) : (
              calc
            )}
          </Text>
        </View>
        <View style={{ justifyContent: 'flex-start', height: '100%' }}>
          <TouchableOpacity onPress={() => changeCountHandler()}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: colors.textColor }}>
              {count.length > 0 ? count[currentCount].title : 'No counts'}
            </Text>
            <Text style={{ textAlign: 'center', color: colors.textColor }}>
              {count.length > 0 ? count[currentCount].value : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonRows}>
        <View style={styles.row}>
          <CalculatorButton onPress={() => clear()} title='C' />
          <TouchableOpacity onPress={() => deleteLast()} style={styles.iconButton}>
            <Ionicons size={40} name='backspace' color={colors.textColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => topUpCategoryHandler()} style={styles.iconButton}>
            <Ionicons size={40} name='checkmark-outline' color='green' />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={() => updateCalc('7')} title='7' />
          <CalculatorButton onPress={() => updateCalc('8')} title='8' />
          <CalculatorButton onPress={() => updateCalc('9')} title='9' />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={() => updateCalc('4')} title='4' />
          <CalculatorButton onPress={() => updateCalc('5')} title='5' />
          <CalculatorButton onPress={() => updateCalc('6')} title='6' />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={() => updateCalc('1')} title='1' />
          <CalculatorButton onPress={() => updateCalc('2')} title='2' />
          <CalculatorButton onPress={() => updateCalc('3')} title='3' />
        </View>
        <View style={styles.row}>
          <CalculatorButton onPress={() => updateCalc('0')} title='0' />
        </View>
      </View>
    </View>
  );
};

export default AlternativeKeyboard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  result: {
    height: 40,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    margin: 8,
  },
  buttonRows: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
