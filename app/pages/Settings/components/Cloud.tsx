import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../shared/lib/providers/AuthProvider';
import Title from '../../../shared/ui/Title/Title';

import { deleteData } from '../lib/api/deleteData';
import { fetchData } from '../lib/api/fetchData';
import { loadData } from '../lib/api/loadData';

import type { ICategory } from '../../Chart/lib/types/interfaces';
import type { ICount } from '../../Count/lib/types/interfaces';
import type { ITarget } from '../../Target/lib/types/interfaces';
import type { FC } from 'react';

const Cloud: FC = () => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { isGuest, uid } = useContext(AuthContext);
  const { category, count, target } = useTypedSelector((state) => state);
  const { setCategoriesData, setCountsData, setTargetsData } = useActions();

  const loadAppData = async () => {
    const response = await loadData(uid);

    const loadedCategories: ICategory[] = await Object.values(response)[0].categories;
    const loadedCounts: ICount[] = await Object.values(response)[0].counts;
    const loadedTargets: ITarget[] = await Object.values(response)[0].targets;

    if (loadedCategories) {
      setCategoriesData(loadedCategories);
    }
    if (loadedCounts) {
      setCountsData(loadedCounts);
    }
    if (loadedTargets) {
      setTargetsData(loadedTargets);
    }
  };

  return (
    <View>
      <Title>{t('settings.cloudTitle')}</Title>
      {isGuest ? (
        <Text style={{ color: colors.red, marginBottom: 10, fontSize: 16 }}>
          {t('settings.cloudWarning')}
        </Text>
      ) : (
        <></>
      )}
      <View>
        <TouchableOpacity
          disabled={isGuest}
          style={[styles.button, { backgroundColor: !isGuest ? colors.info : colors.gray }]}
          onPress={async () => loadAppData()}>
          <Ionicons name='cloud-download' size={30} />
          <Text style={[styles.buttonText, { color: colors.themeColor }]}>
            {t('settings.downloadData')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isGuest}
          style={[styles.button, { backgroundColor: !isGuest ? colors.success : colors.gray }]}
          onPress={async () => {
            await deleteData(uid);
            await fetchData(uid, category, count, target);
          }}>
          <Ionicons name='cloud-upload' size={30} />
          <Text style={[styles.buttonText, { color: colors.themeColor }]}>
            {t('settings.saveData')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isGuest}
          style={[styles.button, { backgroundColor: !isGuest ? colors.red : colors.gray }]}
          onPress={async () => console.log(await deleteData(uid))}>
          <Ionicons name='trash' size={30} />
          <Text style={[styles.buttonText, { color: colors.themeColor }]}>
            {t('settings.deleteData')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cloud;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
    marginLeft: 5,
  },
});
