/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../../shared/ui/Title/Title';
import TargetBar from '../TargetBar/TargetBar';

import type { ITarget } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface TargetListProps {
  handleModalOpen: (index: string) => void;
}

const TargetList: FC<TargetListProps> = ({ handleModalOpen }) => {
  const { handleAddTarget } = useActions();
  const { target } = useTypedSelector((state) => state);
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <View style={{ paddingLeft: 25 }}>
      <Title>{t('firstScreen.targetTitle')}</Title>
      {target.length == 0 ? (
        <View style={styles.noTargetsdMessage}>
          <Text style={[styles.noTargetsdMessageText, { color: colors.textColor }]}>
            {t('firstScreen.noTargetsMessage')}
          </Text>
          <Pressable onPress={() => handleAddTarget()}>
            <Ionicons name='add-outline' size={35} color={colors.textColor} />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.targetsContent}>
            {target.map((item: ITarget) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <TargetBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            {target.length < 5 ? (
              <Pressable onPress={() => handleAddTarget()}>
                <Ionicons name='add-outline' size={35} color={colors.textColor} />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default TargetList;

const styles = StyleSheet.create({
  noTargetsdMessage: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  targetsContent: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  noTargetsdMessageText: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '400',
  },
});
