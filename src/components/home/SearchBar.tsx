import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import React, { use } from 'react';
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import { useSharedState } from '@features/tabs/SharedContent';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@components/global/Icon';
import { Colors } from '@unistyles/Constants';
import RollingContent from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText';
import { useAppSelector } from '@states/reduxHook';
import { useDispatch } from 'react-redux';
import { setVegMode } from '@states/reducers/userSlice';

const searchItems: string[] = [
  'Search "chai samosa"',
  'Search "pizza hut"',
  'Search "burger king"',
  'Search "sushi"',
  'Search "pasta"',
  'Search "tacos"',
  'Search "salad"',
  'Search "desserts"',
];
const SearchBar = () => {
  const dispatch = useDispatch();
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const { styles } = useStyles(homeStyles);
  const { scrollYGlobal } = useSharedState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
    return {
      color: `rgb(${textColor}, ${textColor}, ${textColor})`,
    };
  });

  return (
    <>
      {Platform.OS === 'ios' && <SafeAreaView />}
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity
          style={styles.searchInputContainer}
          activeOpacity={0.8}
        >
          <Icon
            name="search"
            iconFamily="Ionicons"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
          <RollingContent
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}
          >
            {searchItems.map((item, index) => {
              return (
                <CustomText
                  fontSize={12}
                  fontFamily="Okra-Medium"
                  key={index}
                  style={styles.rollingText}
                >
                  {item}
                </CustomText>
              );
            })}
          </RollingContent>

          <Icon
            name="mic-outline"
            iconFamily="Ionicons"
            color={isVegMode ? Colors.active : Colors.primary}
            size={20}
          />
        </TouchableOpacity>

        <Pressable
          style={styles.vegMode}
          onPress={() => dispatch(setVegMode(!isVegMode))}
        >
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>
            VEG
          </Animated.Text>
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>
            MODE
          </Animated.Text>

          <Image
            source={
              isVegMode
                ? require('@assets/icons/switch_on.png')
                : require('@assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </>
  );
};

export default SearchBar;
