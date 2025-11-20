import { View, Text, FlatList } from 'react-native';
import React, { FC } from 'react';
import { useStyles } from 'react-native-unistyles';
import { cardStyles } from '@unistyles/cardStyles';
import RestaurantCard from './RestaurantCard';
import CustomText from '@components/global/CustomText';
import { recommendedListData, restaurantItemsData } from '@utils/dummyData';

const RestaurantList: FC = () => {
  const { styles } = useStyles(cardStyles);

  const renderItem = ({ item }: any) => {
    return <RestaurantCard item={item} />;
  };
  return (
    <View>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Bold"
        fontSize={12}
      >
        1823 restaurants delivering to you
      </CustomText>
      <CustomText
        style={styles.centerText}
        fontFamily="Okra-Medium"
        fontSize={12}
      >
        FEATURED
      </CustomText>

      <FlatList
        data={recommendedListData}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                opacity: 0.5,
                alignItems: 'center',
              }}
            >
              <CustomText fontFamily="Okra-Medium" variant="h1">
                Made with LOVE 😊
              </CustomText>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RestaurantList;
