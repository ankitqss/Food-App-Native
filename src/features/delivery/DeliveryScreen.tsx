import { View, Text, Image, Platform } from 'react-native';
import React, { FC, use } from 'react';
import { useStyles } from 'react-native-unistyles';
import { emptyStyles } from '@unistyles/emptyStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedState } from '@features/tabs/SharedContent';
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Graphics from '@components/home/Graphics';
import { homeStyles } from '@unistyles/homeStyles';
import HeaderSection from '@components/home/HeaderSection';

const DeliveryScreen: FC = () => {
  const { styles } = useStyles(homeStyles);
  const insets = useSafeAreaInsets();
  const { scrollYGlobal } = useSharedState();

  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 50], [0, -50]);

    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ translateY }],
    };
  });

  const moveUpStyleNoExtrapolate = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 50],
      [0, -50],
      // Extrapolate.CLAMP,
    );
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <Animated.View style={moveUpStyle}>
        <Animated.View style={moveUpStyleNoExtrapolate}>
          <Graphics />
        </Animated.View>
        <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
          <HeaderSection />
        </Animated.View>
      </Animated.View>
      <Animated.View style={moveUpStyle}></Animated.View>
    </View>
  );
};

export default DeliveryScreen;
