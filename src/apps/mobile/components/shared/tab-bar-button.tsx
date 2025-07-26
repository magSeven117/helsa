import { Calendar, HeartPlus, Home, Stethoscope } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
const TabBarButton = ({
  route,
  isFocused,
  onPress,
  onLongPress,
  options = {},
}: {
  route: any;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options?: any;
}) => {
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, { duration: 350 });
  }, [scale, isFocused]);
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const icons: any = {
    index: (props: any) => <Home size={24} color={'#222'} {...props} />,
    appointments: (props: any) => <Calendar size={24} color={'#222'} {...props} />,
    health: (props: any) => <HeartPlus size={24} color={'#222'} {...props} />,
    explore: (props: any) => <Stethoscope size={24} color={'#222'} {...props} />,
  };

  const label =
    options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab_bar_item}
    >
      <Animated.View style={[animatedIconStyle]}>
        {icons[route.name]({
          size: 24,
          color: isFocused ? '#fff' : '#ccc',
        })}
      </Animated.View>
      <Animated.Text
        style={[{ color: isFocused ? '#fff' : '#ccc', fontSize: 12, fontFamily: 'NunitoSemiBold' }, animatedTextStyle]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tab_bar_item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
