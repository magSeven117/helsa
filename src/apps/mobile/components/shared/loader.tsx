import { Loader2 } from 'lucide-react-native';
import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const Loader = () => {
  const rotationDegree = useSharedValue(0);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotationDegree.value * 360}deg` }],
    };
  });

  useEffect(() => {
    rotationDegree.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1, false);
  }, []);
  return (
    <Animated.View style={styles}>
      <Loader2 color={'#fff'} />
    </Animated.View>
  );
};

export default Loader;
