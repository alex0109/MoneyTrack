import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
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

import { useActions } from '../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';

import { validateValue } from '../../../shared/lib/utils/validateValue';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CategorySpendFormProps {
  categoryID: string;
}

const { width, height } = Dimensions.get('window');

const CategorySpendForm: FC<CategorySpendFormProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const [currentCount, setCurrentCount] = useState(0);
  const { count } = useTypedSelector((state) => state);
  const { t } = useTranslation();
  const { addCategoryHistory, topUpCategoryCount, decreaseCountValue } = useActions();

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
    if (validateValue(value) && count[currentCount]) {
      topUpCategoryCount({
        index: categoryID,
        count: value,
      });
      addCategoryHistory({
        index: categoryID,
        value: value,
        note: notes,
        fromCount: count[currentCount].index,
      });
      decreaseCountValue({ index: count[currentCount].index, value: value });
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
        <Text style={[styles.contentTitle, { color: colors.textColor }]}>
          {t('secondScreen.addSpend')}
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.contentBlock}>
          <View>
            <Text style={[styles.contentTitle, { color: colors.textColor }]}>
              {t('secondScreen.howMuch')}
            </Text>
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
              placeholder={`${t('global.placeholderValue')}`}
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>
        <View style={styles.contentBlock}>
          <View>
            <Text style={[styles.contentTitle, { color: colors.textColor }]}>
              {t('secondScreen.fromCount')}
            </Text>
          </View>
          <View style={[{ justifyContent: 'center', width: '50%' }]}>
            {count.length > 0 ? (
              <TouchableOpacity onPress={() => changeCountHandler()}>
                <Text style={[styles.contentTitle, { color: colors.info }]}>
                  {count[currentCount].title} {count[currentCount].value}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: colors.red }}>{t('secondScreen.noCounts')}</Text>
            )}
          </View>
        </View>
        <View style={[{ flexDirection: 'column', marginBottom: 40 }]}>
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.contentTitle, { color: colors.textColor }]}>
              {t('secondScreen.notes')}
            </Text>
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
              placeholder={`${t('secondScreen.notesPlaceholder')}`}
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
            <Text style={[styles.contentTitle, { color: colors.info }]}>
              {t('secondScreen.send')}
            </Text>
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
