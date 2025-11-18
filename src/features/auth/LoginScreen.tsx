import {
  View,
  Text,
  StatusBar,
  Platform,
  Image,
  Animated,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { loginStyles } from '@unistyles/authStyles';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import { resetAndNavigate } from '@utils/NavigationUtils';
import SocialLogin from '@components/ui/SocialLogin';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const LoginScreen: FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const { styles } = useStyles(loginStyles);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.25,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab');
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS != 'android'} />
      <Image
        source={require('@assets/images/login.png')}
        style={styles.cover}
      />

      <Animated.ScrollView
        style={{ transform: [{ translateY: animatedValue }] }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.bottomContainer}
      >
        <CustomText fontFamily="Okra-Bold" variant="h2" style={styles.title}>
          India's #1 Food Delivery and Dining App.
        </CustomText>

        <BreakerText text="Log in or sign up" />

        <PhoneInput
          onFocus={() => {}}
          onBlur={() => {}}
          onChangeText={() => setPhone(phone)}
          value={phone}
        />

        <TouchableOpacity
          disabled={loading}
          onPress={handleLogin}
          activeOpacity={0.8}
          style={styles.buttonContainer}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <CustomText color="#fff" fontFamily="Okra-Medium" variant="h5">
              Continue
            </CustomText>
          )}
        </TouchableOpacity>

        <BreakerText text="OR" />

        <SocialLogin />
      </Animated.ScrollView>

      <View style={styles.footer}>
        <CustomText>By Countinuing, you are agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText style={styles.footerText}>Terms of Service</CustomText>
          <CustomText style={styles.footerText}>Privacy Policy</CustomText>
          <CustomText style={styles.footerText}>Content Policy</CustomText>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
