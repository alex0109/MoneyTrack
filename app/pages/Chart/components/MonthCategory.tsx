import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import Pie from 'react-native-pie';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../shared/lib/providers/AuthProvider';
import { deleteData } from '../../Settings/lib/api/deleteData';
import { fetchData } from '../../Settings/lib/api/fetchData';
import { getCoordinatesForIndex } from '../lib/helpers/getCoordinates';

import { getCurrentMonthName } from '../lib/helpers/getCurrentMonthName';

import CategoryCircle from './CategoryCircle';

import CreateCategoryModal from './CreateCategoryModal';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { ICategoryWithHistory } from '../lib/types/interfaces';

interface MonthCategoryProps {
  date: string;
  categories: ICategoryWithHistory[];
  data: { percentage: number; color: string }[];
  // eslint-disable-next-line no-unused-vars
  handleOpenCategory: (index: string) => void;
}

const MonthCategory = memo<MonthCategoryProps>(({ date, categories, data, handleOpenCategory }) => {
  const { uid } = useContext(AuthContext);
  const { category, count, target } = useTypedSelector((state) => state);

  const colors = useTheme().colors;

  const { i18n } = useTranslation();

  const [isCategoryDelete, setIsCategoryDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const monthTitleEN = moment(date).format('MMMM YYYY');
  const monthTitleUA = useMemo(
    () => `${getCurrentMonthName(moment(date).month())} ${moment(date).format('YYYY')}`,
    [date]
  );

  const refCreateCategoryModal = useRef<ModalRefProps>(null);

  const setCreateCategoryModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refCreateCategoryModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refCreateCategoryModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const createCategoryModalVisible = refCreateCategoryModal.current?.modalVisible;

  useEffect(() => {
    async function saveData() {
      try {
        setLoading(true);
        await deleteData(uid);
        await fetchData(uid, category, count, target);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    void saveData();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        {loading ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.headerText, { color: colors.textColor }]}>Saving data </Text>
            <ActivityIndicator color={colors.textColor} />
          </View>
        ) : (
          <Text style={[styles.headerText, { color: colors.textColor }]}>
            {i18n.language == 'uk' ? monthTitleUA : monthTitleEN}
          </Text>
        )}
      </View>
      <View style={styles.chart}>
        <Pie radius={100} innerRadius={70} sections={data} strokeCap={'butt'} />

        <View style={[styles.categoriesCircle]}>
          {categories.map((item, index) => {
            const { x, y } = getCoordinatesForIndex(-index + 1, categories.length);

            return item ? (
              <CategoryCircle
                key={item.index}
                categoryIndex={item.index}
                color={item.color}
                icon={item.icon}
                handleOpenCategory={handleOpenCategory}
                setIsCategoryDelete={setIsCategoryDelete}
                x={x}
                y={y}
                amount={item.count}
              />
            ) : null;
          })}

          {isCategoryDelete ? (
            <View
              style={[
                styles.addItemCircle,
                {
                  borderWidth: 0,
                },
              ]}>
              <Pressable>
                <Ionicons name={'trash'} size={35} color={colors.red} />
              </Pressable>
            </View>
          ) : categories.length < 9 ? (
            <View style={[styles.addItemCircle, { borderColor: colors.textColor }]}>
              <Pressable onPress={() => setCreateCategoryModalVisible(true)}>
                <Ionicons name={'add-outline'} size={35} color={colors.textColor} />
              </Pressable>
            </View>
          ) : (
            <View style={[styles.addItemCircle, { borderWidth: 0 }]}>
              <Entypo name={'emoji-happy'} size={35} color={colors.textColor} />
            </View>
          )}
        </View>
      </View>
      <CreateCategoryModal
        refModal={refCreateCategoryModal}
        modalVisible={createCategoryModalVisible}
        setModalVisible={setCreateCategoryModalVisible}
      />
    </View>
  );
});

MonthCategory.displayName = 'MonthCategory';

export default MonthCategory;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 2,
  },
  header: {
    marginTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
  },
  chart: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {
    marginTop: 20,
  },
  categoriesCircle: {
    alignItems: 'center',
    position: 'absolute',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
  },
  addItemCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    borderRadius: 40,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
});
