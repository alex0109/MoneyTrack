import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { topUpCategoryCount } from '../../pages/Chart/lib/store/categorySlice';
import { decreaseCountValue } from '../../pages/Count/lib/store/countSlice';

import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';

import { AuthContext } from '../../shared/lib/providers/AuthProvider';

import CalculatorButton from './CalculatorButton';

import type { FC } from 'react';

interface AlternativeKeyboardProps {
  categoryID: string;
}

const AlternativeKeyboard: FC<AlternativeKeyboardProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [calc, setCalc] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [currentCount, setCurrentCount] = useState(0);
  const count = useTypedSelector((state) => state.count.data);
  const navigation = useNavigation();

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
    if (count.length > 0) {
      dispatch(
        topUpCategoryCount({
          uid: authContext.uid,
          categoryID: categoryID,
          categoryValue: Number(result),
        })
      );
      dispatch(
        decreaseCountValue({
          uid: authContext.uid,
          countID: count[currentCount].index,
          countValue: Number(result),
        })
      );
      clear();
    }
    return;
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
        <View style={{ width: '70%', height: 65, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: colors.textColor,
              marginRight: 20,
              fontFamily: 'NotoSans-Regular',
              fontSize: calc.length > 6 ? 26 : 32,
            }}>
            {calc == '' ? (
              <Text style={{ fontSize: 16, color: 'gray', fontFamily: 'NotoSans-Regular' }}>
                Type your value...
              </Text>
            ) : (
              calc
            )}
          </Text>
        </View>
        <View style={{ justifyContent: 'flex-start', height: '100%' }}>
          <TouchableOpacity onPress={() => changeCountHandler()}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.textColor,
                fontFamily: 'NotoSans-Bold',
              }}>
              {count.length > 0 ? count[currentCount].title : 'No counts'}
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
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryEditStack', { categoryID: categoryID })}
            style={styles.iconButton}>
            <Ionicons name='md-construct' size={35} color={colors.textColor} />
          </TouchableOpacity>
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
