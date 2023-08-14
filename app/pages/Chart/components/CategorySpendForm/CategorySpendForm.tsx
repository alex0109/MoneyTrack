import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { makeid } from '../../../../shared/lib/utils/generateID';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import { decreaseCountValue } from '../../../Count/lib/store/countSlice';
import { addCategoryHistory, topUpCategoryCount } from '../../lib/store/categorySlice';

import type { FC } from 'react';

interface CategorySpendFormProps {
  categoryID: string;
}

const { width, height } = Dimensions.get('window');

const CategorySpendForm: FC<CategorySpendFormProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const dispatch = useAppDispatch();
  const { uid } = useContext(AuthContext);
  const [currentCount, setCurrentCount] = useState(0);
  const count = useTypedSelector((state) => state.count.data);

  const [inputFormValue, setInputFormValue] = useState(0);
  const [inputFormNotes, setInputFormNotes] = useState('');

  const changeCountHandler = () => {
    if (currentCount == count.length - 1) {
      setCurrentCount(0);
    } else {
      setCurrentCount((index) => index + 1);
    }
  };

  const sendSpends = (value: number, notes: string) => {
    if (validateValue(value)) {
      dispatch(
        topUpCategoryCount({
          uid,
          categoryID,
          categoryHistoryID: makeid(),
          categoryFromCount: count[currentCount].index,
          categoryValue: value,
          categoryNote: notes,
        })
      );
      dispatch(
        addCategoryHistory({
          uid,
          categoryID,
          categoryValue: value,
          categoryNote: notes,
          categoryFromCount: count[currentCount],
        })
      );
      dispatch(decreaseCountValue({ uid, countID: count[currentCount].index, countValue: value }));
      setInputFormValue(0);
      setInputFormNotes('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='position'
      contentContainerStyle={{
        backgroundColor: colors.themeColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      style={[styles.content, { backgroundColor: colors.themeColor }]}>
      <View
        style={[
          styles.contentTitleContainer,
          { borderColor: colors.textColor, marginHorizontal: 40, marginTop: 15 },
        ]}>
        <Text style={[styles.contentTitle, { color: colors.textColor }]}>Add spend</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.contentBlock}>
          <View>
            <Text style={[styles.contentTitle, { color: colors.textColor }]}>How much:</Text>
          </View>
          <View
            style={[
              {
                justifyContent: 'center',
                width: '50%',
                borderBottomWidth: 1,
                borderColor: colors.textColor,
              },
            ]}>
            <TextInput
              style={[styles.contentBlockInput, { color: colors.textColor }]}
              defaultValue={`${inputFormValue}`}
              onChangeText={(input) => setInputFormValue(Number(input))}
              selectTextOnFocus={true}
              keyboardType='numeric'
              placeholder='Your value...'
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>
        <View style={styles.contentBlock}>
          <View>
            <Text style={[styles.contentTitle, { color: colors.textColor }]}>From count:</Text>
          </View>
          <View style={[{ justifyContent: 'center', width: '50%' }]}>
            <TouchableOpacity onPress={() => changeCountHandler()}>
              <Text style={[styles.contentTitle, { color: colors.info }]}>
                {count.length > 0
                  ? `${count[currentCount].title} (${count[currentCount].value})`
                  : 'No counts'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[{ flexDirection: 'column', marginBottom: 40 }]}>
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.contentTitle, { color: colors.textColor }]}>Notes:</Text>
          </View>
          <View
            style={[
              {
                justifyContent: 'center',
                width: '100%',
                borderBottomWidth: 1,
                borderColor: colors.textColor,
              },
            ]}>
            <TextInput
              style={[styles.contentBlockInput, { color: colors.textColor }]}
              defaultValue={inputFormNotes}
              onChangeText={(input) => setInputFormNotes(input)}
              multiline
              maxLength={128}
              selectTextOnFocus={true}
              placeholder='Your notes (optional) ...'
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>
        <View style={[{ alignItems: 'flex-end', width: '100%' }]}>
          <TouchableOpacity
            onPress={() => sendSpends(inputFormValue, inputFormNotes)}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={[styles.contentTitle, { color: colors.info }]}>Send</Text>
            <Ionicons size={25} name='arrow-forward' color={colors.info} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CategorySpendForm;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: height * 0.8,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingBottom: 5,
    marginBottom: 15,
  },
  contentTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
  contentBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  contentBlockTitle: {},
  contentBlockInput: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 16,
    padding: 0,
  },
});
