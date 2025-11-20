import {
  View,
  Text,
  SectionList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import React, { useRef, useState } from 'react';
import RestaurantList from './RestaurantList';
import ExploreList from '@components/list/ExploreList';
import { useStyles } from 'react-native-unistyles';
import { useSharedState } from '@features/tabs/SharedContent';
import { restaurantStyles } from '@unistyles/restuarantStyles';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import BackToTopButton from '@components/ui/BackToTopButton';
import { filtersOption } from '@utils/dummyData';
import SortingAndFilters from '@components/home/SortingAndFilters/SortingAndFilters';

const sectionedData = [
  { title: 'Explore', data: [{}], renderItem: () => <ExploreList /> },
  { title: 'Restaurants', data: [{}], renderItem: () => <RestaurantList /> },
];
const MainList = () => {
  const { styles } = useStyles(restaurantStyles);
  const { scrollY, scrollToTop, scrollYGlobal } = useSharedState();
  const previousScrollYTopBottom = useRef<number>(0);
  const prevScrollY = useRef(0);
  const sectionListRef = useRef<SectionList>(null);

  const [isRestaurantVisible, setIsRestaurantVisible] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset?.y;
    const isScrollingDown = currentScrollY > prevScrollY?.current;

    scrollY.value = isScrollingDown
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 });

    scrollYGlobal.value = currentScrollY;
    prevScrollY.current = currentScrollY;

    const containerHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
    const offset = event?.nativeEvent?.contentOffset?.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
  };

  const handleScrollToTop = async () => {
    scrollToTop();
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80,
  };

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollYGlobal?.value < previousScrollYTopBottom?.current &&
      scrollYGlobal.value > 180;
    const opacity = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0,
      { duration: 300 },
    );
    const translateY = withTiming(
      isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 1,
      { duration: 300 },
    );

    previousScrollYTopBottom.current = scrollYGlobal.value;

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    const restautantVisible = viewableItems.some(
      item => item?.section?.title === 'Restaurants' && item?.isViewable,
    );

    setIsRestaurantVisible(restautantVisible);
  };

  return (
    <>
      <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
        <BackToTopButton onPress={handleScrollToTop} />
      </Animated.View>
      <SectionList
        overScrollMode="always"
        onScroll={handleScroll}
        ref={sectionListRef}
        scrollEventThrottle={16}
        sections={sectionedData}
        bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={true}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderSectionHeader={({ section }) => {
          if (section.title != 'Restaurants') {
            return null;
          }
          return (
            <Animated.View
              style={[
                isRestaurantVisible || isNearEnd ? styles.shadowBottom : null,
              ]}
            >
              <SortingAndFilters menuTitle="Sort" options={filtersOption} />
            </Animated.View>
          );
        }}
      />
    </>
  );
};

export default MainList;
