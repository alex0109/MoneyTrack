/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import Title from '../../../../shared/ui/Title/Title';
import { addNewCount } from '../../lib/store/countSlice';
import BarSkeleton from '../BarSkeleton/BarSkeleton';
import CountBar from '../CountBar/CountBar';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface CountListProps {
  handleModalOpen: (index: string) => void;
}

const CountList: FC<CountListProps> = ({ handleModalOpen }) => {
  const count = useTypedSelector((state) => state.count.data);
  const countLoading = useTypedSelector((state) => state.count.loading);
  const dispatch = useAppDispatch();
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const addNewCountHandler = () => {
    dispatch(addNewCount(authContext.uid));
  };

  return (
    <View style={{ paddingLeft: 25, marginBottom: 60 }}>
      <Title>{t('firstScreen.countTitle')}</Title>

      {count.length == 0 ? (
        <View style={styles.noCountsMessage}>
          <Text style={[styles.noCountsMessageText, { color: colors.textColor }]}>
            {t('firstScreen.noCountsMessage')}
          </Text>
          {!countLoading ? (
            <Pressable onPress={() => addNewCountHandler()}>
              <Ionicons name='add-outline' size={35} color={colors.textColor} />
            </Pressable>
          ) : (
            <ActivityIndicator size='large' color={colors.textColor} />
          )}
        </View>
      ) : (
        <View>
          {!countLoading ? (
            <View style={styles.countsContent}>
              {count.map((item: ICount) => (
                <TouchableOpacity
                  key={item.index}
                  onPress={() => {
                    handleModalOpen(item.index);
                  }}>
                  <CountBar key={item.index} {...item} />
                </TouchableOpacity>
              ))}
              {count.length < 4 ? (
                <Pressable onPress={() => addNewCountHandler()}>
                  <Ionicons name='add-outline' size={35} color={colors.textColor} />
                </Pressable>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <>
              <BarSkeleton />
              <BarSkeleton />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CountList;

const styles = StyleSheet.create({
  noCountsMessage: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  countsContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  noCountsMessageText: {
    fontSize: 20,
    marginBottom: 30,
    fontFamily: 'NotoSans-Regular',
  },
});
