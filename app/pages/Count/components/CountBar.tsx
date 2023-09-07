import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../shared/assets/styles/colors';
import { useActions } from '../../../shared/lib/hooks/useActions';

import type { ICount } from '../lib/types/interfaces';
import { FC, useState } from 'react';

const windowWidth = Dimensions.get('window').width;

const CountBar: FC<ICount> = (count) => {
  const { deleteCount } = useActions();

  const colors = useTheme().colors;

  const [data, setData] = useState([{ id: 1 }]);

  const [input, setInput] = useState('');

  const sendMessageHandler = () => {
    if (input.length > 0) {
      setData({ id: '124', title: input, index: 1 });
      setInput('');
    }
  };

  const onRightSwipe = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => deleteCount({ index: count.index })}
        style={{
          backgroundColor: colors.red,
          height: '100%',
          justifyContent: 'center',
        }}>
        <Ionicons name='md-close-outline' size={35} color={colors.textColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log({ index: count.index })}
        style={{
          backgroundColor: colors.info,
          height: '100%',
          justifyContent: 'center',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <Ionicons name='md-close-outline' size={35} color={colors.textColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ marginBottom: 30, backgroundColor: colors.contrastColor, borderRadius: 10 }}>
      <Swipeable renderRightActions={onRightSwipe}>
        <View style={[styles.contentContainer, { borderBottomColor: colors.textColor }]}>
          <View style={styles.contentItem}>
            <Text style={[styles.title, { color: colors.textColor }]}>{count.title}</Text>
            <Text style={[styles.subTitle]}>{count.value}</Text>
          </View>
        </View>
      </Swipeable>
      <TextInput defaultValue={input} onChangeText={(usersInput) => setInput(usersInput)} />
      <Button onPress={() => sendMessageHandler()} />
    </View>
  );
};

export default CountBar;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: windowWidth / 1.2,
    borderRadius: 0.1,
    borderRightWidth: 3,
    borderRightColor: Colors.light.colors.red,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: 'NotoSans-Regular',
  },
  subTitle: {
    paddingLeft: 10,
    color: Colors.light.colors.success,
    fontSize: 18,
    fontFamily: 'NotoSans-Regular',
  },
});
